const ta = require('../_registry.js');
function kst(data, r1=10, r2=15, r3=20, r4=30, s1=10, s2=10, s3=10, s4=15, sig=9) {
  for(var ks = [], fs = [], ms = (Math.max(r1, r2, r3, r4) + Math.max(s1, s2, s3, s4)), i = ms; i <= data.length; i++) {
    var pl = data.slice(i-ms,i),
        rcma1 = ta.roc(pl, r1),
        rcma2 = ta.roc(pl, r2),
        rcma3 = ta.roc(pl, r3),
        rcma4 = ta.roc(pl, r4);
        rcma1 = ta.sma(rcma1, s1);
        rcma2 = ta.sma(rcma2, s2);
        rcma3 = ta.sma(rcma3, s3);
        rcma4 = ta.sma(rcma4, s4);
      ks.push(rcma1[rcma1.length - 1] + rcma2[rcma2.length - 1] + rcma3[rcma3.length - 1] + rcma4[rcma4.length - 1]);
  }
  var sl = ta.sma(ks, sig);
  ks.splice(0, ks.length - sl.length);
  for(var i in sl) fs.push([ks[i], sl[i]]);
  return fs;
}
module.exports = kst;
