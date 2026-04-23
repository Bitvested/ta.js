const ta = require('../_registry.js');
function rvi(data, len=20) {
  for(var i = 3, num = [], dnom = [], rv = []; i < data.length; i++) {
    num.push((data[i][3]-data[i][0]+2*(data[i][3]-data[i-1][0])+2*(data[i][3]-data[i-2][0])+(data[i][3]-data[i-3][0]))/6);
    dnom.push((data[i][1]-data[i][2]+2*(data[i][1]-data[i-1][2])+2*(data[i][1]-data[i-2][2])+(data[i][1]-data[i-3][2]))/6);
    if(num.length >= len) {
      var sn = ta.sma(num, len),
          dn = ta.sma(dnom, len);
      rv.push(sn[0]/dn[0]);
      num.splice(0,1);dnom.splice(0,1);
    }
  }
  return rv;
}
module.exports = rvi;
