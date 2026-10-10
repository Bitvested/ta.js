const { test } = require('node:test');
const assert = require('node:assert/strict');
const { close, nearlyEqual } = require('./helpers/close.js');
const ta = require('../index.js');

// Contract tests for occ, encoding the Pine it was ported from:
//
//   closeSeries = variant(basisType, close[delayOffset], basisLen, ...)
//   openSeries  = variant(basisType, open[delayOffset],  basisLen, ...)
//   xlong  = ta.crossover(closeSeries, openSeries)
//   xshort = ta.crossunder(closeSeries, openSeries)
//
// Most of these pin alignment rather than values, because a wrong warm-up assumption
// yields plausible numbers at the wrong bars.

const BASIS_TYPES = ['SMA', 'EMA', 'DEMA', 'TEMA', 'WMA', 'SMMA', 'HullMA', 'TMA'];
const DATA = [[10, 12], [11, 13], [12, 14], [13, 15], [14, 16], [15, 17]];

function series(n = 200, step = 0.7, seed = 5) {
  let x = seed;
  const rnd = () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x / 0x7fffffff; };
  const out = [];
  let open = 100;
  for (let i = 0; i < n; i++) {
    out.push([open, open + step]);
    open += (rnd() - 0.5) * 2;
  }
  return out;
}

test('occ: one row of three cells per input bar', () => {
  for (const n of [6, 60, 200]) {
    const rows = ta.occ(series(n), 3, 'SMA');
    assert.equal(rows.length, n);
    rows.forEach((row, i) => assert.equal(row.length, 3, `row ${i}`));
  }
});

test('occ: SMA basis is the rolling mean, by hand', () => {
  const rows = ta.occ(DATA, 3, 'SMA');
  const opens = DATA.map((d) => d[0]);
  const closes = DATA.map((d) => d[1]);
  rows.forEach((row, i) => {
    if (i < 2) {
      assert.ok(Number.isNaN(row[0]) && Number.isNaN(row[1]), `row ${i} should be NaN`);
      return;
    }
    const win = (a) => (a[i] + a[i - 1] + a[i - 2]) / 3;
    close(row[0], win(closes), `row ${i} close basis`);
    close(row[1], win(opens), `row ${i} open basis`);
  });
});

test('occ: direction is whichever basis is on top', () => {
  for (const basis of BASIS_TYPES) {
    ta.occ(series(120), 8, basis).forEach((row, i) => {
      if (Number.isNaN(row[0])) {
        assert.ok(Number.isNaN(row[1]), `${basis} row ${i}: close NaN but open is not`);
        assert.ok(Number.isNaN(row[2]), `${basis} row ${i}: direction should be NaN`);
        return;
      }
      assert.equal(row[2], row[0] > row[1] ? 'long' : 'short', `${basis} row ${i}`);
    });
  }
});

test('occ: both bases are defined on the same bars, with no gaps', () => {
  for (const basis of BASIS_TYPES) {
    for (const basisLen of [3, 8, 13]) {
      const rows = ta.occ(series(200), basisLen, basis);
      let first = -1;
      rows.forEach((row, i) => {
        if (Number.isNaN(row[0])) {
          assert.equal(first, -1, `${basis} len=${basisLen}: gap at row ${i}`);
          return;
        }
        if (first === -1) first = i;
        assert.ok(!Number.isNaN(row[1]), `${basis} len=${basisLen} row ${i}: open undefined`);
      });
      assert.notEqual(first, -1, `${basis} len=${basisLen}: nothing defined`);
    }
  }
});

test('occ: basis matches the underlying primitive', () => {
  const data = series(200);
  const closes = data.map((d) => d[1]);
  const rows = ta.occ(data, 8, 'SMA');
  const want = ta.sma(closes, 8);
  const first = data.length - want.length;
  for (let i = first; i < data.length; i++) close(rows[i][0], want[i - first], `row ${i}`);
});

test('occ: delay shifts both bases right by exactly delay', () => {
  const data = series(120);
  for (const basis of BASIS_TYPES) {
    const base = ta.occ(data, 8, basis, 0);
    const delayed = ta.occ(data, 8, basis, 3);
    delayed.forEach((row, i) => {
      if (Number.isNaN(row[0])) return;
      close(row[0], base[i - 3][0], `${basis} row ${i} close`);
      close(row[1], base[i - 3][1], `${basis} row ${i} open`);
    });
    for (let i = 0; i < 3; i++) {
      assert.ok(Number.isNaN(delayed[i][0]), `${basis} row ${i} should be NaN at delay 3`);
    }
  }
});

test('occ: truncating the tail does not change earlier rows', () => {
  // An independent check on alignment: every basis is causal, so dropping the last bar
  // cannot change an earlier row. The previous test derives its offset the same way the
  // implementation does, so it cannot catch a systematic off-by-one on its own.
  const data = series(150);
  for (const basis of BASIS_TYPES) {
    const full = ta.occ(data, 8, basis);
    const cut = ta.occ(data.slice(0, -1), 8, basis);
    assert.equal(cut.length, full.length - 1);
    cut.forEach((row, i) => {
      for (const col of [0, 1]) {
        const a = row[col], b = full[i][col];
        if (Number.isNaN(a) || Number.isNaN(b)) {
          assert.ok(Number.isNaN(a) && Number.isNaN(b), `${basis} row ${i} col ${col}`);
        } else {
          assert.ok(nearlyEqual(a, b), `${basis} row ${i} col ${col}`);
        }
      }
      assert.equal(row[2], full[i][2], `${basis} row ${i} direction`);
    });
  }
});

test('occ: default basis is SMMA with length 8', () => {
  const data = series(80);
  close(ta.occ(data), ta.occ(data, 8, 'SMMA'), 'occ defaults');
});

test('occ: rejects input it cannot use', () => {
  const data = series(40);
  for (const basis of ['ALMA', 'LSMA', 'VWMA', 'SSMA', 'nonsense', '']) {
    assert.throws(() => ta.occ(data, 8, basis), `basisType ${basis}`);
  }
  assert.throws(() => ta.occ(data, 0, 'SMA'));
  assert.throws(() => ta.occ(data, 8, 'SMA', -1));
});

test('occ: data shorter than the basis is all NaN', () => {
  const rows = ta.occ(series(4), 13);
  assert.equal(rows.length, 4);
  rows.forEach((row) => row.forEach((v) => assert.ok(Number.isNaN(v))));
});
