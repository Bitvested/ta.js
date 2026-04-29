const { priceSeries, ohlcSeries, volumeSeries } = require('../data.js');
const { ta, ti, ts, debut, tulind, tulindSync, id } = require('./_libs.js');

function hcvSeries(size) {
  const ohlc = ohlcSeries(size);
  const vol = volumeSeries(size);
  return ohlc.map((b, i) => [b[0], b[1], b[2], b[3], vol[i]]); // [O,H,L,C,V] for adapters to repick
}

const RSI = {
  name: 'rsi',
  description: 'Relative Strength Index (period=14, Wilder smoothing).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.rsi(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.RSI.calculate({ values: d, period: 14 }),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.RSI(14); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.RSI(14); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('rsi', i, [14])[0],
      extract: id,
    },
  },
};

const MACD = {
  name: 'macd',
  description: 'MACD line (fast=12, slow=26). ta.js exposes only the line; we extract the line from others.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.macd(d, 12, 26),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.MACD.calculate({
        values: d, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9,
        SimpleMAOscillator: false, SimpleMASignal: false,
      }),
      extract: (o) => o.map(x => x.MACD).filter(v => typeof v === 'number'),
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const m = new ts.MACD(new ts.EMA(12), new ts.EMA(26), new ts.EMA(9));
        const out = [];
        for (let i = 0; i < d.length; i++) { const r = m.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: (o) => o.map(x => x.macd),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const m = new debut.MACD(12, 26, 9); const out = [];
        for (let i = 0; i < d.length; i++) { const r = m.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: (o) => o.map(x => x.macd).filter(v => typeof v === 'number'),
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('macd', i, [12, 26, 9]),
      extract: (o) => o[0],
    },
  },
};

const ATR = {
  name: 'atr',
  description: 'Average True Range (period=14). Each lib gets bars in its native shape.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.atr(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:  d.map(b => b[1]),
        low:   d.map(b => b[2]),
        close: d.map(b => b[3]),
        period: 14,
      }),
      compute: (p) => ti.ATR.calculate(p),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2], close: b[3] })),
      compute: (bars) => {
        const a = new ts.ATR(14); const out = [];
        for (let i = 0; i < bars.length; i++) { const r = a.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const a = new debut.ATR(14); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = a.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('atr', parallel, [14])[0],
      extract: id,
    },
  },
};

const ROC = {
  name: 'roc',
  description: 'Rate of Change (period=14, percent units after v2.0).',
  // tulind.roc returns the raw ratio (e.g. 0.06), every other lib returns
  // percent (e.g. 6.0). Use TI as reference for a same-convention diff.
  reference: 'technicalindicators',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.roc(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.ROC.calculate({ values: d, period: 14 }),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: id,
      compute: (d) => {
        const s = new ts.ROC(14); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.update(d[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.ROC(14); const out = [];
        for (let i = 0; i < d.length; i++) { const r = s.nextValue(d[i]); if (r !== undefined) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('roc', i, [14])[0],
      extract: id,
    },
  },
};

const PSAR = {
  name: 'psar',
  description: 'Parabolic SAR (step=0.02, max=0.2). ta.js takes [[H, L], …]; competitor APIs vary.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2]]),
      compute: (d) => ta.psar(d, 0.02, 0.2),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:  d.map(b => b[1]),
        low:   d.map(b => b[2]),
        step:  0.02,
        max:   0.2,
      }),
      compute: (p) => ti.PSAR.calculate(p),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2] })),
      compute: (bars) => {
        const p = new ts.PSAR({ accelerationStep: 0.02, accelerationMax: 0.2 });
        const out = [];
        for (let i = 0; i < bars.length; i++) { const r = p.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const p = new debut.PSAR(0.02, 0.2); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = p.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('psar', parallel, [0.02, 0.2])[0],
      extract: id,
    },
  },
};

const PR = {
  name: 'pr',
  description: 'Williams %R (period=14). ta.js takes a close-only series; competitors take HLC.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => b[3]),
      compute: (d) => ta.pr(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:  d.map(b => b[1]),
        low:   d.map(b => b[2]),
        close: d.map(b => b[3]),
        period: 14,
      }),
      compute: (p) => ti.WilliamsR.calculate(p),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2], close: b[3] })),
      compute: (bars) => {
        const w = new ts.WilliamsR(14); const out = [];
        for (let i = 0; i < bars.length; i++) { const r = w.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('willr', parallel, [14])[0],
      extract: id,
    },
  },
};

