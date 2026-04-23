const ta = require('../_registry.js');
function drawdown(d) {
  for(var y = 1, max = d[0], min = d[0], big = 0; y < d.length; y++) {
    if(d[y] > max) {
      if(min != 0) {
        var diff = ta.dif(min, max);
        if(diff < big) big = diff;
        min = d[y];
      }
      max = d[y];
    }
    if(d[y] < min) min = d[y];
  }
  var diff = ta.dif(min, max);
  if(diff < big) big = diff
  return big;
}
module.exports = drawdown;
