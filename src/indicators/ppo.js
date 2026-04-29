const ta = require('../_registry.js');
function ppo(data, length1=12, length2=26) {
  if (length1 > length2) [length1, length2] = [length2, length1];
  const eb = ta.ema(data, length2);
  const m = ta.macd(data, length1, length2);
  const out = new Array(m.length);
  for (let i = 0; i < m.length; i++) {
    out[i] = eb[i] === 0 ? NaN : 100 * m[i] / eb[i];
  }
  return out;
}
module.exports = ppo;