const MFI = {
  name: 'mfi',
  description: 'Money Flow Index (period=14). ta.js v2.0 takes [[H, L, C, V], …] — TA-Lib convention.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[0], b[1], b[2], b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2], b[3], b[4]]),
      compute: (d) => ta.mfi(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:   d.map(b => b[1]),
        low:    d.map(b => b[2]),
        close:  d.map(b => b[3]),
        volume: d.map(b => b[4]),
        period: 14,
      }),
      compute: (p) => ti.MFI.calculate(p),
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const m = new debut.MFI(14); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = m.nextValue(d[i][1], d[i][2], d[i][3], d[i][4]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3]), d.map(b => b[4])],
      compute: (parallel) => tulindSync('mfi', parallel, [14])[0],
      extract: id,
    },
  },
};

const STOCH = {
  name: 'stoch',
  description: 'Stochastic %K (length=14, smoothD=3, smoothK=3). Cross-lib comparison on the %K line.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.stoch(d, 14, 3, 3),
      extract: (o) => o.map(row => row[0]),
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:   d.map(b => b[1]),
        low:    d.map(b => b[2]),
        close:  d.map(b => b[3]),
        period: 14,
        signalPeriod: 3,
      }),
      compute: (p) => ti.Stochastic.calculate(p),
      extract: (o) => o.map(x => x.k),
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2], close: b[3] })),
      compute: (bars) => {
        const s = new ts.StochasticOscillator(14, 3, 3); const out = [];
        for (let i = 0; i < bars.length; i++) { const r = s.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: (o) => o.map(x => x.stochK),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.Stochastic(14, 3, 3); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = s.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined && r.k !== undefined) out.push(r);
        }
        return out;
      },
      extract: (o) => o.map(x => x.k),
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('stoch', parallel, [14, 3, 3]),
      extract: (o) => o[0],
    },
  },
};

const OBV = {
  name: 'obv',
  description: 'On-Balance Volume. ta.js takes [[volume, close], …]; competitors take HLC+V or OHLCV.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[0], b[1], b[2], b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[4], b[3]]),
      compute: (d) => ta.obv(d),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        close:  d.map(b => b[3]),
        volume: d.map(b => b[4]),
      }),
      compute: (p) => ti.OBV.calculate(p),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ open: b[0], high: b[1], low: b[2], close: b[3], volume: b[4] })),
      compute: (bars) => {
        // ts.OBV has a getRequiredInputs() bug in v7: it returns undefined,
        // so its candle-history bound never trips and the first update
        // throws on `candles[-1].close`. Swallow the warmup throw.
        const o = new ts.OBV(); const out = [];
        for (let i = 0; i < bars.length; i++) {
          let r = null;
          try { r = o.update(bars[i], false); } catch (_) { /* warmup */ }
          if (r !== null) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[3]), d.map(b => b[4])],
      compute: (parallel) => tulindSync('obv', parallel, []),
      extract: (o) => o[0],
    },
  },
};

const MOM = {
  name: 'mom',
  description: 'Momentum (period=10). ta.js: data[i] − data[i − period]. Cross-checked vs tulind.mom.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.mom(d, 10),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('mom', i, [10])[0],
      extract: id,
    },
  },
};

const BOP = {
  name: 'bop',
  description: 'Balance of Power (period=14, SMA-smoothed). ta.js OHLC → tulind OHLC.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.bop(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[0]), d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('bop', parallel, [])[0],
      extract: id,
    },
  },
};

const FI = {
  name: 'fi',
  description: 'Force Index (period=13). ta.js takes [[close, volume], …]; ti.ForceIndex takes parallel arrays.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.fi(d, 13),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({ close: d.map(b => b[0]), volume: d.map(b => b[1]), period: 13 }),
      compute: (p) => ti.ForceIndex.calculate(p),
      extract: id,
    },
  },
};

const VWAP = {
  name: 'vwap',
  description: 'Volume Weighted Average Price (full-window). ta.js single-window scalar series; ti.VWAP series.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i], b[1], b[2]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[0], b[1]]),
      compute: (d) => ta.vwap(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:   d.map(b => b[2]),
        low:    d.map(b => b[3]),
        close:  d.map(b => b[0]),
        volume: d.map(b => b[1]),
      }),
      compute: (p) => ti.VWAP.calculate(p),
      extract: id,
    },
  },
};

