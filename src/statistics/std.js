const ta = require('../_registry.js');
function std(data, length=data.length) {
  if(length < data.length) data.splice(0,data.length-length);
  var mean = data.reduce((a, b) => a + b) / length;
  return Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / length);
}
module.exports = std;
