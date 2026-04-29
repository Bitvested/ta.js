// Internal helper for the linear regression decomposition family
// (lr_slope, lr_intercept, lr_angle, tsf). Not registered.
//
// Computes slope (m) and intercept (b) over each rolling window using
// x = 0..length-1 (TA-Lib / tulind convention). Returns array of [m, b]
// pairs, one per window — same length as ta.sma(data, length).
function lrWindows(data, length) {
  const n = data.length;
  if (n < length) return [];
  const sumX  = (length - 1) * length / 2;
  const sumX2 = (length - 1) * length * (2 * length - 1) / 6;
  const denom = length * sumX2 - sumX * sumX;
  const out = new Array(n - length + 1);
  for (let i = length; i <= n; i++) {
    let sumY = 0, sumXY = 0;
    for (let q = 0; q < length; q++) {
      const y = data[i - length + q];
      sumY  += y;
      sumXY += y * q;
    }
    const m = denom === 0 ? NaN : (length * sumXY - sumX * sumY) / denom;
    const b = (sumY - m * sumX) / length;
    out[i - length] = [m, b];
  }
  return out;
}
module.exports = { lrWindows };
