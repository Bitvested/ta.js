const ta = require('../_registry.js');
function ac(data, len1=5, len2=35) {
  var a = ta.ao(data, len1, len2), sm = ta.sma(a, len1), acr = [];
  if(a.length > sm.length) {a.splice(0, a.length-sm.length)} else {sm.splice(0,sm.length-a.length)}
  for(var i in a) acr.push(a[i]-sm[i]);
  return acr;
}
module.exports = ac;
