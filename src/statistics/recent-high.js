const ta = require('../_registry.js');
function recent_high(data, lb=25) {
  for(var i = data.length-2, xback = lb, hindex = 0, highest = data[data.length-1]; i >= 0; i--) {
    if(data[i] >= highest && xback > 0) {
      highest = data[i];
      hindex = i;
      xback = lb;
    } else {
      xback--;
    }
    if(xback <= 0) break;
  }
  return {index: hindex, value: highest};
}
module.exports = recent_high;
