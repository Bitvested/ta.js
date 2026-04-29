function sma(data, length=14) {
  const n = data.length;
  if (n < length) return [];
  let sum = 0;
  for (let i = 0; i < length; i++) sum += data[i];
  const out = [sum / length];
  for (let i = length; i < n; i++) {
    sum += data[i] - data[i - length];
    out.push(sum / length);
  }
  return out;
}
module.exports = sma;