const KST = {
  name: 'kst',
  description: 'Know Sure Thing (default Pring params). ta.js + ti only.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.kst(d),
      extract: (o) => o.map(row => row[0]),
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.KST.calculate({
        values: d,
        ROCPer1: 10, ROCPer2: 15, ROCPer3: 20, ROCPer4: 30,
        SMAROCPer1: 10, SMAROCPer2: 10, SMAROCPer3: 10, SMAROCPer4: 15,
        signalPeriod: 9,
      }),
      extract: (o) => o.map(x => x.kst),
    },
  },
};

const ICHIMOKU = {
  name: 'ichimoku',
  description: 'Ichimoku Cloud (9/26/52/26). Cross-lib correctness compared on the Senkou A line.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.ichimoku(d, 9, 26, 52, 26),
      extract: (o) => o.map(row => row[2]),
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:  d.map(b => b[1]),
        low:   d.map(b => b[2]),
        close: d.map(b => b[3]),
        conversionPeriod: 9,
        basePeriod: 26,
        spanPeriod: 52,
        displacement: 26,
      }),
      compute: (p) => ti.IchimokuCloud.calculate(p),
      extract: (o) => o.map(x => x.spanA),
    },
  },
};

const HV = {
  name: 'hv',
  description: 'Historical Volatility (period=10). ta.js + tulind.volatility.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.hv(d, 10),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('volatility', i, [10])[0],
      extract: id,
    },
  },
};

const CROSS = {
  name: 'cross',
  description: 'Detect crossovers between two series (close vs SMA(20)). Output: count of crossings.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => ({ d1: d, d2: ta.sma(d, 20) }),
      compute: ({ d1, d2 }) => ta.cross(d1, d2),
      extract: (o) => o.map(c => c.cross ? 1 : -1),
    },
    'tulind': tulind && {
      prepare: (d) => {
        const sma = ta.sma(d, 20);
        const aligned = d.slice(d.length - sma.length);
        return [aligned, sma];
      },
      compute: (parallel) => tulindSync('crossany', parallel, [])[0],
      extract: id,
    },
  },
};

const AROON_UP = {
  name: 'aroon_up',
  description: 'Aroon Up (period=10). Cross-checked vs tulind.aroon[1] (high line).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.aroon.up(d, 10),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d, d],
      compute: (parallel) => tulindSync('aroon', parallel, [10])[1],
      extract: id,
    },
  },
};

const AROON_DOWN = {
  name: 'aroon_down',
  description: 'Aroon Down (period=10). Cross-checked vs tulind.aroon[0] (low line).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.aroon.down(d, 10),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d, d],
      compute: (parallel) => tulindSync('aroon', parallel, [10])[0],
      extract: id,
    },
  },
};

const AROON_OSC = {
  name: 'aroon_osc',
  description: 'Aroon Oscillator (period=10). Cross-checked vs tulind.aroonosc.',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.aroon.osc(d, 10),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d, d],
      compute: (parallel) => tulindSync('aroonosc', parallel, [10])[0],
      extract: id,
    },
  },
};

const SUPERTREND = {
  name: 'supertrend',
  description: 'SuperTrend bands (period=20, multiplier=3). ta.js outputs band pair; debut outputs full state.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.supertrend(d, 20, 3),
      extract: (o) => o.map(row => row[0]),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.SuperTrend(20, 3); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = s.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: (o) => o.map(x => x.upper),
    },
  },
};

// === Solo benchmarks (ta.js-only) — perf regression tracking ===

const ALLIGATOR = {
  name: 'alligator',
  description: 'Williams Alligator (default 13/8/5 jaw/teeth/lips). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.alligator(d), extract: (o) => o.map(r => r[0]) } },
};

const HALFTREND = {
  name: 'halftrend',
  description: 'HalfTrend (atr=14, amplitude=10, deviation=2). Solo bench. ta.js takes [[H, C, L], …].',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.halftrend(d, 14, 10, 2),
      extract: (o) => o.map(r => r[1]),
    },
  },
};

const ZIGZAG = {
  name: 'zigzag',
  description: 'ZigZag (perc=0.05) on close-only series. Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.zigzag(d, 0.05), extract: id } },
};

const ELDERRAY = {
  name: 'elderray',
  description: 'Elder Ray (period=13). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.elderray(d, 13), extract: (o) => o.map(r => r[0]) } },
};

