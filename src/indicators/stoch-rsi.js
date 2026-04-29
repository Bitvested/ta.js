const ta = require('../_registry.js');
function stoch_rsi(data, rsiLength=14, stochLength=14, smoothK=3, smoothD=3) {
  const r = ta.rsi(data, rsiLength);
  if (r.length < stochLength) return [];
  const rawK = new Array(r.length - stochLength + 1);
  for (let i = stochLength; i <= r.length; i++) {
    let lo = Infinity, hi = -Infinity;
    for (let j = i - stochLength; j < i; j++) {
      if (r[j] > hi) hi = r[j];
      if (r[j] < lo) lo = r[j];
    }
    const range = hi - lo;
    rawK[i - stochLength] = range === 0 ? NaN : 100 * (r[i - 1] - lo) / range;
  }
  const fastK = ta.sma(rawK, smoothK);
  const fastD = ta.sma(fastK, smoothD);
  if (fastD.length === 0) return [];
  const offset = fastK.length - fastD.length;
  const out = new Array(fastD.length);
  for (let i = 0; i < fastD.length; i++) {
    out[i] = [fastK[i + offset], fastD[i]];
  }
  return out;
}
module.exports = stoch_rsi;
