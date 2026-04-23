const ta = require('../_registry.js');
function alligator(data, jl=13, tl=8, ll=5, js=8, ts=5, ls=3) {
  var ret = [],
      jaw = ta.smma(data, jl),
      teeth = ta.smma(data, tl),
      lips = ta.smma(data, ll);
  teeth.splice(0,teeth.length-jaw.length);
  lips.splice(0,lips.length-jaw.length);
  for(var i = jaw.length-1; i >= 7; i--) ret.push([jaw[i-(js-1)], teeth[i-(ts-1)], lips[i-(ls-1)]]);
  return ret;
}
module.exports = alligator;
