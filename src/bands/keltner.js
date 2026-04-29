const ta = require('../_registry.js');
function keltner(data, length=14, devi=1) {
  const closing = new Array(data.length);
  for (let i = 0; i < data.length; i++) closing[i] = (data[i][0] + data[i][1] + data[i][2]) / 3;
  const kma = ta.sma(closing, length);
  const atrArr = ta.atr(data, length);
  const out = [];
  for (let i = 0; i < kma.length; i++) {
    out.push([kma[i] + atrArr[i] * devi, kma[i], kma[i] - atrArr[i] * devi]);
  }
  return out;
}
module.exports = keltner;
