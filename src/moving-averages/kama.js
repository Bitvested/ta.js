// Kaufman Adaptive Moving Average.
//
//   ER   = |data[i] - data[i-len1]| / sum(|data[k] - data[k-1]|, k = i-len1+1 .. i)
//   SC   = (ER * (fast - slow) + slow) ^ 2,  fast = 2/(len2+1), slow = 2/(len3+1)
//   KAMA = KAMA[i-1] + SC * (data[i] - KAMA[i-1])
//
// Seeded with data[len1-1] and emitted from that bar onwards, matching the
// tulind reference the benchmarks compare against. An SMA of the first len1
// values is the other common seed; the two converge within ~20 bars. The
// volatility sum is carried across bars rather than re-summed per bar, which
// keeps the whole run linear in the input.
const kama = (data, len1=10, len2=2, len3=30) => {
  const n = data.length;
  if (n < len1) return [];

  // Kaufman's efficiency ratio uses a window of len1 one-bar changes.
  let vola = 0;
  for (let i = 1; i < len1; i++) vola += Math.abs(data[i] - data[i - 1]);

  const fast = 2 / (len2 + 1), slow = 2 / (len3 + 1);
  let ka = data[len1 - 1];
  const out = [ka];

  for (let i = len1; i < n; i++) {
    vola += Math.abs(data[i] - data[i - 1]);
    if (i > len1) vola -= Math.abs(data[i - len1] - data[i - len1 - 1]);

    // No movement in the window leaves the ratio undefined; treat it as a
    // one-sided move, which pins the smoothing constant to `fast`.
    const er = (vola === 0) ? 1 : Math.abs(data[i] - data[i - len1]) / vola;
    const sc = er * (fast - slow) + slow;
    ka += sc * sc * (data[i] - ka);
    out.push(ka);
  }

  return out;
};

module.exports = kama;
