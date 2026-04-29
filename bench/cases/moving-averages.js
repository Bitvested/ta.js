const { priceSeries } = require('../data.js');
const { ta, ti, ts, debut, tulind, tulindSync, id } = require('./_libs.js');

const SMA = {
  name: 'sma',
  description: 'Simple Moving Average (period=20)',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.sma(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.SMA.calculate({ values: d, period: 20 }),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.SMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.SMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('sma', i, [20])[0],
      extract: id,
    },
  },
};

const EMA = {
  name: 'ema',
  description: 'Exponential Moving Average (period=20)',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.ema(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.EMA.calculate({ values: d, period: 20 }),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.EMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.EMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('ema', i, [20])[0],
      extract: id,
    },
  },
};

const WMA = {
  name: 'wma',
  description: 'Linear Weighted Moving Average (period=20). debut.LWMA is semantically equivalent.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.wma(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.WMA.calculate({ values: d, period: 20 }),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.WMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.LWMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('wma', i, [20])[0],
      extract: id,
    },
  },
};

const SMMA = {
  name: 'smma',
  description: 'Smoothed (Wilder\'s) Moving Average (period=20). ti.WEMA / ts.WSMA / debut.SMMA / tulind.wilders all compute Wilder smoothing.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.smma(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.WEMA.calculate({ values: d, period: 20 }),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.WSMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.SMMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('wilders', i, [20])[0],
      extract: id,
    },
  },
};

const HULL = {
  name: 'hull',
  description: 'Hull Moving Average (period=20). ta.js + tulind only.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.hull(d, 20),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('hma', i, [20])[0],
      extract: id,
    },
  },
};

const KAMA = {
  name: 'kama',
  description: 'Kaufman Adaptive Moving Average (er=10, fast=2, slow=30).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.kama(d, 10, 2, 30),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('kama', i, [10])[0],
      extract: id,
    },
  },
};

const VWMA = {
  name: 'vwma',
  description: 'Volume Weighted Moving Average (period=20). ta.js takes [[price, volume], …].',
  generate: (size) => {
    const ohlc = require('../data.js').ohlcSeries(size);
    const vol = require('../data.js').volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.vwma(d, 20),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[0]), d.map(b => b[1])],
      compute: (parallel) => tulindSync('vwma', parallel, [20])[0],
      extract: id,
    },
  },
};

// === Solo benchmarks (ta.js-only) — perf regression tracking ===

const PWMA = {
  name: 'pwma',
  description: 'Parabolic Weighted Moving Average (period=20). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.pwma(d, 20), extract: id } },
};

const HWMA = {
  name: 'hwma',
  description: 'Hyperbolic Weighted Moving Average (period=20). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.hwma(d, 20), extract: id } },
};

const CWMA = {
  name: 'cwma',
  description: 'Custom Weighted Moving Average (uniform weights, period=20). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => ({ d, weights: new Array(20).fill(1) }),
      compute: ({ d, weights }) => ta.cwma(d, weights),
      extract: id,
    },
  },
};

const LSMA = {
  name: 'lsma',
  description: 'Least Squares Moving Average (period=25). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.lsma(d, 25), extract: id } },
};

const VWWMA = {
  name: 'vwwma',
  description: 'Volume-Weighted WMA (period=20). Solo bench. ta.js takes [[price, volume], …].',
  generate: (size) => {
    const ohlc = require('../data.js').ohlcSeries(size);
    const vol = require('../data.js').volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i]]);
  },
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.vwwma(d, 20), extract: id } },
};

const WSMA = {
  name: 'wsma',
  description: 'Wilder\'s SMA via the wsma alias (period=20). Solo bench (smma covers cross-lib).',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.wsma(d, 20), extract: id } },
};

const DEMA = {
  name: 'dema',
  description: 'Double EMA (period=20). 2·EMA − EMA(EMA).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.dema(d, 20),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.DEMA(20); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('dema', i, [20])[0],
      extract: id,
    },
  },
};

const TEMA = {
  name: 'tema',
  description: 'Triple EMA (period=20). 3·EMA − 3·EMA(EMA) + EMA(EMA(EMA)).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.tema(d, 20),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('tema', i, [20])[0],
      extract: id,
    },
  },
};

const TRIMA = {
  name: 'trima',
  description: 'Triangular Moving Average (period=20). Double-smoothed SMA.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.trima(d, 20),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('trima', i, [20])[0],
      extract: id,
    },
  },
};

const T3 = {
  name: 't3',
  description: 'T3 (Tilson, period=5, vfactor=0.7). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.t3(d, 5, 0.7), extract: id } },
};

const ZLEMA = {
  name: 'zlema',
  description: 'Zero-Lag EMA (period=14). tulind streaming form.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.zlema(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('zlema', i, [14])[0],
      extract: id,
    },
  },
};

const VIDYA = {
  name: 'vidya',
  description: 'Variable Index Dynamic Average (short=2, long=5, alpha=0.2).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.vidya(d, 2, 5, 0.2),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('vidya', i, [2, 5, 0.2])[0],
      extract: id,
    },
  },
};

module.exports = [SMA, EMA, WMA, SMMA, HULL, KAMA, VWMA, PWMA, HWMA, CWMA, LSMA, VWWMA, WSMA, DEMA, TEMA, TRIMA, T3, ZLEMA, VIDYA];
