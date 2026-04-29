const ta = require('../_registry.js');
function apo(data, length1=12, length2=26) {
  return ta.macd(data, length1, length2);
}
module.exports = apo;
