const ta = require('../_registry.js');
function supertrend(data, length=20, multiplier=3) {
  for(var i = length-1, atr = ta.atr(data, length), trend = []; i < data.length; i++) {
    trend.push([(data[i][0] + data[i][2]) / 2 + multiplier * atr[i], (data[i][0] + data[i][2]) / 2 - multiplier * atr[i]]);
  }
  return trend;
}
module.exports = supertrend;
