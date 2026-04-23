const ta = require('../_registry.js');
function mom(data, length=10, p) {
  for(var i = length - 1, mom = []; i < data.length; i++) {
    (p) ? mom.push(data[i] / data[i - (length - 1)] * 100) : mom.push(data[i] - data[i - (length - 1)])
  }
  return mom;
}
module.exports = mom;