const RVI = {
  name: 'rvi',
  description: 'Relative Vigor Index (period=10). Solo bench.',
  generate: (size) => ohlcSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.rvi(d, 10), extract: id } },
};

const RVI_SIGNAL = {
  name: 'rvi_signal',
  description: 'RVI signal smoother (over precomputed RVI series). Solo bench.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    return ta ? ta.rvi(ohlc, 10) : [];
  },
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.rvi_signal(d), extract: id } },
};

const RSI_DIVERGENCE = {
  name: 'rsi_divergence',
  description: 'RSI Divergence detection (period=14). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.rsi_divergence(d, 14), extract: id } },
};

const DIVERGENCE = {
  name: 'divergence',
  description: 'Detect divergence between two series (close vs SMA(20)). Solo bench.',
  generate: (size) => {
    const d = priceSeries(size);
    return { d, sma: ta ? ta.sma(d, 20) : [] };
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: ({ d, sma }) => ta.divergence(d, sma),
      extract: id,
    },
  },
};

const COP = {
  name: 'cop',
  description: 'Coppock Curve (default 11/14/10). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.cop(d), extract: id } },
};

const ASI = {
  name: 'asi',
  description: 'Accumulative Swing Index. Solo bench.',
  generate: (size) => ohlcSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.asi(d), extract: id } },
};

const TSI = {
  name: 'tsi',
  description: 'True Strength Index (long=25, short=13, signal=13). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.tsi(d), extract: (o) => o.map(r => r[0]) } },
};

const BANDWIDTH = {
  name: 'bandwidth',
  description: 'Bollinger Bandwidth (period=20, dev=2). Solo bench.',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.bandwidth(d, 20, 2), extract: id } },
};

const FRACTALS = {
  name: 'fractals',
  description: 'Williams Fractals (price-mode). Solo bench. ta.js takes [[H, L], …].',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2]]),
      compute: (d) => ta.fractals(d, true),
      extract: (o) => o.map(r => r[0]),
    },
  },
};

const FIB = {
  name: 'fib',
  description: 'Fibonacci retracement levels (start, end). Solo bench (microbenchmark — single call returning 11 levels).',
  generate: (size) => ({ start: 100, end: 200 + (size % 100) }),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: ({ start, end }) => ta.fib(start, end),
      extract: id,
    },
  },
};

const WRSI = {
  name: 'wrsi',
  description: 'Wilder RSI alias (period=14). Solo bench (rsi covers cross-lib).',
  generate: (size) => priceSeries(size),
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.wrsi(d, 14), extract: id } },
};

const ADL = {
  name: 'adl',
  description: 'Chaikin Accumulation/Distribution Line. ta.js takes [[H,C,L,V], …]; tulind exposes as ad.',
  generate: hcvSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2], b[4]]),
      compute: (d) => ta.adl(d),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:   d.map(b => b[1]),
        low:    d.map(b => b[2]),
        close:  d.map(b => b[3]),
        volume: d.map(b => b[4]),
      }),
      compute: (p) => ti.ADL.calculate(p),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3]), d.map(b => b[4])],
      compute: (parallel) => tulindSync('ad', parallel, [])[0],
      extract: id,
    },
  },
};

const CCI = {
  name: 'cci',
  description: 'Commodity Channel Index (period=20). ta.js takes [[H,C,L], …]; competitors take HLC.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.cci(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        high:  d.map(b => b[1]),
        low:   d.map(b => b[2]),
        close: d.map(b => b[3]),
        period: 20,
      }),
      compute: (p) => ti.CCI.calculate(p),
      extract: id,
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2], close: b[3] })),
      compute: (bars) => {
        const c = new ts.CCI(20); const out = [];
        for (let i = 0; i < bars.length; i++) { const r = c.update(bars[i], false); if (r !== null) out.push(r); }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const c = new debut.CCI(20); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = c.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('cci', parallel, [20])[0],
      extract: id,
    },
  },
};

const TRIX = {
  name: 'trix',
  description: 'TRIX — 1-day ROC of triple-smoothed EMA (period=20, percent units).',
  generate: (size) => priceSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.trix(d, 20),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.TRIX.calculate({ values: d, period: 20 }),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('trix', i, [20])[0],
      extract: id,
    },
  },
};

const PDM = {
  name: 'pdm',
  description: 'Wilder +DM (period=14). ta.js takes [[H,C,L], …]; tulind dm exposes parallel HL.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.pdm(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('dm', parallel, [14]),
      extract: (o) => o[0],
    },
  },
};

