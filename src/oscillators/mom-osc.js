function mom_osc(data, length=10) {
  const n = data.length;
  if (n <= length) return [];
  const out = [];
  for (let i = length; i < n; i++) {
    let sumh = 0, suml = 0;
    for (let j = i - length + 1; j <= i; j++) {
      const d = data[j] - data[j-1];
      if (d > 0) sumh += d;
      else if (d < 0) suml -= d;
    }
    const denom = sumh + suml;
    out.push(denom === 0 ? NaN : (sumh - suml) / denom * 100);
  }
  return out;
}
module.exports = mom_osc;
