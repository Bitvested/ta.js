const ta = require('../_registry.js');
function times_down(data, len) {
  var out = [];
  for(var i = len; i < data.length; i++) {
    var dn = 1;
    for(var x = i-len+1; x <= i; x++) {
      if(data[x-1] < data[x]) {
        dn = 0;
        break;
      }
    }
    out.push(dn);
  }
  return out;
}
module.exports = times_down;
