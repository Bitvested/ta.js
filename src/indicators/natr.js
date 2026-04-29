const ta = require('../_registry.js');
function natr(data, length=14) {
  const a = ta.atr(data, length);
  if (a.length === 0) return [];
  const out = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    const c = data[i + length - 1][1];
    out[i] = c === 0 ? NaN : 100 * a[i] / c;
  }
  return out;
}
module.exports = natr;
