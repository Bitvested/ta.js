const ta = require('../_registry.js');
function macd_bars(data, length1=12, length2=26, lengthsig=9) {
  var ma = ta.macd(data, length1, length2),
      mas = ta.ema(ma, lengthsig), ret = [];
  ma.splice(0,ma.length-mas.length);
  for(var i in ma) ret.push(ma[i]-mas[i]);
  return ret;
}
module.exports = macd_bars;
