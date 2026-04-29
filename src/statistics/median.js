function median(data, length=data.length) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    const pl = data.slice(i - length, i);
    pl.sort((a, b) => a - b);
    const half = length >> 1;
    out.push(length % 2 === 1 ? pl[half] : (pl[half - 1] + pl[half]) / 2);
  }
  return out;
}
module.exports = median;
