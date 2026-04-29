function ema(data, length=12) {
  const n = data.length;
  if (n < length) return [];
  const weight = 2 / (length + 1);
  let seed = 0;
  for (let i = 0; i < length; i++) seed += data[i];
  let prev = seed / length;
  const out = [prev];
  for (let i = length; i < n; i++) {
    prev = (data[i] - prev) * weight + prev;
    out.push(prev);
  }
  return out;
}
module.exports = ema;
