const ta = require('../_registry.js');
function cop(data, len1=11, len2=14, len3=10) {
  for(var max = Math.max(len1, len2), co = [], i = max + len3; i < data.length; i++) {
    var r1 = data.slice(i - (max + len3), i), r2 = r1.slice(), tmp = [];
    r1 = ta.roc(r1, len1), r2 = ta.roc(r2, len2), r1.splice(0, r1.length - r2.length), r2.splice(0, r2.length - r1.length);
    for(var a = 0; a < r1.length; a++) tmp.push(r1[a] + r2[a]);
    tmp = ta.wma(tmp, len3);
    co.push(tmp[tmp.length - 1]);
  }
  return co;
}
module.exports = cop;
