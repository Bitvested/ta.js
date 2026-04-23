const ta = require('../_registry.js');
function cum(data, length) {
  for(var i = length, res = []; i <= data.length; i++) {
    res.push(ta.sum(data.slice(i-length,i)));
  }
  return res;
}
module.exports = cum;
