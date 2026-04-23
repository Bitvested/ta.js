const ta = require('../_registry.js');
function smma(data, length=14) {
  for(var i = length, smma = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), average = 0;
    for(var q in pl) average += pl[q];
    if(smma.length <= 0) { smma.push(average / length); } else { smma.push((average - smma[smma.length - 1]) / length); }
  }
  smma.splice(0, 1);
  return smma;
}
module.exports = smma;
