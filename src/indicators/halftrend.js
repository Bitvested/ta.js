const ta = require('../_registry.js');
function halftrend(data, atrlen, amplitude, deviation) {
  var out = [], nexttrend = [0], trend = [0], up = [0], down = [0], direction = undefined;
  for(var i = atrlen; i < data.length; i++) {
    var pl = data.slice(i - atrlen, i),
        maxlow = pl[pl.length-2][2],
        minhigh = pl[pl.length-2][0],
        atr2 = ta.atr(pl, atrlen);
    atr2 = atr2[atr2.length - 1] / 2;
    var dev = deviation * atr2,
        highprice = Math.max.apply(null, pl.map(x => x[0])),
        lowprice = Math.min.apply(null, pl.map(x => x[2])),
        highma = ta.sma(pl.slice(pl.length - amplitude).map(x => x[0]), amplitude),
        lowma = ta.sma(pl.slice(pl.length - amplitude).map(x => x[2]), amplitude);

    if (nexttrend[nexttrend.length - 1] == 1) {
      maxlow = Math.max(lowprice, maxlow);
      if (highma[0] < maxlow && pl[pl.length - 1][1] < pl[pl.length - 2][2]) {
        trend.push(1);
        nexttrend.push(0);
        minhigh = pl[pl.length - 2][0];
      }
    } else {
      minhigh = Math.min(highprice, minhigh);
      if (lowma[0] > minhigh && pl[pl.length - 1][1] < pl[pl.length - 2][0]) {
        trend.push(0);
        nexttrend.push(1);
        maxlow = lowprice;
      }
    }

    if (trend[trend.length - 1] == 0) {
      if (!isNaN(trend[trend.length - 2]) && trend[trend.length - 2] != 0) {
        up.push((isNaN(down[down.length - 2])) ? down[down.length - 1] : down[down.length - 2]);
      } else {
        up.push((isNaN(up[up.length - 2])) ? maxlow : Math.max(up[up.length - 2], maxlow));
      }
      direction = 'long';
    } else {
      if (!isNaN(trend[trend.length - 2]) && trend[trend.length - 2] != 1) {
        down.push((isNaN(up[up.length - 2])) ? up[up.length - 1] : up[up.length - 2]);
      } else {
        down.push((isNaN(down[down.length - 2])) ? minhigh : Math.min(minhigh, down[down.length - 2]));
      }
      direction = 'short';
    }

    var atrHigh = (direction === 'long') ? up[up.length - 1] + dev : down[down.length - 1] + dev,
        atrLow = (direction === 'long') ? up[up.length - 1] - dev : down[down.length - 1] - dev;

    out.push([atrHigh, (trend[trend.length - 1] == 0) ? up[up.length - 1] : down[down.length - 1], atrLow, direction]);
  }
  return out;
}
module.exports = halftrend;
