const ta = require('../_registry.js');
function rsi(data, length=14) {
  for(var i = length-1,gain=0,loss=0,arrsi = [], pl = data.slice(0,length-1); i < data.length; i++,gain=0,loss=0) {
    pl.push(data[i]);
    for(var q = 1; q < pl.length; q++) if(pl[q]-pl[q-1] < 0) {loss+=Math.abs(pl[q]-pl[q-1]);}else{gain+=pl[q]-pl[q-1];}
    var rsi = 100 - 100 / (1 + ((gain / length) / (loss / length)));
    arrsi.push(rsi);
    pl.splice(0,1);
  }
  return arrsi;
}
module.exports = rsi;
