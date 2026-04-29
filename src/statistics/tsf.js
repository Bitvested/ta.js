const { lrWindows } = require('../_lr-helpers.js');
function tsf(data, length=14) {
  const w = lrWindows(data, length);
  const out = new Array(w.length);
  for (let i = 0; i < w.length; i++) out[i] = w[i][0] * length + w[i][1];
  return out;
}
module.exports = tsf;
