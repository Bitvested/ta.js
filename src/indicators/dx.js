const ta = require('../_registry.js');
function dx(data, length=14) {
  const p = ta.pdi(data, length);
  const m = ta.mdi(data, length);
  const out = new Array(p.length);
  for (let i = 0; i < p.length; i++) {
    const sum = p[i] + m[i];
    out[i] = sum === 0 ? NaN : 100 * Math.abs(p[i] - m[i]) / sum;
  }
  return out;
}
module.exports = dx;
