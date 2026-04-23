const ta = require('../_registry.js');
function pr(data, length=14) {
  for(var i = length, n = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), highd = Math.max.apply(null, pl), lowd = Math.min.apply(null, pl);
    n.push((highd - data[i-1]) / (highd - lowd) * -100);
  }
  return n;
}
module.exports = pr;
