const ta = require('../_registry.js');

// The moving average OCC's basisType selects. Four of the Pine's twelve options are
// absent: LSMA takes an offset ta.js's lsma has no parameter for, VWMA needs volume
// in the data row, and ALMA and SSMA are not implemented here.
function basis(kind, src, length) {
  switch (kind) {
    case 'SMA':    return ta.sma(src, length);
    case 'EMA':    return ta.ema(src, length);
    case 'DEMA':   return ta.dema(src, length);
    case 'TEMA':   return ta.tema(src, length);
    case 'WMA':    return ta.wma(src, length);
    case 'SMMA':   return ta.smma(src, length);
    case 'HullMA': return ta.hull(src, length);
    case 'TMA':    return ta.sma(ta.sma(src, length), length);
    default:
      throw new Error(
        `occ: unknown basisType '${kind}'. Supported: SMA, EMA, DEMA, TEMA, WMA, SMMA, HullMA, TMA`,
      );
  }
}

// Displace a right-aligned primitive series right by `delay` bars. A basis at bar i
// averages the `length` bars ending at i - delay, which is the same as averaging and
// then shifting the result, so the delay is applied here rather than to the input.
function displaced(series, n, delay) {
  const line = new Array(n).fill(NaN);
  const start = n - series.length + delay;
  for (let i = Math.max(start, 0); i < Math.min(n, start + series.length); i++) {
    line[i] = series[i - start];
  }
  return line;
}

// Open Close Cross, following JustUncleL's Pine
// (tradingview.com/script/IVjPPt6c-Open-Close-Cross-Alert-R6-by-JustUncleL/).
//
// A moving average of `close` and of `open`; the direction is whichever is on top,
// and a flip is the cross. Input rows are [open, close]. Output rows are
// [close basis, open basis, direction], aligned to the input bars with NaN until
// both bases exist. `delay` is the Pine's delayOffset, which shifts both bases
// right; a negative delay has no meaning in the Pine (its input has minval 0).
function occ(data, basisLen=8, basisType='SMMA', delay=0) {
  if (basisLen < 1) throw new Error('occ: basisLen must be >= 1');
  if (delay < 0) throw new Error('occ: delay must be >= 0');

  const n = data.length;
  const opens = new Array(n);
  const closes = new Array(n);
  for (let i = 0; i < n; i++) { opens[i] = data[i][0]; closes[i] = data[i][1]; }

  const cb = displaced(basis(basisType, closes, basisLen), n, delay);
  const ob = displaced(basis(basisType, opens, basisLen), n, delay);

  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = (Number.isNaN(cb[i]) || Number.isNaN(ob[i]))
      ? [NaN, NaN, NaN]
      : [cb[i], ob[i], cb[i] > ob[i] ? 'long' : 'short'];
  }
  return out;
}
module.exports = occ;
