const ta = require('../_registry.js');
function ha(data) {
  var ha = [[(data[0][0] + data[0][3]) / 2, data[0][1], data[0][2], (data[0][0] + data[0][1] + data[0][2] + data[0][3]) / 4]];
  for(var i = 1; i < data.length; i++) {
    ha.push([(ha[ha.length - 1][0] + ha[ha.length - 1][3]) / 2, Math.max(ha[ha.length - 1][0], ha[ha.length - 1][3], data[i][1]), Math.min(ha[ha.length - 1][0], ha[ha.length - 1][3], data[i][2]), (data[i][0] + data[i][1] + data[i][2] + data[i][3]) / 4]);
  }
  return ha;
}
module.exports = ha;
