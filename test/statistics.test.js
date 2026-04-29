const { test } = require('node:test');
const assert = require('node:assert');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');
const p = require('./parameters.js');

const fx = (name, call) =>
  test(name, () => close((call || (() => ta[name].apply(null, p[name].in)))(), p[name].out));

fx('sum');
fx('std');
fx('std_series');
fx('variance');
fx('ncdf');
fx('normsinv');
fx('percentile');
fx('cor');
fx('covariance');
fx('dif');
fx('er');
fx('ar');
fx('kelly');
fx('martingale');
fx('antimartingale');
fx('permutations');
fx('expected_trails');
fx('winratio');
fx('avgwin');
fx('avgloss');
fx('return_positive');
fx('return_negative');
fx('drawdown');
fx('median');
fx('recent_high');
fx('recent_low');
fx('mad');
fx('aad');
fx('se');
fx('ssd');
fx('log');
fx('exp');
fx('normalize');
fx('denormalize');
fx('normalize_pair');
fx('normalize_from');
fx('standardize');
fx('zscore');
fx('pvalue');
fx('kmeans');
fx('mse');
fx('cum');
fx('lr_slope');
fx('lr_intercept');
fx('lr_angle');
fx('tsf');

// `sim` is stochastic (uses Math.random), so we only shape-check.
test('sim (shape)', () => {
  const seed = [100, 101, 102, 103, 104];
  const length = 10, sims = 5;
  const out = ta.sim(seed, length, sims);
  assert.strictEqual(out.length, sims, 'one projection per sim');
  for (const s of out) {
    assert.strictEqual(s.length, seed.length + length, 'projection extends seed by `length`');
    for (let i = 0; i < seed.length; i++) {
      assert.strictEqual(s[i], seed[i], 'seed is preserved unchanged at the head');
    }
    for (const v of s) assert.ok(Number.isFinite(v), 'all projected values finite');
  }
});
