const ta = require('../_registry.js');
function ar(data, len=data.length) {
  for(var i = len, out = []; i < data.length; i++) {
    var exp = ta.er(data.slice(i-len,i));
    out.push(data[i]-exp);
  }
  return out;
}
module.exports = ar;
