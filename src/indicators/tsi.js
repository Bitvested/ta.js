const ta = require('../_registry.js');
function tsi(data, long=25, short=13, signal=13) {
  for(var i = 1, mom = [], abs = [], ts = [], tsi = []; i < data.length; i++) {
    mom.push(data[i] - data[i - 1]);
    abs.push(Math.abs(data[i] - data[i - 1]));
  }
  var sma1 = ta.ema(mom,long),
      sma2 = ta.ema(abs,long),
      ema1 = ta.ema(sma1,short),
      ema2 = ta.ema(sma2,short);
  for(var i = 0; i < ema1.length; i++) ts.push(ema1[i] / ema2[i]);
  var tma = ta.ema(ts, signal);
  ts.splice(0, ts.length - tma.length)
  for(var i = 0; i < tma.length; i++) tsi.push([tma[i], ts[i]]);
  return tsi;
}
module.exports = tsi;
