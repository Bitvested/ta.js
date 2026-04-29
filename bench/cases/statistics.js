const { priceSeries } = require('../data.js');
const { ta, ti, debut, tulind, tulindSync, id } = require('./_libs.js');

// ta.std(data, length) returns a single scalar; ta.std_series(data, length)
// is the streaming-class companion that returns the rolling series in one
// O(N) pass. The adapter calls std_series directly to compare apples-to-apples
// with the other libs' streaming APIs.
const STD = {
  name: 'std',
  description: 'Rolling Standard Deviation (period=20). ta.js uses std_series for one-pass rolling computation.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.std_series(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.SD.calculate({ values: d, period: 20 }),
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.StandardDeviation(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('stddev', i, [20])[0],
      extract: id,
    },
  },
};

// ta.cor returns a scalar (Pearson correlation of two series). No competitor
// lib exposes a directly comparable scalar API at runtime, so this is a
// solo-perf bench. Listed here (not in Tier 4) because it lives under
// statistics/ alongside std.
const COR = {
  name: 'cor',
  description: 'Pearson Correlation (full-window scalar, two series). Solo bench — no competitor scalar API exposed at runtime.',
  generate: (size) => {
    const a = priceSeries(size, 'cor-a');
    const b = priceSeries(size, 'cor-b');
    return { a, b };
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: ({ a, b }) => ta.cor(a, b),
      extract: (v) => [v],
    },
  },
};

// === Solo benchmarks (ta.js-only) ===

// recent_high / recent_low return a single {index, value} pivot, not a
// rolling-extremum series. To turn that into a meaningful perf benchmark we
// invoke them once on the full series — that's the actual production call
// pattern (single look-back lookup at the latest bar).
const RECENT_HIGH = {
  name: 'recent_high',
  description: 'Most-recent local high (lb=25). Returns a single {index, value} pivot. Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.recent_high(d, 25),
      extract: (o) => [o.value],
    },
  },
};

const RECENT_LOW = {
  name: 'recent_low',
  description: 'Most-recent local low (lb=25). Returns a single {index, value} pivot. Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.recent_low(d, 25),
      extract: (o) => [o.value],
    },
  },
};

const LR_SLOPE = {
  name: 'lr_slope',
  description: 'Linear regression slope (period=14). Matches tulind.linregslope.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.lr_slope(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('linregslope', i, [14])[0],
      extract: id,
    },
  },
};

const LR_INTERCEPT = {
  name: 'lr_intercept',
  description: 'Linear regression intercept (period=14, b at x=0). Matches tulind.linregintercept.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.lr_intercept(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('linregintercept', i, [14])[0],
      extract: id,
    },
  },
};

const LR_ANGLE = {
  name: 'lr_angle',
  description: 'Linear regression angle (period=14, atan(slope) in degrees). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.lr_angle(d, 14), extract: id } },
};

const TSF = {
  name: 'tsf',
  description: 'Time Series Forecast (period=14). lsma + slope. Matches tulind.tsf.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.tsf(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('tsf', i, [14])[0],
      extract: id,
    },
  },
};

module.exports = [STD, COR, RECENT_HIGH, RECENT_LOW, LR_SLOPE, LR_INTERCEPT, LR_ANGLE, TSF];
