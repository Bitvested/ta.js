const ta = require('../_registry.js');
function chaikin_osc(data, ema1=3, ema2=10) {
  for(var i = 0, cha = [], adl = []; i < data.length; i++) {
    var mfm = ((data[i][1]-data[i][2])-(data[i][0]-data[i][1]))/(data[i][0]-data[i][2]);
    (isNaN(mfm)) ? adl.push(0) : adl.push(mfm*data[i][3])
  }
  var ef = ta.ema(adl, ema1), es = ta.ema(adl, ema2);
  if(ef.length > es.length) { ef.splice(0,ef.length-es.length); } else { es.splice(0,es.length-ef.length); }
  for(var i = 0; i < ef.length; i++) cha.push(ef[i]-es[i]);
  return cha;
}
module.exports = chaikin_osc;
