const ta = require('../_registry.js');
function return_positive(data) {
  for(var i = 0, out = []; i < data.length; i++) {
    if(data[i] > 0) out.push(data[i]);
  }
  return out;
}
module.exports = return_positive;
