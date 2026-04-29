const ta = require('../_registry.js');
function chaikin_osc(data, ema1=3, ema2=10) {
  const adl = new Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const range = data[i][0] - data[i][2];
    const mfm = range === 0 ? NaN : ((data[i][1] - data[i][2]) - (data[i][0] - data[i][1])) / range;
    adl[i] = mfm * data[i][3];
  }
  let ef = ta.ema(adl, ema1);
  let es = ta.ema(adl, ema2);
  if (ef.length > es.length) ef = ef.slice(ef.length - es.length);
  else if (es.length > ef.length) es = es.slice(es.length - ef.length);
  const out = new Array(ef.length);
  for (let i = 0; i < ef.length; i++) out[i] = ef[i] - es[i];
  return out;
}
module.exports = chaikin_osc;
