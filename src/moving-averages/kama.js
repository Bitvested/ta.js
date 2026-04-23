const ta = require('../_registry.js');
function kama(data, len1=10, len2=2, len3=30) {
  for(var i = len1 + 1, ka = ta.sma(data, len1), ka = [ka[ka.length - 1]]; i < data.length; i++) {
    var vola = 0, change = Math.abs(data[i] - data[i - len1]);
    for(var a = 1; a < len1; a++) vola += Math.abs(data[(i-a)] - data[(i-a)-1]);
    var sc = (change/vola * (2/(len2+1) - 2/(len3+1) + 2/(len3+1))) ** 2;
    ka.push(ka[ka.length - 1] + sc * (data[i] - ka[ka.length - 1]));
  }
  return ka;
}
module.exports = kama;
