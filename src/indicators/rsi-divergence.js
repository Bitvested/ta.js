const ta = require('../_registry.js');
function rsi_divergence(data, length, rs) {
  if(!rs) rs = ta.wrsi;
  var rd = rs(data, length), out = [];
  data = ta.mom(data.slice(length-1, data.length), 2);
  for(var i = 0; i < data.length; i++) {
    if((data[i] > 0 && rd[i] < 0) || (data[i] < 0 && rd[i] > 0)) {
      out.push(1);
    } else {
      out.push(0);
    }
  }
  return out;
}
module.exports = rsi_divergence;
