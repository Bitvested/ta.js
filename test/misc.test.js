const { test } = require('node:test');
const assert = require('node:assert');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');
const p = require('./parameters.js');

const fx = (name, call) =>
  test(name, () => close((call || (() => ta[name].apply(null, p[name].in)))(), p[name].out));

fx('times_up');
fx('times_down');

test('fibnumbers', () => {
  const f = ta.fibnumbers;
  assert.ok(Array.isArray(f), 'is an array');
  assert.strictEqual(f.length, 20, 'has 20 entries');
  assert.strictEqual(f[0], 0);
  assert.strictEqual(f[1], 1);
  for (let i = 2; i < f.length; i++) {
    assert.strictEqual(f[i], f[i - 1] + f[i - 2], 'entry ' + i + ' is sum of the previous two');
  }
});
