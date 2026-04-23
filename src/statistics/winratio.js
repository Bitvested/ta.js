function winratio(data) {
  var wins = 0, losses = 0;
  for(var i in data) (data[i] >= 0) ? wins++ : losses++;
  return wins / (losses + wins);
}
module.exports = winratio;
