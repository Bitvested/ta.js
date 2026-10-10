// HalfTrend, following everget's Pine script
// (tradingview.com/script/U1SJ8ubc-HalfTrend/), which this was ported from.
//
// One row per input bar: [atrHigh, HalfTrend, atrLow, direction]. The ATR
// channel is NaN until the ATR window is full (bar atrlen - 1); the trend line
// is defined from bar 0, as it is in the Pine.
function halftrend(data, atrlen, amplitude, deviation) {
  const n = data.length;
  if (n === 0) return [];
  const high = new Array(n), close = new Array(n), low = new Array(n);
  for (let i = 0; i < n; i++) { high[i] = data[i][0]; close[i] = data[i][1]; low[i] = data[i][2]; }

  // atr(atrlen): Wilder's RMA over true range, seeded with the mean of the first
  // atrlen true ranges. That is Pine's seeding, and not this library's atr.
  const tr = new Array(n);
  tr[0] = high[0] - low[0];
  for (let i = 1; i < n; i++) {
    tr[i] = Math.max(high[i] - low[i], Math.abs(high[i] - close[i - 1]), Math.abs(low[i] - close[i - 1]));
  }
  const atr2 = new Array(n).fill(NaN);
  if (n >= atrlen) {
    let prev = 0;
    for (let i = 0; i < atrlen; i++) prev += tr[i];
    prev /= atrlen;
    atr2[atrlen - 1] = prev / 2;
    for (let i = atrlen; i < n; i++) {
      prev = (prev * (atrlen - 1) + tr[i]) / atrlen;
      atr2[i] = prev / 2;
    }
  }

  let trend = 0, nexttrend = 0, prevtrend = -1;   // -1 stands for Pine's na
  let maxlow = low[0], minhigh = high[0];          // nz(low[1], low) / nz(high[1], high) at bar 0
  let up = NaN, down = NaN;
  const out = [];
  for (let i = 0; i < n; i++) {
    const dev = deviation * atr2[i];
    const start = Math.max(0, i - amplitude + 1);
    let highprice = -Infinity, lowprice = Infinity, hsum = 0, lsum = 0;
    for (let k = start; k <= i; k++) {
      if (high[k] > highprice) highprice = high[k];
      if (low[k] < lowprice) lowprice = low[k];
      hsum += high[k]; lsum += low[k];
    }
    // Pine's sma is na until its window is full, and a na comparison is false.
    const highma = (i >= amplitude - 1) ? hsum / amplitude : NaN;
    const lowma = (i >= amplitude - 1) ? lsum / amplitude : NaN;

    if (nexttrend === 1) {
      maxlow = Math.max(lowprice, maxlow);
      if (highma < maxlow && close[i] < (i > 0 ? low[i - 1] : low[i])) {
        trend = 1; nexttrend = 0; minhigh = highprice;
      }
    } else {
      minhigh = Math.min(highprice, minhigh);
      if (lowma > minhigh && close[i] > (i > 0 ? high[i - 1] : high[i])) {
        trend = 0; nexttrend = 1; maxlow = lowprice;
      }
    }

    let line, atrHigh, atrLow;
    if (trend === 0) {
      if (prevtrend !== -1 && prevtrend !== 0) up = down;              // na(down[1]) ? down : down[1]
      else up = Number.isNaN(up) ? maxlow : Math.max(maxlow, up);
      line = up; atrHigh = up + dev; atrLow = up - dev;
    } else {
      if (prevtrend !== -1 && prevtrend !== 1) down = up;              // na(up[1]) ? up : up[1]
      else down = Number.isNaN(down) ? minhigh : Math.min(minhigh, down);
      line = down; atrHigh = down + dev; atrLow = down - dev;
    }

    out.push([atrHigh, line, atrLow, trend === 0 ? 'long' : 'short']);
    prevtrend = trend;
  }
  return out;
}
module.exports = halftrend;
