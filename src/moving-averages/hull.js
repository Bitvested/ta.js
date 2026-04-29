const ta = require('../_registry.js');
function hull(data, length=14) {
  const ewma = ta.wma(data, length);
  const first = ta.wma(data, Math.round(length / 2));
  const off = first.length - ewma.length;
  const sqn = Math.round(Math.sqrt(length));
  const m = ewma.length;
  if (m < sqn) return [];
  const d = new Float64Array(m);
  for (let i = 0; i < m; i++) d[i] = first[i + off] * 2 - ewma[i];
  const weight = sqn * (sqn + 1) / 2;
  let S = 0, T = 0;
  for (let i = 0; i < sqn; i++) {
    S += d[i] * (i + 1);
    T += d[i];
  }
  const out = [S / weight];
  for (let i = sqn; i < m; i++) {
    S = S + d[i] * sqn - T;
    T = T + d[i] - d[i - sqn];
    out.push(S / weight);
  }
  return out;
}
module.exports = hull;
