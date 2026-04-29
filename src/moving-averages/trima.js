const ta = require('../_registry.js');
function trima(data, length=30) {
  let nInner, nOuter;
  if (length % 2 === 0) {
    nInner = length / 2 + 1;
    nOuter = length / 2;
  } else {
    nInner = nOuter = (length + 1) / 2;
  }
  return ta.sma(ta.sma(data, nInner), nOuter);
}
module.exports = trima;
