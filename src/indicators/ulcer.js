function ulcer(data, length=14) {
  const n = data.length;
  if (n < length) return [];
  const dd = new Array(n);
  for (let i = 0; i < n; i++) {
    let hi = -Infinity;
    const start = i - length + 1 > 0 ? i - length + 1 : 0;
    for (let j = start; j <= i; j++) if (data[j] > hi) hi = data[j];
    dd[i] = hi === 0 ? 0 : 100 * (data[i] - hi) / hi;
  }
  let sum = 0;
  for (let i = 0; i < length; i++) sum += dd[i] * dd[i];
  const out = new Array(n - length + 1);
  out[0] = Math.sqrt(sum / length);
  for (let i = length; i < n; i++) {
    sum += dd[i] * dd[i] - dd[i - length] * dd[i - length];
    out[i - length + 1] = Math.sqrt(sum / length);
  }
  return out;
}
module.exports = ulcer;
