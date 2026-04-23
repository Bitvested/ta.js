const ta = require('../_registry.js');
function roc(data, length=14) {
  for(var i = length, roc = []; i <= data.length; i++) roc.push((data[i-1] - data[i-length]) / data[i-length]);
  return roc;
}
module.exports = roc;
