function emv(data) {
  const n = data.length;
  if (n < 2) return [];
  const out = new Array(n - 1);
  for (let i = 1; i < n; i++) {
    const h = data[i][0], l = data[i][1], v = data[i][2];
    const hp = data[i-1][0], lp = data[i-1][1];
    const move = (h + l) / 2 - (hp + lp) / 2;
    const range = h - l;
    out[i - 1] = (range === 0 || v === 0) ? NaN : move * range * 10000 / v;
  }
  return out;
}
module.exports = emv;
