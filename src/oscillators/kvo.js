function kvo(data, fast=34, slow=55) {
  const n = data.length;
  if (n <= 1) return [];
  const aF = 2 / (fast + 1);
  const aS = 2 / (slow + 1);
  let prevHlc = data[0][0] + data[0][1] + data[0][2];
  let trend = -1;
  let cm = 0;
  let emaFast = 0, emaSlow = 0;
  const out = new Array(n - 1);
  for (let i = 1; i < n; i++) {
    const h = data[i][0], c = data[i][1], l = data[i][2], v = data[i][3];
    const hlc = h + c + l;
    const dm = h - l;
    if (hlc > prevHlc && trend !== 1) {
      trend = 1;
      cm = data[i-1][0] - data[i-1][2];
    } else if (hlc < prevHlc && trend !== 0) {
      trend = 0;
      cm = data[i-1][0] - data[i-1][2];
    }
    cm += dm;
    const sign = trend === 0 ? -1 : 1;
    const vf = cm === 0 ? 0 : v * Math.abs(2 * dm / cm - 1) * 100 * sign;
    if (i === 1) {
      emaFast = vf;
      emaSlow = vf;
    } else {
      emaFast = (vf - emaFast) * aF + emaFast;
      emaSlow = (vf - emaSlow) * aS + emaSlow;
    }
    out[i - 1] = emaFast - emaSlow;
    prevHlc = hlc;
  }
  return out;
}
module.exports = kvo;
