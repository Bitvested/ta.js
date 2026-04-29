const ta = require('../_registry.js');
function tema(data, length=30) {
  const e1 = ta.ema(data, length);
  if (e1.length < length) return [];
  const e2 = ta.ema(e1, length);
  if (e2.length < length) return [];
  const e3 = ta.ema(e2, length);
  const off1 = e1.length - e3.length;
  const off2 = e2.length - e3.length;
  const out = new Array(e3.length);
  for (let i = 0; i < e3.length; i++) {
    out[i] = 3 * e1[i + off1] - 3 * e2[i + off2] + e3[i];
  }
  return out;
}
module.exports = tema;
