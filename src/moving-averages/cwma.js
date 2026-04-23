const ta = require('../_registry.js');
function cwma(data, weights) {
  for(var i = weights.length, ma = []; i <= data.length; i++) {
    var pl = data.slice(i-weights.length,i), sum = 0, weight = 0;
    for(var q = 0; q < weights.length; q++) {
      sum += pl[q] * weights[q];
      weight += weights[q];
    }
    ma.push(sum / weight);
  }
  return ma;
}
module.exports = cwma;
