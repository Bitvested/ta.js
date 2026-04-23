const ta = require('../_registry.js');
function obv(data) {
  for(var i = 1, obv = [0]; i < data.length; i++) {
    if(data[i][1] > data[i - 1][1]) obv.push(obv[obv.length - 1] + data[i][0])
    if(data[i][1] < data[i - 1][1]) obv.push(obv[obv.length - 1] - data[i][0])
    if(data[i][1] === data[i - 1][1]) obv.push(obv[obv.length - 1])
  }
  return obv;
}
module.exports = obv;
