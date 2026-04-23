const ta = require('../_registry.js');
function percentile(data, perc) {
  for(var i = 0, final = []; i < data[0].length; i++) {
    data.sort((a, b) => a[i]-b[i]);
    final.push(data[Math.round((data.length-1)*perc)][i]);
  }
  return final;
}
module.exports = percentile;
