const ta = require('../_registry.js');
function vwap(data, length=data.length) {
  data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = length, vwap = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i),
        totalv = 0, totalp = 0;
    for(var o = 0; o < pl.length; o++) totalv+=pl[o][1], totalp+=pl[o][0];
    vwap.push(totalp/totalv);
  }
  return vwap;
}
module.exports = vwap;
