import { Token, KeywordDescTable } from '../token';
import { ParserState, Context } from '../parser/common';

export function convertTokenType(parser: ParserState, context: Context, t: Token): any {
  let type: string = 'Punctuator';
  let value = parser.tokenValue;
  switch (t) {
    case Token.NumericLiteral:
      type = 'NumericLiteral';
      break;
    case Token.StringLiteral:
      type = 'StringLiteral';
      break;
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      type = 'BooleanLiteral';
      value = KeywordDescTable[t & Token.Kind] === 'true';
      break;
    case Token.NullKeyword:
      type = 'NullLiteral';
      value = null;
      break;
    case Token.RegularExpression:
      type = 'RegularExpression';
      value = {
        value: parser.tokenValue,
        regex: parser.tokenRegExp
      };
      break;
    case Token.TemplateCont:
    case Token.TemplateTail:
      type = 'TemplateLiteral';
      break;
    default:
      if ((t & Token.IsIdentifier) === Token.IsIdentifier) {
        type = 'Identifier';
      } else if ((t & Token.IsIdentifier) === Token.IsIdentifier) {
        type = 'Keyword';
      } else {
        type = 'Punctuator';
        value = KeywordDescTable[t & Token.Kind];
      }
      break;
  }

  if (context & Context.OptionsLoc) parser.onToken(type, value, false, parser.start, parser.index);
  else parser.onToken(type, value, false);
}

export function identifierNotKeyword(parser: ParserState, context: Context, value: string, type: string): any {
  if (context & Context.OptionsLoc) parser.onToken(type, value, false, parser.start, parser.index);
  else parser.onToken(type, value, false);
}
