const ta = require('../_registry.js');
function dpo(data, length=21) {
  const sma = ta.sma(data, length);
  if (sma.length === 0) return [];
  const dataOff = length - 2 - Math.floor(length / 2);
  const out = new Array(sma.length);
  for (let i = 0; i < sma.length; i++) {
    out[i] = data[i + dataOff] - sma[i];
  }
  return out;
}
module.exports = dpo;
