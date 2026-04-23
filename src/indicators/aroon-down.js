const ta = require('../_registry.js');
function aroon_down(data, length=10) {
  for(var i = length, aroon = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), hl = pl.slice();
    hl.sort((a, b) => a-b);
    aroon.push((100 * (length-1-pl.reverse().findIndex(x => x === hl[0])) / (length-1)));
  }
  return aroon;
}
module.exports = aroon_down;
