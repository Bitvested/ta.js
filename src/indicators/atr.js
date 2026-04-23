const ta = require('../_registry.js');
function atr(data, length=14) {
  for(var i = 1, atr = [data[0][0] - data[0][2]]; i < data.length; i++) {
    var t0 = Math.max((data[i][0] - data[i - 1][1]), (data[i][2] - data[i - 1][1]), (data[i][0] - data[i][2]));
    atr.push((atr[atr.length - 1] * (length - 1) + t0) / length);
  }
  return atr;
}
module.exports = atr;
