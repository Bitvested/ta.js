const ta = require('../_registry.js');
function hwma(data, length=14) {
  for(var i = 1, b = length, weight = 0, wmaa = [], weights = []; i <= length / 2; i++, b--) {
    if(i % 1 !== 0) {
      i = Math.round(i);
      weight += (i * b)
    } else {
      weights.push(i * b);
      weight += (i*b*2);
    }
    weights.unshift(i * b);
  }
  for(var i = length; i <= data.length; i++) {
    var average = 0, pl = data.slice(i-length, i);
    for(var a = length - 1; a >= 0; a--) average += pl[a] * weights[a] / weight;
    wmaa.push(average);
  }
  return wmaa;
}
module.exports = hwma;
