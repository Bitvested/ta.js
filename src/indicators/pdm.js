function pdm(data, length=14) {
  const n = data.length;
  if (n < length + 1) return [];
  let sum = 0;
  for (let i = 1; i <= length; i++) {
    const up = data[i][0] - data[i-1][0];
    const dn = data[i-1][2] - data[i][2];
    if (up > dn && up > 0) sum += up;
  }
  let prev = sum / length;
  const out = new Array(n - length);
  out[0] = prev;
  for (let i = length + 1; i < n; i++) {
    const up = data[i][0] - data[i-1][0];
    const dn = data[i-1][2] - data[i][2];
    const dm = (up > dn && up > 0) ? up : 0;
    prev = (prev * (length - 1) + dm) / length;
    out[i - length] = prev;
  }
  return out;
}
module.exports = pdm;
