const ta = require('../_registry.js');
function fisher(data, len) {
  var out = [], fish = 0, v1 = 0;
  for(var i = len; i <= data.length; i++) {
    var pl = data.slice(i-len,i), pf = fish,
        mn = Math.min.apply(null, pl),
        v1 = .33*2*((data[i-1]-mn)/(Math.max.apply(null, pl)-mn)-.5)+.67*v1;
    if(v1 > .99) v1 = 0.999;
    if(v1 < -0.99) v1 = -0.999;
    fish = 0.5 * Math.log((1+v1)/(1-v1)) + 0.5 * pf;
    out.push([fish, pf]);
  }
  return out.slice(1,out.length);
}
module.exports = fisher;
