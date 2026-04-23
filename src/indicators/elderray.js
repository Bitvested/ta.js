const ta = require('../_registry.js');
function elderray(data, length=13) {
  for(var i = length, eld = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i),
        low = Math.min.apply(undefined, pl),
        high = Math.max.apply(undefined, pl),
        em = ta.ema(pl, pl.length);
    eld.push([high-em[0],low-em[0]]);
  }
  return eld;
}
module.exports = elderray;
