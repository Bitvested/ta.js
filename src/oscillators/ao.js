const ta = require('../_registry.js');
function ao(data, length1=5, length2=35) {
  data = data.map(x => (x[0]+x[1])/2);
  for(var i = length2, a = []; i <= data.length; i++) {
    var pl = data.slice(i-length2,i);
    var f = ta.sma(pl, length1),
        s = ta.sma(pl, length2);
    a.push(f[f.length - 1] - s[s.length - 1]);
  }
  return a;
}
module.exports = ao;
