const ta = require('../_registry.js');
function bands(data, length=14, deviations=1) {
  for(var i = 0, pl = [], deviation = [], boll = [], sma = ta.sma(data, length); i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var devi = ta.std(pl, length);
      deviation.push(devi);
      pl.splice(0, 1);
    }
  }
  for(var i = 0; i < sma.length; i++) {
    boll.push([sma[i] + deviation[i] * deviations, sma[i], sma[i] - deviation[i] * deviations]);
  }
  return boll;
}
module.exports = bands;
