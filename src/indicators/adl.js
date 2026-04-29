function adl(data) {
  const n = data.length;
  if (n === 0) return [];
  const out = new Array(n);
  let acc = 0;
  for (let i = 0; i < n; i++) {
    const h = data[i][0], c = data[i][1], l = data[i][2], v = data[i][3];
    const range = h - l;
    const mfm = range === 0 ? 0 : ((c - l) - (h - c)) / range;
    acc += mfm * v;
    out[i] = acc;
  }
  return out;
}
module.exports = adl;
