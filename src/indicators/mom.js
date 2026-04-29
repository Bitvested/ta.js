function mom(data, length=10, percent=false) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length - 1; i < n; i++) {
    const ref = data[i - (length - 1)];
    if (percent) out.push(ref === 0 ? NaN : (data[i] / ref) * 100);
    else out.push(data[i] - ref);
  }
  return out;
}
module.exports = mom;
