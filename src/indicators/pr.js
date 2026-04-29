function pr(data, length=14) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    let hi = -Infinity, lo = Infinity;
    for (let j = i - length; j < i; j++) {
      if (data[j] > hi) hi = data[j];
      if (data[j] < lo) lo = data[j];
    }
    const range = hi - lo;
    out.push(range === 0 ? NaN : (hi - data[i-1]) / range * -100);
  }
  return out;
}
module.exports = pr;
