const { test } = require('node:test');
const assert = require('node:assert/strict');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');

// Contract tests for alligator/gator against the Pine source pasted in the ta.py
// issue "Williams Alligator not matching the one in trading view".
//
// Two things are encoded here, both read off that Pine rather than off the
// implementation: smma is seeded with ta.sma over the first `length` values, and
// plot(..., offset = shift) shifts the plot right, so bar i carries the value
// computed at bar i - shift. These pin the contract against regression; they do
// not by themselves establish parity with TradingView.

const DATA = [8, 7, 8, 9, 7, 8, 9, 6, 7, 8, 6, 8, 10, 8, 7, 9, 8, 7, 9, 6, 7, 9];
const DEFAULTS = [13, 8, 5, 8, 5, 3];

const repeat = (n) => Array.from({ length: n }, (_, i) => DATA[i % DATA.length]);
const firstDefined = (rows, col) => rows.findIndex((row) => !Number.isNaN(row[col]));

test('alligator/gator: one row per input bar', () => {
  for (const n of [22, 60, 200]) {
    assert.equal(ta.alligator(repeat(n)).length, n);
    assert.equal(ta.gator(repeat(n)).length, n);
  }
});

test('alligator: each line starts at length - 1 + shift', () => {
  const rows = ta.alligator(DATA, ...DEFAULTS);
  [13 - 1 + 8, 8 - 1 + 5, 5 - 1 + 3].forEach((expected, col) => {
    assert.equal(firstDefined(rows, col), expected, `line ${col} first defined bar`);
  });
  rows[rows.length - 1].forEach((value, col) => {
    assert.ok(!Number.isNaN(value), `line ${col} is undefined at the last bar`);
  });
});

test('alligator: zero shifts drop the displacement', () => {
  const rows = ta.alligator(DATA, 13, 8, 5, 0, 0, 0);
  [13 - 1, 8 - 1, 5 - 1].forEach((expected, col) => {
    assert.equal(firstDefined(rows, col), expected, `line ${col} first defined bar`);
  });
});

test('alligator: the SMMA seed lands shift bars later', () => {
  // Hand arithmetic: the fixture's first 13 values sum to 101, its first 8 to 62
  // and its first 5 to 39, so the seeds are 101/13, 62/8 and 39/5 at bars 12, 7
  // and 4 -- each drawn `shift` bars later.
  const rows = ta.alligator(DATA, ...DEFAULTS);
  close(rows[20][0], 101 / 13);
  close(rows[12][1], 62 / 8);
  close(rows[7][2], 39 / 5);
});

test('alligator: jaw is the raw smma displaced by its shift', () => {
  const data = repeat(120);
  for (const [jl, js] of [[13, 8], [13, 0], [5, 3], [21, 1]]) {
    const rows = ta.alligator(data, jl, 8, 5, js, 5, 3);
    const raw = ta.smma(data, jl);
    const first = jl - 1 + js;
    for (let i = 0; i < first; i++) {
      assert.ok(Number.isNaN(rows[i][0]), `jl=${jl} js=${js}: jaw[${i}] should be NaN`);
    }
    for (let i = first; i < data.length; i++) {
      close(rows[i][0], raw[i - first], `jl=${jl} js=${js} bar ${i}`);
    }
  }
});

test('gator: derived from the displaced alligator lines', () => {
  for (const shifts of [[8, 5, 3], [0, 0, 0], [3, 2, 1]]) {
    const lines = ta.alligator(DATA, 13, 8, 5, ...shifts);
    const histogram = ta.gator(DATA, 13, 8, 5, ...shifts);
    lines.forEach(([jaw, teeth, lips], i) => {
      const [upper, lower] = histogram[i];
      assert.equal(Number.isNaN(upper), Number.isNaN(jaw) || Number.isNaN(teeth));
      if (!Number.isNaN(upper)) close(upper, Math.abs(jaw - teeth), `upper[${i}]`);
      assert.equal(Number.isNaN(lower), Number.isNaN(teeth) || Number.isNaN(lips));
      if (!Number.isNaN(lower)) close(lower, -Math.abs(teeth - lips), `lower[${i}]`);
    });
  }
});

test('gator: the upper histogram is never negative', () => {
  ta.gator(DATA, ...DEFAULTS).forEach(([upper], i) => {
    assert.ok(Number.isNaN(upper) || upper >= 0, `upper[${i}] = ${upper}`);
  });
});

test('alligator/gator: data shorter than the jaw length is all NaN', () => {
  for (const fn of [ta.alligator, ta.gator]) {
    const rows = fn(new Array(5).fill(1));
    assert.equal(rows.length, 5);
    rows.forEach((row, i) => {
      row.forEach((value, col) => {
        assert.ok(Number.isNaN(value), `row ${i} column ${col} should be NaN, got ${value}`);
      });
    });
  }
});
