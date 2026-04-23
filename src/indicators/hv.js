const ta = require('../_registry.js');
function hv(data, length=10) {
  for(var i = length, hv = []; i <= data.length; i++) {
    var ss = ta.ssd(data.slice(i-length,i)),
        vari = ss / length;
    hv.push(Math.sqrt(vari));
  }
  return hv;
}
module.exports = hv;
