const ta = require('../_registry.js');
function aad(data, length=data.length) {
  for(var i = length, med = []; i <= data.length; i++) {
    var tmp = data.slice(i-length, i), sm = 0,
        m = ta.sma(tmp, length);
    for(var q in tmp) sm += Math.abs(tmp[q] - m[m.length-1]);
    med.push(sm/length);
  }
  return med;
}
module.exports = aad;
