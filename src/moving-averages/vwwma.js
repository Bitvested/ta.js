const ta = require('../_registry.js');
function vwwma(data, length=20) {
  data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = 1, weight = 0; i <= length; i++) weight += i;
  for(var i = length, vwma = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
    var totalv = 0, totalp = 0;
    for(var q in pl) {
      totalv += pl[q][1] * (Number(q)+1) / weight;
      totalp += pl[q][0] * (Number(q)+1) / weight;
    }
    vwma.push(totalp/totalv);
  }
  return vwma;
}
module.exports = vwwma;
