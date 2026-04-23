const ta = require('../_registry.js');
function er(data) {
  var wins = [], losses = [], wp = 1, lp = 1;
  for(var i in data) (data[i] >= 0) ? wins.push(1+data[i]) : losses.push(1+data[i]);
  var win = (wins.length / data.length), loss = (losses.length / data.length);
  for(var i in losses) lp *= losses[i];
  for(var i in wins) wp *= wins[i];
  return (((wp**(1/wins.length)-1)*100) * win + ((lp**(1/losses.length)-1)*100) * loss) / 100;
}
module.exports = er;
