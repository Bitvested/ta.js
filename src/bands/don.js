const ta = require('../_registry.js');
function don(data, length=20) {
  for(var i = length, channel = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), highs = [], lows = [];
    for(var h in pl) highs.push(pl[h][0]), lows.push(pl[h][1]);
    var max = Math.max.apply(null, highs.slice()), min = Math.min.apply(null, lows.slice());
    channel.push([max, (max + min) / 2, min]);
  }
  return channel;
}
module.exports = don;
