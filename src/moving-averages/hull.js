const ta = require('../_registry.js');
function hull(data, length=14) {
  var pl = [], hma = [], ewma = ta.wma(data, length), sqn = Math.round(Math.sqrt(length)),
      first = ta.wma(data, Math.round(length / 2));
  first.splice(0, first.length - ewma.length);
  for(var i in ewma) {
    pl.push((first[i] * 2) - ewma[i]);
    if(pl.length >= sqn) {
      var h = ta.wma(pl, sqn);
      hma.push(h[0]);
      pl.splice(0,1);
    }
  }
  return hma;
}
module.exports = hull;
