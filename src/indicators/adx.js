const ta = require('../_registry.js');
function adx(data, length=14) {
  const d = ta.dx(data, length);
  if (d.length < length) return [];
  let sum = 0;
  for (let i = 0; i < length; i++) sum += d[i];
  let prev = sum / length;
  const out = new Array(d.length - length + 1);
  out[0] = prev;
  for (let i = length; i < d.length; i++) {
    prev = (prev * (length - 1) + d[i]) / length;
    out[i - length + 1] = prev;
  }
  return out;
}
module.exports = adx;
