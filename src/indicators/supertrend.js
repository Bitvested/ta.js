const ta = require('../_registry.js');
function supertrend(data, length=20, multiplier=3) {
  const atrArr = ta.atr(data, length);
  const out = [];
  for (let i = 0; i < atrArr.length; i++) {
    const bar = i + length - 1;
    const mid = (data[bar][0] + data[bar][2]) / 2;
    out.push([mid + multiplier * atrArr[i], mid - multiplier * atrArr[i]]);
  }
  return out;
}
module.exports = supertrend;
