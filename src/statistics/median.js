const ta = require('../_registry.js');
function median(data, length=data.length) {
  for(var i = length, med = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
    pl.sort((a, b) => a-b);
    med.push(pl[Math.round(pl.length / 2)-1]);
  }
  return med;
}
module.exports = median;
