function fisher(data, len) {
  const n = data.length;
  if (n < len) return [];
  const out = [];
  let fish = 0, v1 = 0;
  for (let i = len; i <= n; i++) {
    let mn = Infinity, mx = -Infinity;
    for (let j = i - len; j < i; j++) {
      if (data[j] < mn) mn = data[j];
      if (data[j] > mx) mx = data[j];
    }
    const range = mx - mn;
    const norm = range === 0 ? 0 : (data[i-1] - mn) / range - 0.5;
    v1 = 0.33 * 2 * norm + 0.67 * v1;
    if (v1 > 0.99) v1 = 0.999;
    if (v1 < -0.99) v1 = -0.999;
    const pf = fish;
    fish = 0.5 * Math.log((1 + v1) / (1 - v1)) + 0.5 * pf;
    out.push([fish, pf]);
  }
  return out;
}
module.exports = fisher;
