function aroon_up(data, length=10) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    let hi = -Infinity, hiIdx = i - length;
    for (let j = i - length; j < i; j++) {
      if (data[j] >= hi) { hi = data[j]; hiIdx = j; }
    }
    out.push(100 * (hiIdx - (i - length)) / (length - 1));
  }
  return out;
}
module.exports = aroon_up;
