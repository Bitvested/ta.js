const ta = require('../_registry.js');
function se(data, size) {
  size = (!size) ? data.length : size;
  var stdv = ta.std(data);
  return stdv / (size ** 0.5);
}
module.exports = se;
