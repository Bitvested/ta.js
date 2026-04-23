const ta = require('../_registry.js');
function mad(data, length=data.length) {
  for(var i = length, med = []; i <= data.length; i++) {
    var tmp = data.slice(i - length, i),
        m = ta.median(tmp),
        adev = tmp.map(x => Math.abs(x - m[m.length-1]));
        adev = ta.median(adev);
    med.push(adev[adev.length-1]);
  }
  return med;
}
module.exports = mad;
