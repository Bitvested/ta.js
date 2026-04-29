function wma(data, length=14) {
  const n = data.length;
  if (n < length) return [];
  let weight = 0;
  for (let i = 1; i <= length; i++) weight += i;
  const out = [];
  for (let i = length; i <= n; i++) {
    let sum = 0;
    for (let q = 0; q < length; q++) {
      sum += data[i - length + q] * (q + 1);
    }
    out.push(sum / weight);
  }
  return out;
}
module.exports = wma;
