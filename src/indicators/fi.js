const ta = require('../_registry.js');
function fi(data, length=13) {
  for(var i = 1, pl = [], ff = []; i < data.length; i++) {
    pl.push((data[i][0] - data[i - 1][0]) * data[i][1]);
    if(pl.length >= length) {
      var vfi = ta.ema(pl, length);
      ff.push(vfi[vfi.length-1]);
      pl.splice(0, 1);
    }
  }
  return ff;
}
module.exports = fi;
