function mdi(data, length=14) {
  const n = data.length;
  if (n < length + 1) return [];
  let sumDm = 0, sumTr = 0;
  for (let i = 1; i <= length; i++) {
    const h = data[i][0], l = data[i][2], cprev = data[i-1][1];
    const up = data[i][0] - data[i-1][0];
    const dn = data[i-1][2] - data[i][2];
    if (dn > up && dn > 0) sumDm += dn;
    sumTr += Math.max(h - l, Math.abs(h - cprev), Math.abs(l - cprev));
  }
  let dm = sumDm / length, tr = sumTr / length;
  const out = new Array(n - length);
  out[0] = tr === 0 ? NaN : 100 * dm / tr;
  for (let i = length + 1; i < n; i++) {
    const h = data[i][0], l = data[i][2], cprev = data[i-1][1];
    const up = data[i][0] - data[i-1][0];
    const dn = data[i-1][2] - data[i][2];
    const curDm = (dn > up && dn > 0) ? dn : 0;
    const curTr = Math.max(h - l, Math.abs(h - cprev), Math.abs(l - cprev));
    dm = (dm * (length - 1) + curDm) / length;
    tr = (tr * (length - 1) + curTr) / length;
    out[i - length] = tr === 0 ? NaN : 100 * dm / tr;
  }
  return out;
}
module.exports = mdi;
