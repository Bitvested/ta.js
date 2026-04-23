const ta = require('../_registry.js');
function variance(data, length=data.length) {
  for(var i = length, va = []; i <= data.length; i++) {
    var tmp = data.slice(i - length, i), mean = ta.sma(tmp, length), sm = 0;
    for(var x in tmp) sm += ((tmp[x] - mean[mean.length-1]) ** 2);
    va.push(sm/length);
  }
  return va;
}
module.exports = variance;
