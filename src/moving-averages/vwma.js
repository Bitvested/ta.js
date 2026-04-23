const ta = require('../_registry.js');
function vwma(data, length=20) {
  data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = length, vwma = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
    var totalv = 0, totalp = 0;
    for(var o = 0; o < pl.length; o++) {
      totalv += pl[o][1];
      totalp += pl[o][0];
    }
    vwma.push(totalp/totalv);
  }
  return vwma;
}
module.exports = vwma;
