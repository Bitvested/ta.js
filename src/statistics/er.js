const ta = require('../_registry.js');
// Expected return: each side contributes its geometric mean, weighted by how often
// it occurs. A side with no observations has weight zero, so its mean is never
// taken and the term is zero — written out rather than left to the exponent, since
// in JS `wp ** (1/0)` is NaN for the empty side even when the product is 1.
function er(data) {
  var wins = [], losses = [], wp = 1, lp = 1;
  for(var i in data) (data[i] >= 0) ? wins.push(1+data[i]) : losses.push(1+data[i]);
  var win = (wins.length / data.length), loss = (losses.length / data.length);
  for(var i in losses) lp *= losses[i];
  for(var i in wins) wp *= wins[i];
  var winTerm = wins.length ? ((wp**(1/wins.length)-1)*100) * win : 0;
  var lossTerm = losses.length ? ((lp**(1/losses.length)-1)*100) * loss : 0;
  return (winTerm + lossTerm) / 100;
}
module.exports = er;
