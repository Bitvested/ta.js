const ta = require('../_registry.js');
function sma(data, length=14) {
  for(var i = length, sma = []; i <= data.length; i++) {
    var avg = ta.sum(data.slice(i-length,i));
    sma.push(avg / length);
  }
  return sma;
}
module.exports = sma;
