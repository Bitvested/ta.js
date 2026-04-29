const { test } = require('node:test');
const assert = require('node:assert');
const ta = require('../index.js');

const available = typeof process === 'object' && Number(process.versions.node.split('.')[0]) >= 12;

test('multi.sim loads and returns projections', { skip: !available }, async () => {
  const seed = [100, 101, 102, 103, 104];
  const length = 5;
  const sims = 3;
  const out = await ta.multi.sim(seed, length, sims);
  assert.ok(Array.isArray(out));
  assert.strictEqual(out.length, sims, 'one projection per sim');
  for (const s of out) {
    assert.strictEqual(s.length, seed.length + length, 'projection extends seed by `length`');
    for (let i = 0; i < seed.length; i++) {
      assert.strictEqual(s[i], seed[i], 'seed preserved at head');
    }
    for (const v of s) assert.ok(Number.isFinite(v), 'all projected values finite');
  }
});
