const ta = require('../_registry.js');
function psar(data, step=0.02, max=0.2) {
  var furthest = data[0], up = true, accel = step, prev = data[0],
      sar = data[0][1], extreme = data[0][0], final = [sar];
  for(var i = 1; i < data.length; i++) {
    sar = sar + accel * (extreme - sar);
    if(up) {
      sar = Math.min(sar, furthest[1], prev[1]);
      if(data[i][0] > extreme) {
        extreme = data[i][0];
        accel = Math.min(accel+step, max);
      }
    } else {
      sar = Math.max(sar, furthest[0], prev[0]);
      if(data[i][1] < extreme) {
        extreme = data[i][0];
        accel = Math.min(accel + step, max);
      }
    }
    if((up && data[i][1] < sar) || (!up && data[i][0] > sar)) {
      accel = step;
      sar = extreme;
      up = !up;
      extreme = !up ? data[i][1] : data[i][0]
    }
    furthest = prev;
    prev = data[i];
    final.push(sar);
  }
  return final;
}
module.exports = psar;
