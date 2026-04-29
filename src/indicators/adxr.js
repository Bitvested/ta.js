const ta = require('../_registry.js');
function adxr(data, length=14) {
  const a = ta.adx(data, length);
  if (a.length < length) return [];
  const out = new Array(a.length - length + 1);
  for (let i = length - 1; i < a.length; i++) {
    out[i - length + 1] = (a[i] + a[i - length + 1]) / 2;
  }
  return out;
}
module.exports = adxr;
