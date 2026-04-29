function cci(data, length=20) {
  const n = data.length;
  if (n < length) return [];
  const tp = new Array(n);
  for (let i = 0; i < n; i++) tp[i] = (data[i][0] + data[i][1] + data[i][2]) / 3;
  const out = new Array(n - length + 1);
  for (let i = length; i <= n; i++) {
    let sum = 0;
    for (let j = i - length; j < i; j++) sum += tp[j];
    const sma = sum / length;
    let mad = 0;
    for (let j = i - length; j < i; j++) mad += Math.abs(tp[j] - sma);
    mad /= length;
    out[i - length] = mad === 0 ? NaN : (tp[i - 1] - sma) / (0.015 * mad);
  }
  return out;
}
module.exports = cci;
