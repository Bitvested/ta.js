const ta = require('../_registry.js');
function bop(data, len=14) {
  var bo = data.map(x => (x[3]-x[0])/(x[1]-x[2])),
      bo = ta.sma(bo, len);
  return bo;
}
module.exports = bop;
