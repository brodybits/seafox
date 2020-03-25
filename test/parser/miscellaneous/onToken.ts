import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - OnToken', () => {
  it('tokenize boolean using function', () => {
    let onTokenCount = 0;
    parseScript('false', {
      onToken: function(token: string, value: any, dirty: boolean, start?: number, end?: number) {
        t.deepEqual(token, 'BooleanLiteral');
        t.deepEqual(value, false);
        t.deepEqual(dirty, false);
        t.deepEqual(start, 0);
        t.deepEqual(end, 5);
        onTokenCount++;
      },
      loc: true
    });
    t.equal(onTokenCount, 1);
  });

  it('tokenize a keywoeeerd', () => {
    let onTokenCount = 0;
    parseScript('let', {
      onToken: function(token: string, value: any, dirty: boolean, start?: number, end?: number) {
        t.deepEqual(token, 'Identifier');
        t.deepEqual(value, 'let');
        t.deepEqual(dirty, false);
        t.deepEqual(start, 0);
        t.deepEqual(end, 3);
        onTokenCount++;
      },
      loc: true
    });
    t.equal(onTokenCount, 2);
  });

  it('after if', () => {
    let tokenArray: any[] = [];
    parseScript('if(x){} /y/.test(z)', {
      onToken: function(type: string, value: any, dirty: boolean, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          dirty,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      { type: 'Punctuator', value: 'if', dirty: false, start: 0, end: 2 },
      { type: 'Punctuator', value: '(', dirty: false, start: 2, end: 3 },
      { type: 'Identifier', value: 'x', dirty: false, start: 3, end: 4 },
      { type: 'Punctuator', value: ')', dirty: false, start: 4, end: 5 },
      { type: 'Punctuator', value: '{', dirty: false, start: 5, end: 6 },
      { type: 'Punctuator', value: '}', dirty: false, start: 6, end: 7 },
      {
        type: 'RegularExpression',
        value: {
          value: /y/,
          regex: {
            flags: '',
            pattern: 'y'
          }
        },
        dirty: false,
        start: 8,
        end: 11
      },
      { type: 'Punctuator', value: '.', dirty: false, start: 11, end: 12 },
      {
        type: 'Identifier',
        value: 'test',
        dirty: false,
        start: 12,
        end: 16
      },
      { type: 'Punctuator', value: '(', dirty: false, start: 16, end: 17 },
      { type: 'Identifier', value: 'z', dirty: false, start: 17, end: 18 },
      { type: 'Punctuator', value: ')', dirty: false, start: 18, end: 19 }
    ]);
  });

  it('with (false) /42/', () => {
    let tokenArray: any[] = [];
    parseScript('with (false) /42/', {
      onToken: function(type: string, value: any, dirty: boolean, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          dirty,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        dirty: false,
        end: 4,
        start: 0,
        type: 'Punctuator',
        value: 'with'
      },
      {
        dirty: false,
        end: 6,
        start: 5,
        type: 'Punctuator',
        value: '('
      },
      {
        dirty: false,
        end: 11,
        start: 6,
        type: 'BooleanLiteral',
        value: false
      },
      {
        dirty: false,
        end: 12,
        start: 11,
        type: 'Punctuator',
        value: ')'
      },
      {
        dirty: false,
        end: 17,
        start: 13,
        type: 'RegularExpression',
        value: {
          regex: {
            flags: '',
            pattern: '42'
          },
          value: /42/
        }
      }
    ]);
  });

  it('this / 100;', () => {
    let tokenArray: any[] = [];
    parseScript('this / 100;', {
      onToken: function(type: string, value: any, dirty: boolean, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          dirty,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        dirty: false,
        end: 4,
        start: 0,
        type: 'Keyword',
        value: 'this'
      },
      {
        dirty: false,
        end: 6,
        start: 5,
        type: 'Punctuator',
        value: '/'
      },
      {
        dirty: false,
        end: 10,
        start: 7,
        type: 'NumericLiteral',
        value: 100
      },
      {
        dirty: false,
        end: 11,
        start: 10,
        type: 'Punctuator',
        value: ';'
      }
    ]);
  });
});
