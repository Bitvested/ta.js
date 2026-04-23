const ta = require('../_registry.js');
function fibbands(data, length=20, deviations=3) {
  for(var i = 0, pl = [], deviation = [], vwma = ta.vwma(data, length); i < data.length; i++) {
    pl.push(data[i][0]);
    if(pl.length >= length) {
      var devi = ta.std(pl, length);
      deviation.push(devi * deviations);
      pl.splice(0,1);
    }
  }
  for(var i = 0, boll = []; i < vwma.length; i++) {
    var upper1 = vwma[i] + 0.236 * deviation[i],
        upper2 = vwma[i] + 0.382 * deviation[i],
        upper3 = vwma[i] + 0.5 * deviation[i],
        upper4 = vwma[i] + 0.618 * deviation[i],
        upper5 = vwma[i] + 0.764 * deviation[i],
        upper6 = vwma[i] + deviation[i],
        lower1 = vwma[i] - 0.236 * deviation[i],
        lower2 = vwma[i] - 0.382 * deviation[i],
        lower3 = vwma[i] - 0.5 * deviation[i],
        lower4 = vwma[i] - 0.618 * deviation[i],
        lower5 = vwma[i] - 0.764 * deviation[i],
        lower6 = vwma[i] - deviation[i];
    boll.push([upper6, upper5, upper4, upper3, upper2, upper1, vwma[i], lower1, lower2, lower3, lower4, lower5, lower6]);
  }
  return boll;
}
module.exports = fibbands;
