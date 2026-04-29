function nvi(data) {
  const n = data.length;
  if (n === 0) return [];
  const out = new Array(n);
  out[0] = 1000;
  for (let i = 1; i < n; i++) {
    const cprev = data[i-1][0];
    if (data[i][1] < data[i-1][1] && cprev !== 0) {
      out[i] = out[i-1] * data[i][0] / cprev;
    } else {
      out[i] = out[i-1];
    }
  }
  return out;
}
module.exports = nvi;
