const { test } = require('node:test');
const assert = require('node:assert');
const ta = require('../index.js');

test('random.prng returns a function', () => {
  assert.strictEqual(typeof ta.random.prng('seed'), 'function');
});

test('random.prng is deterministic for a given seed', () => {
  const a = ta.random.prng('abc');
  const b = ta.random.prng('abc');
  for (let i = 0; i < 10; i++) assert.strictEqual(a(), b());
});

test('random.prng produces values in [0, 1)', () => {
  const r = ta.random.prng('abc');
  for (let i = 0; i < 1000; i++) {
    const v = r();
    assert.ok(v >= 0 && v < 1, 'value ' + v + ' out of [0,1)');
  }
});

test('random.prng differs between seeds', () => {
  const a = ta.random.prng('abc')();
  const b = ta.random.prng('xyz')();
  assert.notStrictEqual(a, b);
});

test('random.pick returns an element of the array', () => {
  const arr = [1, 2, 3, 4, 5];
  for (let i = 0; i < 50; i++) assert.ok(arr.includes(ta.random.pick(arr)));
});

test('random.range returns an integer within [min, max]', () => {
  for (let i = 0; i < 100; i++) {
    const v = ta.random.range(3, 7);
    assert.ok(Number.isInteger(v), v + ' not integer');
    assert.ok(v >= 3 && v <= 7, v + ' out of [3,7]');
  }
});

test('random.float returns a float within [min, max]', () => {
  for (let i = 0; i < 100; i++) {
    const v = ta.random.float(0, 1);
    assert.ok(typeof v === 'number' && v >= 0 && v <= 1, v + ' out of [0,1]');
  }
});

test('random.order returns a permutation and does not mutate the input', () => {
  const input = [1, 2, 3, 4, 5];
  const snapshot = input.slice();
  const out = ta.random.order(input);
  assert.deepStrictEqual(input, snapshot, 'input unchanged');
  assert.strictEqual(out.length, input.length);
  assert.deepStrictEqual(out.slice().sort((a, b) => a - b), snapshot, 'same multiset of elements');
});
