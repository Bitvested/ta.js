const ta = require('../_registry.js');
function recent_low(data, lb=25) {
  for(var i = data.length-2, xback = lb, lindex = 0, lowest = data[data.length-1]; i >= 0; i--) {
    if(data[i] <= lowest && xback > 0) {
      lowest = data[i];
      lindex = i;
      xback = lb;
    } else {
      xback--;
    }
    if(xback <= 0) break;
  }
  return {index: lindex, value: lowest};
}
module.exports = recent_low;
