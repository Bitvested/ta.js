const ta = require('../_registry.js');
function avgloss(data) {
  var loss = [];
  for(var i = 0; i < data.length; i++) if(data[i] < 0) loss.push(data[i]);
  var avg = ta.sma(loss, loss.length);
  return avg[0];
}
module.exports = avgloss;
