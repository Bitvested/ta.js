const ta = require('../_registry.js');
function times_up(data, len) {
  var out = [];
  for(var i = len; i < data.length; i++) {
    var up = 1;
    for(var x = i-len+1; x <= i; x++) {
      if(data[x-1] > data[x]) {
        up = 0;
        break;
      }
    }
    out.push(up);
  }
  return out;
}
module.exports = times_up;
