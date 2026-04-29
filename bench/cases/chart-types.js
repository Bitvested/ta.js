const { ohlcSeries, volumeSeries } = require('../data.js');
const { ta, ti, debut, id } = require('./_libs.js');

const HA = {
  name: 'ha',
  description: 'Heikin-Ashi candles. Cross-lib correctness compared on HA close.',
  generate: (size) => ohlcSeries(size),
  adapters: {
    'ta.js': ta && {
      prepare: id,
      compute: (d) => ta.ha(d),
      extract: (o) => o.map(b => b[3]),
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        open:   d.map(b => b[0]),
        high:   d.map(b => b[1]),
        low:    d.map(b => b[2]),
        close:  d.map(b => b[3]),
        volume: d.map(() => 0),
        timestamp: d.map((_, i) => i),
      }),
      compute: (p) => ti.HeikinAshi.calculate(p),
      extract: (o) => o.close,
    },
    '@debut/indicators': debut && {
      prepare: id,
      compute: (d) => {
        const h = new debut.HeikenAshi(); const out = [];
        for (let i = 0; i < d.length; i++) {
          const r = h.nextValue(d[i][0], d[i][1], d[i][2], d[i][3]);
          if (r !== undefined) out.push(r);
        }
        return out;
      },
      extract: (o) => o.map(b => b.close),
    },
  },
};

const REN = {
  name: 'ren',
  description: 'Renko bricks (brickSize=1). ta.js outputs [[O,H,L,C], …]; ti.renko returns CandleList parallel arrays.',
  generate: (size) => {
    const ohlc = ohlcSeries(size);
    const vol = volumeSeries(size);
    return ohlc.map((b, i) => ({ ohlc: b, volume: vol[i] }));
  },
  adapters: {
    'ta.js': ta && {
      prepare: (d) => d.map(({ ohlc }) => [ohlc[1], ohlc[2]]),
      compute: (d) => ta.ren(d, 1),
      extract: (o) => o.map(b => b[3]),
    },
    'technicalindicators': ti && {
      prepare: (d) => ({
        open:      d.map(({ ohlc }) => ohlc[0]),
        high:      d.map(({ ohlc }) => ohlc[1]),
        low:       d.map(({ ohlc }) => ohlc[2]),
        close:     d.map(({ ohlc }) => ohlc[3]),
        volume:    d.map(({ volume }) => volume),
        timestamp: d.map((_, i) => i),
        brickSize: 1,
      }),
      compute: (p) => ti.renko(p),
      extract: (cl) => cl.close,
    },
  },
};

module.exports = [HA, REN];
