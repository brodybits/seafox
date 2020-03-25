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

  it('tokenize a keyword', () => {
    let onTokenCount = 0;
    parseScript('let', {
      onToken: function(token: string, _value: any, _dirty: boolean, start?: number, end?: number) {
        t.deepEqual(token, 'Identifier');
        //t.deepEqual(value, 'a');
        //    t.deepEqual(dirty, false);
        t.deepEqual(start, 0);
        t.deepEqual(end, 3);
        onTokenCount++;
      },
      loc: true
    });
    t.equal(onTokenCount, 2);
  });
});
