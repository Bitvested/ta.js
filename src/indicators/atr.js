function atr(data, length=14) {
  const n = data.length;
  if (n < length) return [];
  let prev = data[0][0] - data[0][2];
  const out = [];
  if (length === 1) out.push(prev);
  for (let i = 1; i < n; i++) {
    const cprev = data[i-1][1];
    const tr = Math.max(
      data[i][0] - data[i][2],
      Math.abs(data[i][0] - cprev),
      Math.abs(data[i][2] - cprev)
    );
    prev = (prev * (length - 1) + tr) / length;
    if (i >= length - 1) out.push(prev);
  }
  return out;
}
module.exports = atr;
