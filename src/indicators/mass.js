const ta = require('../_registry.js');
function mass(data, length=25) {
  const n = data.length;
  const range = new Array(n);
  for (let i = 0; i < n; i++) range[i] = data[i][0] - data[i][1];
  const e1 = ta.ema(range, 9);
  if (e1.length < 9) return [];
  const e2 = ta.ema(e1, 9);
  if (e2.length < length) return [];
  const offset = e1.length - e2.length;
  const ratio = new Array(e2.length);
  for (let i = 0; i < e2.length; i++) {
    ratio[i] = e2[i] === 0 ? NaN : e1[i + offset] / e2[i];
  }
  let sum = 0;
  for (let i = 0; i < length; i++) sum += ratio[i];
  const out = new Array(ratio.length - length + 1);
  out[0] = sum;
  for (let i = length; i < ratio.length; i++) {
    sum += ratio[i] - ratio[i - length];
    out[i - length + 1] = sum;
  }
  return out;
}
module.exports = mass;
