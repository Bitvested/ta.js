function aroon_down(data, length=10) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    let lo = Infinity, loIdx = i - length;
    for (let j = i - length; j < i; j++) {
      if (data[j] <= lo) { lo = data[j]; loIdx = j; }
    }
    out.push(100 * (loIdx - (i - length)) / (length - 1));
  }
  return out;
}
module.exports = aroon_down;
