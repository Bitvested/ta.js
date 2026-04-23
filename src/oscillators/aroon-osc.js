const ta = require('../_registry.js');
function aroon_osc(data, length=25) {
  for(var i = 0, aroon = [], u = ta.aroon.up(data, length), d = ta.aroon.down(data, length); i < u.length; i++) aroon.push(u[i] - d[i]);
  return aroon;
}
module.exports = aroon_osc;
