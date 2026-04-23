const ta = require('../_registry.js');
function mom_osc(data, length=10) {
  length++
  for(var i = length, osc = [], sumh = 0, suml = 0; i <= data.length; i++, sumh = 0, suml = 0) {
    for(var a = 1; a < length; a++) (data[i-length+(a-1)] < data[i-length+a]) ? sumh += data[i-length+a] : suml += data[i-length+a];
    osc.push((sumh - suml) / (sumh + suml) * 100);
  }
  return osc;
}
module.exports = mom_osc;
