const { priceSeries, ohlcSeries, volumeSeries } = require('../data.js');
const { ta, ti, ts, debut, tulind, tulindSync, id } = require('./_libs.js');

const AO = {
  name: 'ao',
  description: 'Awesome Oscillator (5/35 SMA on (H+L)/2). Each lib gets bars in its native shape.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2]]),
      compute: (d) => ta.ao(d, 5, 35),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:        d.map(b => b[1]),
        low:         d.map(b => b[2]),
        fastPeriod:  5,
        slowPeriod:  35,
        format:      (n) => n,
      }),
      compute: (p) => ti.AwesomeOscillator.calculate(p),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2] })),
      compute: (bars) => {
        const a = new ts.AO(5, 35); const out = [];
        for (let i = 0; i < bars.length; i++) { const r = a.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const a = new debut.AO(5, 35); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = a.nextValue(d[i][1], d[i][2]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('ao', parallel, [])[0],
      extract: id,
    },
  },
};

const MOM_OSC = {
  name: 'mom_osc',
  description: 'Chande Momentum Oscillator (period=10). Cross-checked vs tulind.cmo.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.mom_osc(d, 10),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('cmo', i, [10])[0],
      extract: id,
    },
  },
};

const AC = {
  name: 'ac',
  description: 'Williams Accelerator (5/34/5 default). ta.js + ts.AC.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2]]),
      compute: (d) => ta.ac(d, 5, 35),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2] })),
      compute: (bars) => {
        const a = new ts.AC(5, 35, 5); const out = [];
        for (let i = 0; i < bars.length; i++) { const r = a.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
  },
};

const CHAIKIN_OSC = {
  name: 'chaikin_osc',
  description: 'Chaikin Oscillator (3/10 EMAs over ADL). ta.js takes [[H, C, L, V]]; debut takes (h, l, c, v).',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[0], b[1], b[2], b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2], b[4]]),
      compute: (d) => ta.chaikin_osc(d, 3, 10),
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const c = new debut.ChaikinOscillator(3, 10); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = c.nextValue(d[i][1], d[i][2], d[i][3], d[i][4]);
          if (r !== undefined && Number.isFinite(r)) out.push(r);
        }
        return out;
      },
      extract: id,
    },
  },
};

const FISHER = {
  name: 'fisher',
  description: 'Fisher Transform (period=10). Cross-checked vs tulind.fisher (which takes H,L).',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      // ta.js expects a number[]; classical Fisher uses (H+L)/2.
      prepare: (d) => d.map(b => (b[1] + b[2]) / 2),
      compute: (d) => ta.fisher(d, 10),
      extract: (o) => o.map(row => row[0]),
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('fisher', parallel, [10])[0],
      extract: id,
    },
  },
};

const GATOR = {
  name: 'gator',
  description: 'Gator Oscillator (default 13/8/5 jaw/teeth/lips). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.gator(d), extract: (o) => o.map(r => r[0]) } },
};

const ULT = {
  name: 'ult',
  description: 'Ultimate Oscillator (7/14/28). ta.js takes [[H,C,L], …]; tulind takes parallel HLC arrays.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.ult(d, 7, 14, 28),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('ultosc', parallel, [7, 14, 28])[0],
      extract: id,
    },
  },
};

const KVO = {
  name: 'kvo',
  description: 'Klinger Volume Oscillator (34, 55). ta.js takes [[H, C, L, V], …].',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[0], b[1], b[2], b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2], b[4]]),
      compute: (d) => ta.kvo(d, 34, 55),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3]), d.map(b => b[4])],
      compute: (parallel) => tulindSync('kvo', parallel, [34, 55])[0],
      extract: id,
    },
  },
};

module.exports = [AO, MOM_OSC, AC, CHAIKIN_OSC, FISHER, GATOR, ULT, KVO];
