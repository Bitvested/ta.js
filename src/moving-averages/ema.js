const ta = require('../_registry.js');
function ema(data, length=12) {
  for(var i = length, ema = [], weight = 2 / (length + 1); i <= data.length; i++) {
    if(ema.length > 0) {
      ema.push((data[i-1] - ema[ema.length - 1]) * weight + ema[ema.length - 1]);
      continue;
    }
    var pl = data.slice(i-length,i), average = 0;
    for(var q in pl) average += pl[q];
    ema.push(average / length);
  }
  return ema;
}
module.exports = ema;
