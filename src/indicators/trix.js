const ta = require('../_registry.js');
function trix(data, length=30) {
  const e1 = ta.ema(data, length);
  if (e1.length < length) return [];
  const e2 = ta.ema(e1, length);
  if (e2.length < length) return [];
  const e3 = ta.ema(e2, length);
  if (e3.length < 2) return [];
  const out = new Array(e3.length - 1);
  for (let i = 1; i < e3.length; i++) {
    const prev = e3[i - 1];
    out[i - 1] = prev === 0 ? NaN : 100 * (e3[i] - prev) / prev;
  }
  return out;
}
module.exports = trix;
