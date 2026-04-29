function roc(data, length=14) {
  const n = data.length;
  if (n <= length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    const ref = data[i - length];
    out.push(ref === 0 ? NaN : ((data[i-1] - ref) / ref) * 100);
  }
  return out;
}
module.exports = roc;
