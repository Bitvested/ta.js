const ta = require('../_registry.js');
function ssd(data, length=data.length) {
  for(var i = length, sd = []; i <= data.length; i++) {
    var tmp = data.slice(i-length,i), mean = ta.sma(tmp, length), sm = 0;
    for(var x in tmp) sm += (tmp[x] - mean[mean.length-1]) ** 2;
    sd.push(Math.sqrt(sm));
  }
  return sd;
}
module.exports = ssd;
