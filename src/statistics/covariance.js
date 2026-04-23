const ta = require('../_registry.js');
function covariance(data1, data2, length) {
  var out = [], x_mean = ta.sma(data1, data1.length),
      y_mean = ta.sma(data2, data2.length);
  for(var z = length; z <= data1.length; z++) {
    var x = data1.slice(z-length,z), y = data2.slice(z-length,z),
        x_mean = ta.sma(x, length), res = [],
        y_mean = ta.sma(y, length);
    for(var i = 0; i < length; i++) {
      res.push((x[i]-x_mean[0])*(y[i]-y_mean[0]));
    }
    res = ta.sum(res);
    out.push(res/length);
  }
  return out;
}
module.exports = covariance;