const MDM = {
  name: 'mdm',
  description: 'Wilder −DM (period=14).',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.mdm(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('dm', parallel, [14]),
      extract: (o) => o[1],
    },
  },
};

const PDI = {
  name: 'pdi',
  description: '+DI (period=14). Matches ti.ADX.pdi and debut.ADX.pdi.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.pdi(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({ high: d.map(b => b[1]), low: d.map(b => b[2]), close: d.map(b => b[3]), period: 14 }),
      compute: (p) => ti.ADX.calculate(p),
      extract: (o) => o.map(x => x.pdi),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const a = new debut.ADX(14); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = a.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined && r.pdi !== undefined) out.push(r.pdi);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('di', parallel, [14]),
      extract: (o) => o[0],
    },
  },
};

const MDI = {
  name: 'mdi',
  description: '−DI (period=14). Matches ti.ADX.mdi and debut.ADX.mdi.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.mdi(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({ high: d.map(b => b[1]), low: d.map(b => b[2]), close: d.map(b => b[3]), period: 14 }),
      compute: (p) => ti.ADX.calculate(p),
      extract: (o) => o.map(x => x.mdi),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const a = new debut.ADX(14); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = a.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined && r.mdi !== undefined) out.push(r.mdi);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('di', parallel, [14]),
      extract: (o) => o[1],
    },
  },
};

const DX = {
  name: 'dx',
  description: 'Directional Index (period=14).',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.dx(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('dx', parallel, [14])[0],
      extract: id,
    },
  },
};

const ADX = {
  name: 'adx',
  description: 'Wilder ADX (period=14). Matches ti.ADX.adx and debut.ADX.adx.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.adx(d, 14),
      extract: id,
    },
    'technicalindicators': ti && {
      prepare: (d) => ({ high: d.map(b => b[1]), low: d.map(b => b[2]), close: d.map(b => b[3]), period: 14 }),
      compute: (p) => ti.ADX.calculate(p),
      extract: (o) => o.map(x => x.adx).filter(v => typeof v === 'number'),
    },
    'trading-signals': ts && {
      prepare: (d) => d.map(b => ({ high: b[1], low: b[2], close: b[3] })),
      compute: (bars) => {
        const a = new ts.ADX(14); const out = [];
        for (let i = 0; i < bars.length; i++) {
          let r = null;
          try { r = a.update(bars[i], false); } catch (_) {}
          if (r !== null) out.push(r);
        }
        return out;
      },
      extract: id,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const a = new debut.ADX(14); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = a.nextValue(d[i][1], d[i][2], d[i][3]);
          if (r !== undefined && r.adx !== undefined) out.push(r.adx);
        }
        return out;
      },
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('adx', parallel, [14])[0],
      extract: id,
    },
  },
};

const ADXR = {
  name: 'adxr',
  description: 'ADX Rating (period=14). adxr[i] = (adx[i] + adx[i − length + 1]) / 2.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.adxr(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('adxr', parallel, [14])[0],
      extract: id,
    },
  },
};

const STOCH_RSI = {
  name: 'stoch_rsi',
  description: 'Stochastic RSI (rsi=14, stoch=14, k=3, d=3). Cross-lib comparison on the smoothed K line.',
  // ta.js / ti / debut all return SMA-smoothed K (0-100). tulind.stochrsi and
  // ts.StochasticRSI return raw fastK in [0, 1] with no smoothing — semantically
  // different functions. Reference TI (closest match in shape and convention).
  reference: 'technicalindicators',
  generate: priceSeries,
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.stoch_rsi(d, 14, 14, 3, 3),
      extract: (o) => o.map(row => row[0]),
    },
    'technicalindicators': ti && {
      prepare: id,
      compute: (d) => ti.StochasticRSI.calculate({
        values: d, rsiPeriod: 14, stochasticPeriod: 14, kPeriod: 3, dPeriod: 3,
      }),
      extract: (o) => o.map(x => x.k),
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const s = new debut.StochasticRSI(14); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = s.nextValue(d[i]);
          if (r !== undefined && typeof r.k === 'number') out.push(r.k);
        }
        return out;
      },
      extract: id,
    },
  },
};

