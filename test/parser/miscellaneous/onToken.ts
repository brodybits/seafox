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
});
