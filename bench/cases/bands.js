const { priceSeries, ohlcSeries } = require('../data.js');
const { ta, ti, ts, debut, tulind, tulindSync, id } = require('./_libs.js');

const BBANDS = {
  name: 'bbands',
  description: 'Bollinger Bands middle line (period=20, stdDev=2).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.bands(d, 20, 2),
      extract: (o) => o.map(row => row[1]),
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.BollingerBands.calculate({ values: d, period: 20, stdDev: 2 }),
      extract: (o) => o.map(x => x.middle),
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const b = new ts.BollingerBands(20, 2); const out = [];
        for (let i = 0; i < d.length; i++) { const r = b.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: (o) => o.map(x => x.middle),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const b = new debut.BollingerBands(20, 2); const out = [];
        for (let i = 0; i < d.length; i++) { const r = b.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: (o) => o.map(x => x.middle).filter(v => typeof v === 'number'),
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('bbands', i, [20, 2]),
      extract: (o) => o[1],
    },
  },
};

const KELTNER = {
  name: 'keltner',
  description: 'Keltner Channels (period=20, multiplier=1). Cross-checked vs ti.KeltnerChannels middle.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.keltner(d, 20, 1),
      extract: (o) => o.map(row => row[1]),
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:  d.map(b => b[1]),
        low:   d.map(b => b[2]),
        close: d.map(b => b[3]),
        maPeriod:  20,
        atrPeriod: 20,
        multiplier: 1,
        useSMA: true,
      }),
      compute: (p) => ti.KeltnerChannels.calculate(p),
      extract: (o) => o.map(x => x.middle),
    },
  },
};

// === Solo benchmarks (ta.js-only) ===

const DON = {
  name: 'don',
  description: 'Donchian Channels (period=20). Solo bench. ta.js takes [[H, L], …].',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2]]),
      compute: (d) => ta.don(d, 20),
      extract: (o) => o.map(r => r[1]),
    },
  },
};

const FIBBANDS = {
  name: 'fibbands',
  description: 'Fibonacci Bands (period=20, dev=3). Solo bench. ta.js takes [[price, volume], …].',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = require('../data.js').volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.fibbands(d, 20, 3),
      extract: (o) => o.map(r => r[6]),
    },
  },
};

const ENVELOPE = {
  name: 'envelope',
  description: 'Envelope (period=10, deviation=0.005). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.envelope(d, 10, 0.005),
      extract: (o) => o.map(r => r[1]),
    },
  },
};

module.exports = [BBANDS, KELTNER, DON, FIBBANDS, ENVELOPE];
