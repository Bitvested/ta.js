const { test } = require('node:test');
const assert = require('node:assert/strict');
const ta = require('../index.js');

// Contract test for halftrend, encoding everget's Pine source
// (tradingview.com/script/U1SJ8ubc-HalfTrend/), which the implementation was
// ported from.
//
// Three properties of that Pine are what a values fixture alone cannot pin, and
// what the previous implementation got wrong: it emits one row per input bar;
// the price extremes come from `amplitude` bars, not from the ATR window; and the
// trend actually flips. The old code read `sma(...)[0]` — the SMA at the start of
// its window rather than the current bar — so both flip conditions compared
// values around `atrlen` bars old and never fired. On 4901 bars of 5-minute data
// it produced zero flips.
//
// The series is a deterministic zig-zag, generated rather than pasted, so the Go
// and Python ports can pin the identical numbers.

function sawtooth() {
  const bars = [];
  let price = 100;
  for (const leg of [3, -3, 4, -4, 5, -5, 6, -6, 4, -4, 2, -2]) {
    for (let i = 0; i < 4; i++) {
      price += leg;
      bars.push([price + 1, price, price - 1]);
    }
  }
  return bars;
}

test('halftrend: one row per input bar', () => {
  for (const n of [6, 12, 48]) {
    assert.equal(ta.halftrend(sawtooth().slice(0, n), 6, 3, 2).length, n);
  }
});

test('halftrend: channel is NaN until the ATR window is full', () => {
  const out = ta.halftrend(sawtooth(), 6, 3, 2);
  out.forEach((row, i) => {
    for (const col of [0, 2]) {
      assert.equal(Number.isNaN(row[col]), i < 5, `atrHigh/atrLow at row ${i}`);
    }
    assert.ok(!Number.isNaN(row[1]), `trend line undefined at row ${i}`);
  });
});

test('halftrend: trend flips at the Pine bars', () => {
  const out = ta.halftrend(sawtooth(), 6, 3, 2);
  const flips = [];
  for (let i = 1; i < out.length; i++) if (out[i][3] !== out[i - 1][3]) flips.push(i);
  assert.deepEqual(flips, [6, 10, 14, 18, 22, 26, 30, 35, 38]);

  const line = [5, 6, 20, 24, 47].map(i => out[i][1]);
  assert.deepEqual(line, [108, 108, 114, 107, 105]);

  const atrHigh = [5, 6, 24].map(i => out[i][0]);
  assert.deepEqual(atrHigh, [111.66666666666667, 111.72222222222223, 112.91735310176668]);
});
