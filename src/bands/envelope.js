const ta = require('../_registry.js');
function envelope(data, len=10, p=0.005) {
  for(var i = len, enve = []; i < data.length; i++) {
    var sm = ta.sma(data.slice(i-len,i), len);
    enve.push([sm[0]*(1+p),sm[0],sm[0]*(1-p)]);
  }
  return enve;
}
module.exports = envelope;
