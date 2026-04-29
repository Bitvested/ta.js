const { lrWindows } = require('../_lr-helpers.js');
const RAD_TO_DEG = 180 / Math.PI;
function lr_angle(data, length=14) {
  const w = lrWindows(data, length);
  const out = new Array(w.length);
  for (let i = 0; i < w.length; i++) out[i] = Math.atan(w[i][0]) * RAD_TO_DEG;
  return out;
}
module.exports = lr_angle;
