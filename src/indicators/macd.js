const ta = require('../_registry.js');
function macd(data, length1=12, length2=26) {
  if(length1 > length2) [length1, length2] = [length2, length1];
  var ema = ta.ema(data, length1), emb = ta.ema(data, length2), macd = [];
  ema.splice(0, length2 - length1);
  for(var i = 0; i < emb.length; i++) macd.push(ema[i] - emb[i]);
  return macd;
}
module.exports = macd;
