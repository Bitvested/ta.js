function cmf(data, length=20) {
  const n = data.length;
  if (n < length) return [];
  const mfv = new Array(n);
  for (let i = 0; i < n; i++) {
    const h = data[i][0], c = data[i][1], l = data[i][2], v = data[i][3];
    const range = h - l;
    mfv[i] = range === 0 ? 0 : (((c - l) - (h - c)) / range) * v;
  }
  let sM = 0, sV = 0;
  for (let i = 0; i < length; i++) { sM += mfv[i]; sV += data[i][3]; }
  const out = new Array(n - length + 1);
  out[0] = sV === 0 ? NaN : sM / sV;
  for (let i = length; i < n; i++) {
    sM += mfv[i] - mfv[i - length];
    sV += data[i][3] - data[i - length][3];
    out[i - length + 1] = sV === 0 ? NaN : sM / sV;
  }
  return out;
}
module.exports = cmf;
