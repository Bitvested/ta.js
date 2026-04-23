const ta = require('../_registry.js');
function ichimoku(data, length1=9, length2=26, length3=52, length4=26) {
  for(var i = 0, pl = [], cloud = [], place = []; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length3) {
      var highs = [], lows = [];
      for(var a in pl) highs.push(pl[a][0]), lows.push(pl[a][2]);
      var tsen = (Math.max.apply(null, highs.slice((highs.length - length1), highs.length)) + Math.min.apply(null, lows.slice((lows.length - length1), lows.length))) / 2,
          ksen = (Math.max.apply(null, highs.slice((highs.length - length2), highs.length)) + Math.min.apply(null, lows.slice((lows.length - length2), lows.length))) / 2,
          senka = data[i][1] + ksen,
          senkb = (Math.max.apply(null, highs.slice((highs.length - length3), highs.length)) + Math.min.apply(null, lows.slice((lows.length - length2), lows.length))) / 2;
          chik = data[i][1];
          place.push([tsen, ksen, senka, senkb, chik]);
      pl.splice(0, 1);
    }
  }
  for(var i = length4; i < place.length - length4; i++) {
    cloud.push([place[i][0], place[i][1], place[i + length4][2], place[i + length4][3], place[i - length4][4]]);
  }
  return cloud;
}
module.exports = ichimoku;
