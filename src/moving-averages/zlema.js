function zlema(data, length=14) {
  const n = data.length;
  if (n === 0) return [];
  const lag = Math.floor((length - 1) / 2);
  const alpha = 2 / (length + 1);
  let prev = data[0];
  const out = new Array(n);
  out[0] = prev;
  for (let i = 1; i < n; i++) {
    const adj = i >= lag ? 2 * data[i] - data[i - lag] : data[i];
    prev = alpha * adj + (1 - alpha) * prev;
    out[i] = prev;
  }
  return out;
}
module.exports = zlema;