const PPO = {
  name: 'ppo',
  description: 'Percentage Price Oscillator (12, 26). 100·(EMA12 − EMA26)/EMA26.',
  generate: priceSeries,
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.ppo(d, 12, 26),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('ppo', i, [12, 26])[0],
      extract: id,
    },
  },
};

const APO = {
  name: 'apo',
  description: 'Absolute Price Oscillator (12, 26). EMA12 − EMA26.',
  generate: priceSeries,
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.apo(d, 12, 26),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('apo', i, [12, 26])[0],
      extract: id,
    },
  },
};

const CMF = {
  name: 'cmf',
  description: 'Chaikin Money Flow (period=20). ta.js takes [[H, C, L, V], …]. Solo bench.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[1], b[3], b[2], vol[i]]);
  },
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.cmf(d, 20), extract: id } },
};

const NVI = {
  name: 'nvi',
  description: 'Negative Volume Index. ta.js takes [[C, V], …]. Matches tulind.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.nvi(d),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[0]), d.map(b => b[1])],
      compute: (parallel) => tulindSync('nvi', parallel, [])[0],
      extract: id,
    },
  },
};

const PVI = {
  name: 'pvi',
  description: 'Positive Volume Index. ta.js takes [[C, V], …]. Matches tulind.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[3], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.pvi(d),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[0]), d.map(b => b[1])],
      compute: (parallel) => tulindSync('pvi', parallel, [])[0],
      extract: id,
    },
  },
};

const EMV = {
  name: 'emv',
  description: 'Ease of Movement (scale=10000). ta.js takes [[H, L, V], …]. Matches tulind.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => [b[1], b[2], vol[i]]);
  },
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.emv(d),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[0]), d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('emv', parallel, [])[0],
      extract: id,
    },
  },
};

const NATR = {
  name: 'natr',
  description: 'Normalized ATR (period=14). 100·ATR/Close.',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.natr(d, 14),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2]), d.map(b => b[3])],
      compute: (parallel) => tulindSync('natr', parallel, [14])[0],
      extract: id,
    },
  },
};

const DPO = {
  name: 'dpo',
  description: 'Detrended Price Oscillator (period=21).',
  generate: priceSeries,
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.dpo(d, 21),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d],
      compute: (i) => tulindSync('dpo', i, [21])[0],
      extract: id,
    },
  },
};

const MASS = {
  name: 'mass',
  description: 'Mass Index (length=25, EMA fixed at 9). ta.js takes [[H, L], …].',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[2]]),
      compute: (d) => ta.mass(d, 25),
      extract: id,
    },
    'tulind': tulind && {
      prepare: (d) => [d.map(b => b[1]), d.map(b => b[2])],
      compute: (parallel) => tulindSync('mass', parallel, [25])[0],
      extract: id,
    },
  },
};

const ULCER = {
  name: 'ulcer',
  description: 'Ulcer Index (period=14). Drawdown-based volatility. Solo bench.',
  generate: priceSeries,
  adapters: { 'ta.js': ta && { prepare: id, compute: (d) => ta.ulcer(d, 14), extract: id } },
};

const VORTEX = {
  name: 'vortex',
  description: 'Vortex Indicator (period=14). Solo bench. Output: [[VI+, VI−], …].',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.vortex(d, 14),
      extract: (o) => o.map(r => r[0]),
    },
  },
};

const KDJ = {
  name: 'kdj',
  description: 'KDJ (9, 3, 3). Solo bench. Output: [[K, D, J], …].',
  generate: ohlcSeries,
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(b => [b[1], b[3], b[2]]),
      compute: (d) => ta.kdj(d, 9, 3, 3),
      extract: (o) => o.map(r => r[0]),
    },
  },
};

module.exports = [
  RSI, MACD, ATR, ROC, PSAR, PR, MFI, STOCH, OBV,
  MOM, BOP, FI, VWAP, KST, ICHIMOKU, HV, CROSS,
  AROON_UP, AROON_DOWN, AROON_OSC, SUPERTREND,
  ALLIGATOR, HALFTREND, ZIGZAG, ELDERRAY, RVI, RVI_SIGNAL,
  RSI_DIVERGENCE, DIVERGENCE, COP, ASI, TSI, BANDWIDTH, FRACTALS, FIB, WRSI,
  TRIX, ADL, CCI, PDM, MDM, PDI, MDI, DX, ADX, ADXR, STOCH_RSI, PPO, APO,
  CMF, NVI, PVI, EMV, NATR, DPO, MASS, ULCER, VORTEX, KDJ,
];
