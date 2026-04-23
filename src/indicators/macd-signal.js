const ta = require('../_registry.js');
function macd_signal(data, length1=12, length2=26, lengthsig=9) {
  var ma = ta.macd(data, length1, length2),
      mas = ta.ema(ma, lengthsig);
  return mas;
}
module.exports = macd_signal;
