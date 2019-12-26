import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Trailing comma', () => {
  for (const arg of [
    ' function  a(b,,) {}',
    ' function* a(b,,) {}',
    '(function  a(b,,) {});',
    '(function* a(b,,) {});',
    '(function   (b,,) {});',
    '(function*  (b,,) {});',
    ' function  a(b,c,d,,) {}',
    ' function* a(b,c,d,,) {}',
    '(function  a(b,c,d,,) {});',
    '(function* a(b,c,d,,) {});',
    '(function   (b,c,d,,) {});',
    '(function*  (b,c,d,,) {});',
    '(b,,) => {};',
    '(b,c,d,,) => {};',
    'a(1,,);',
    'a(1,2,3,,);',
    ' function  a1(,) {}',
    ' function* a2(,) {}',
    '(function  a3(,) {});',
    '(function* a4(,) {});',
    '(function    (,) {});',
    '(function*   (,) {});',
    '(,) => {};',
    'a1(,);',
    ' function  a(...b,) {}',
    ' function* a(...b,) {}',
    '(function  a(...b,) {});',
    '(function* a(...b,) {});',
    '(function   (...b,) {});',
    '(function*  (...b,) {});',
    ' function  a(b, c, ...d,) {}',
    ' function* a(b, c, ...d,) {}',
    '(function  a(b, c, ...d,) {});',
    '(function* a(b, c, ...d,) {});',
    '(function   (b, c, ...d,) {});',
    '(...b,) => {};',
    '(b, c, ...d,) => {};',
    '(,);',
    '(a,);',
    '(a,b,c,);',
    'foo (,) => 0',
    ', => 0',
    ', () => 0',
    'async (,) => 0',
    '(function*  (b, c, ...d,) {});',
    'class A {foo(,) {}}',
    'class A {static foo(,) {}}',
    '(class {static foo(,) {}})',
    '(...b,) => {};',
    '(b, c, ...d,) => {};',
    'n, op, val,',
    'foo(a,,) => 0',
    'async (a,,) => 0',
    '(b,,) => {};',
    '(b,c,d,,) => {};',
    'a(1,,);',
    'a(1,2,3,,);',
    ' function  a1(,) {}',
    ' function* a2(,) {}',
    '(function  a3(,) {});',
    '(function* a4(,) {});',
    '(function    (,) {});',
    '(function*   (,) {});',
    '(,) => {};',
    'a1(,);',
    ' function  a(...b,) {}',
    ' function* a(...b,) {}',
    '(function  a(...b,) {});',
    '(function* a(...b,) {});',
    '(function   (...b,) {});',
    '(function*  (...b,) {});'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }

  // Comma is not permitted after the rest element
  const invalidRest = [
    'function foo(...a,) { }',
    '(function(...a,) { })',
    '(...a,) => a',
    'async (...a,) => a',
    '({foo(...a,) {}})',
    'class A {foo(...a,) {}}',
    'class A {static foo(...a,) {}}',
    '(class {foo(...a,) {}})',
    '(class {static foo(...a,) {}})'
  ];

  for (const arg of invalidRest) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }

  for (const arg of [
    ' function  a(b,) {}',
    ' function* a(b,) {}',
    '(function  a(b,) {});',
    '(function* a(b,) {});',
    '(function   (b,) {});',
    '(function*  (b,) {});',
    ' function  a(b,c,d,) {}',
    ' function* a(b,c,d,) {}',
    '(function  a(b,c,d,) {});',
    '(function* a(b,c,d,) {});',
    '(function   (b,c,d,) {});',
    '(function*  (b,c,d,) {});',
    '(b,) => {};',
    '(b,c,d,) => {};',
    'a(1,);',
    'a(1,2,3,);',
    'a(...[],);',
    'a(1, 2, ...[],);',
    'a(...[], 2, ...[],);',
    'a, b, (c, d) => 0',
    '(a, b, (c, d) => 0)',
    '(a, b) => 0, (c, d) => 1',
    '(a, b => {}, a => a + 1)',
    '((a, b) => {}, (a => a + 1))',
    '(a, (a, (b, c) => 0))',
    'async (a, (a, (b, c) => 0))',
    '[...a,]',
    '[...a, ,]',
    '[, ...a]',
    '[...[...a]]',
    '[, ...a]',
    '[, , ...a]',
    ' function  a(b,) {}',
    ' function* a(b,) {}',
    '(function  a(b,) {});',
    '(function* a(b,) {});',
    '(function   (b,) {});',
    '(function*  (b,) {});',
    ' function  a(b,c,d,) {}',
    ' function* a(b,c,d,) {}',
    '(function  a(b,c,d,) {});',
    '(function* a(b,c,d,) {});',
    '(function   (b,c,d,) {});',
    '(function*  (b,c,d,) {});',
    'class Foo { bar(a,) { } }',
    '(1, y)',
    '0, f(n - 1);',
    '(b,) => {};',
    '(b,c,d,) => {};',
    'a(1,);',
    'a(1,2,3,);',
    'a(...[],);',
    'a(1, 2, ...[],);',
    'a(...[], 2, ...[],);',
    'a, b => 0'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });
  }
});