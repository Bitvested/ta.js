const ta = require('../_registry.js');
function standardize(data) {
  var mean = ta.sma(data, data.length),
      std = ta.std(data), res = [];
  for(var i = 0; i < data.length; i++) res.push((data[i]-mean[0])/std);
  return res;
}
module.exports = standardize;
