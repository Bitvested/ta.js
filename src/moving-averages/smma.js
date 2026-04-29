function smma(data, length=14) {
  const n = data.length;
  if (n < length) return [];
  let seed = 0;
  for (let i = 0; i < length; i++) seed += data[i];
  let prev = seed / length;
  const out = [prev];
  for (let i = length; i < n; i++) {
    prev = prev + (data[i] - prev) / length;
    out.push(prev);
  }
  return out;
}
module.exports = smma;
