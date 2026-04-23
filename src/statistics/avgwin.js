const ta = require('../_registry.js');
function avgwin(data) {
  for(var i = 0, wins = []; i < data.length; i++) if(data[i] >= 0) wins.push(data[i]);
  var avg = ta.sma(wins, wins.length);
  return avg[0];
}
module.exports = avgwin;
