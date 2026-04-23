function martingale(data, bet, max, multiplier=2) {
  var current = bet;
  for(var i in data) {
    if(data[i] < 0) {
      current *= multiplier;
    } else if(data[i] > 0) {
      current = bet;
    }
  }
  return (current > max) ? max : current;
}
module.exports = martingale;
