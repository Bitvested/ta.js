const ta = require('../_registry.js');
function bandwidth(data, length=14, deviations=1) {
  for(var i = 0, boll = [], band = ta.bands(data, length, deviations); i < band.length; i++) boll.push((band[i][0] - band[i][2]) / band[i][1]);
  return boll;
}
module.exports = bandwidth;
