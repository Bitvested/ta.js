const ta = require('../_registry.js');
function wma(data, length=14) {
  for(var i = 1, weight = 0, wma = []; i <= length; i++) weight += i;
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), average = 0;
    for(var q in pl) average += pl[q] * (Number(q)+1) / weight;
    wma.push(average);
  }
  return wma;
}
module.exports = wma;
