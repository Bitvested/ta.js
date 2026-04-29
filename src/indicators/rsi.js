function rsi(data, length=14) {
  const n = data.length;
  if (n <= length) return [];
  let gain = 0, loss = 0;
  for (let i = 1; i <= length; i++) {
    const d = data[i] - data[i-1];
    if (d > 0) gain += d; else loss -= d;
  }
  let avgG = gain / length;
  let avgL = loss / length;
  const out = [rsiVal(avgG, avgL)];
  for (let i = length + 1; i < n; i++) {
    const d = data[i] - data[i-1];
    avgG = (avgG * (length - 1) + (d > 0 ? d : 0)) / length;
    avgL = (avgL * (length - 1) + (d < 0 ? -d : 0)) / length;
    out.push(rsiVal(avgG, avgL));
  }
  return out;
}
function rsiVal(g, l) {
  if (g === 0 && l === 0) return NaN;
  if (l === 0) return 100;
  return 100 - 100 / (1 + g / l);
}
module.exports = rsi;
