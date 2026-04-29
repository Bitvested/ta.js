function don(data, length=20) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    let hi = -Infinity, lo = Infinity;
    for (let j = i - length; j < i; j++) {
      if (data[j][0] > hi) hi = data[j][0];
      if (data[j][1] < lo) lo = data[j][1];
    }
    out.push([hi, (hi + lo) / 2, lo]);
  }
  return out;
}
module.exports = don;
