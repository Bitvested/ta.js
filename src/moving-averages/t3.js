const ta = require('../_registry.js');
function t3(data, length=5, vfactor=0.7) {
  const e1 = ta.ema(data, length);
  if (e1.length < length) return [];
  const e2 = ta.ema(e1, length);
  if (e2.length < length) return [];
  const e3 = ta.ema(e2, length);
  if (e3.length < length) return [];
  const e4 = ta.ema(e3, length);
  if (e4.length < length) return [];
  const e5 = ta.ema(e4, length);
  if (e5.length < length) return [];
  const e6 = ta.ema(e5, length);
  const v2 = vfactor * vfactor;
  const v3 = v2 * vfactor;
  const c1 = -v3;
  const c2 = 3 * v2 + 3 * v3;
  const c3 = -6 * v2 - 3 * vfactor - 3 * v3;
  const c4 = 1 + 3 * vfactor + v3 + 3 * v2;
  const o3 = e3.length - e6.length;
  const o4 = e4.length - e6.length;
  const o5 = e5.length - e6.length;
  const out = new Array(e6.length);
  for (let i = 0; i < e6.length; i++) {
    out[i] = c1 * e6[i] + c2 * e5[i + o5] + c3 * e4[i + o4] + c4 * e3[i + o3];
  }
  return out;
}
module.exports = t3;
