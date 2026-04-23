const ta = require('../_registry.js');
function cor(data1, data2) {
  var d1avg = ta.sma(data1, data1.length),
      d2avg = ta.sma(data2, data2.length),
      sumavg = 0, sx = 0, sy = 0;
  for(var i = 0; i < data1.length; i++) {
    var x = data1[i] - d1avg, y = data2[i] - d2avg;
    sumavg += (x * y), sx += Math.pow(x, 2), sy += Math.pow(y, 2);
  }
  var n = data1.length - 1;
  sx /= n, sy /= n, sx = Math.sqrt(sx), sy = Math.sqrt(sy);
  return (sumavg / (n * sx * sy));
}
module.exports = cor;
