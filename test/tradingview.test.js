const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ta = require('../index.js');

// Parity test against a TradingView chart-data export.
//
// Everything else in the suite is derived from the Pine source pasted in the
// ta.py issue "Williams Alligator not matching the one in trading view"; this is
// the only check that compares against numbers TradingView itself plotted, and
// therefore the only one that can actually establish parity.
//
// To capture the fixture: put the Williams Alligator on a chart (defaults), scroll
// fully left so every loaded bar is in memory, then Chart menu -> "Download chart
// data" -> CSV. The export carries a column per study in the Data Window, so
// Jaw/Teeth/Lips come along with the OHLC. Save it as
// test/fixtures/tradingview_alligator.csv. Trimming rows off the end is fine;
// trimming rows off the front is not.
//
// The window matters. The SMMA is recursive, so its value at any bar depends on
// every bar before it: if the export starts partway through the loaded history,
// the leading rows cannot match and no tolerance helps. This test reports that
// case as a window problem rather than as a value mismatch.

const FIXTURE = path.join(__dirname, 'fixtures', 'tradingview_alligator.csv');

// TradingView writes a fixed number of decimals, so this is the export's print
// precision, not algorithmic slack (the library's own tolerance is 1e-12).
const TV_TOL = 1e-6;

const DEFAULTS = [13, 8, 5, 8, 5, 3];
const JAW_FIRST_BAR = 13 - 1 + 8; // jaw length - 1 + jaw shift

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch !== '"') field += ch;
      else if (text[i + 1] === '"') { field += '"'; i++; }
      else quoted = false;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function loadExport(t) {
  if (!fs.existsSync(FIXTURE)) {
    t.skip(`no TradingView export at ${FIXTURE} — see this file's comment`);
    return null;
  }
  const rows = parseCsv(fs.readFileSync(FIXTURE, 'utf8'));
  assert.ok(rows.length > 1, `${FIXTURE} has no data rows`);

  const header = rows[0].map((h) => h.trim().replace(/^\uFEFF/, '').toLowerCase());
  const find = (...names) => header.findIndex((h) => names.includes(h));
  const highIdx = find('high');
  const lowIdx = find('low');
  const plotIdx = [find('jaw'), find('teeth'), find('lips')];
  assert.ok(
    highIdx !== -1 && lowIdx !== -1 && plotIdx.every((i) => i !== -1),
    `${FIXTURE} has columns ${rows[0].join(', ')}, so it is missing either the OHLC or `
    + 'the Jaw/Teeth/Lips study columns. Re-export with the Alligator on the chart; '
    + 'the export only carries studies that are in the Data Window.',
  );

  const body = rows.slice(1);
  return {
    hl2: body.map((r) => (Number(r[highIdx]) + Number(r[lowIdx])) / 2),
    plots: plotIdx.map((col) => body.map((r) => r[col].trim())),
  };
}

test('tradingview: the export begins where the computation began', (t) => {
  const data = loadExport(t);
  if (!data) return;
  const filled = data.plots[0].map((v, i) => (v ? i : -1)).filter((i) => i !== -1);
  assert.ok(filled.length, 'the export has no Jaw column values at all');
  assert.equal(
    filled[0],
    JAW_FIRST_BAR,
    `jaw first appears at row ${filled[0]}, expected ${JAW_FIRST_BAR}: the export window `
    + 'does not match the loaded history, so the SMMA seeds differ',
  );
});

test('tradingview: jaw/teeth/lips match', (t) => {
  const data = loadExport(t);
  if (!data) return;
  const rows = ta.alligator(data.hl2, ...DEFAULTS);
  assert.equal(rows.length, data.hl2.length);

  let compared = 0;
  ['jaw', 'teeth', 'lips'].forEach((name, col) => {
    data.plots[col].forEach((text, i) => {
      if (!text) return;
      const expected = Number(text);
      const actual = rows[i][col];
      assert.ok(
        !Number.isNaN(actual),
        `${name}[${i}] is NaN here but TradingView plotted ${expected}`,
      );
      assert.ok(
        Math.abs(actual - expected) <= TV_TOL,
        `${name}[${i}]: ta.js ${actual}, TradingView ${expected}`,
      );
      compared++;
    });
  });
  assert.ok(compared > 0, 'the export had no data points to compare');
});
