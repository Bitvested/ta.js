const ta = require('../_registry.js');
function kdj(data, length=9, smoothK=3, smoothD=3) {
  const s = ta.stoch(data, length, smoothK, smoothD);
  const out = new Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const k = s[i][0], d = s[i][1];
    out[i] = [k, d, 3 * k - 2 * d];
  }
  return out;
}
module.exports = kdj;
