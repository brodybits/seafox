import { Context } from './parser/common';
import * as Types from './parser/types';
import { nextToken } from './scanner/scan';
import { skipMeta } from './scanner/';
import { parseModuleItemList } from './parser/module';
import { parseStatementList } from './parser/statements';
import { create } from './parser/core';
import { createTopLevelScope } from './parser/scope';

/**
 * The parser options.
 */
export interface Options {
  // Allow parsing using Module as the goal symbol
  module?: boolean;
  // Enable stage 3 support (ESNext)
  next?: boolean;
  // Disable web compatibility
  disableWebCompat?: boolean;
  // Enable line/column location information start and end offsets to each node
  loc?: boolean;
  // Attach raw property to each literal and identifier node
  raw?: boolean;
  // Enabled directives
  directives?: boolean;
  // Allow return in the global scope
  globalReturn?: boolean;
  // Enable implied strict mode
  impliedStrict?: boolean;
  // Adds a source attribute in every node’s loc object when the locations option is `true`
  source?: string;
  // Enable non-standard parenthesized expression node
  preserveParens?: boolean;
}

export function parseRoot(source: string, context: Context, options?: Options): Types.Program {
  if (options !== undefined) {
    if (options.module) context |= Context.Module | Context.Strict;
    if (options.next) context |= Context.OptionsNext;
    if (options.loc) context |= Context.OptionsLoc;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
    if (options.directives) context |= Context.OptionsDirectives | Context.OptionsRaw;
    if (options.raw) context |= Context.OptionsRaw;
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    if (options.preserveParens) context |= Context.OptionsPreserveParens;
    if (options.impliedStrict) context |= Context.Strict;
  }

  // Initialize parser state
  const parser = create(source);

  // See: https://github.com/tc39/proposal-hashbang
  skipMeta(parser, source);

  nextToken(parser, context, /* allowRegExp */ 1);

  const scope = createTopLevelScope();

  // https://tc39.es/ecma262/#sec-scripts
  // https://tc39.es/ecma262/#sec-modules

  const sourceType: 'module' | 'script' = context & Context.Module ? 'module' : 'script';

  const body =
    sourceType === 'module' ? parseModuleItemList(parser, context, scope) : parseStatementList(parser, context, scope);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
    ? {
        type: 'Program',
        sourceType,
        body,
        start: 0,
        end: source.length,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: parser.curLine,
            column: parser.index - parser.offset
          }
        }
      }
    : {
        type: 'Program',
        sourceType,
        body
      };
}

/**
 * Parse a script, optionally with various options.
 */
export function parseScript(source: string, options?: Options): Types.Program {
  return parseRoot(source, Context.InGlobal, options);
}

/**
 * Parse a module, optionally with various options.
 */
export function parseModule(source: string, options?: Options): Types.Program {
  return parseRoot(source, Context.Strict | Context.Module | Context.InGlobal, options);
}

/**
 * Parse a module or a script, optionally with various options.
 */
export function parse(source: string, options?: Options): Types.Program {
  return parseRoot(source, Context.InGlobal, options);
}

export const version = '1.4.0';
