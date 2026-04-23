const ta = require('../_registry.js');
function lsma(data, length=25) {
  for(var i = length, lr = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0, sum_yy = 0, m, b;
    for(var q = 1; q <= length; q++) sum_x += q, sum_y += pl[q - 1], sum_xy += (pl[q - 1] * q), sum_xx += (q * q), sum_yy += (pl[q - 1] * pl[q - 1]);
    m = ((sum_xy - sum_x * sum_y / length) / (sum_xx - sum_x * sum_x / length));
    b = sum_y / length - m * sum_x / length;
    lr.push(m * length + b);
  }
  return lr;
}
module.exports = lsma;
