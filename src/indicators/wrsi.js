const ta = require('../_registry.js');
function wrsi(data, length=14) {
  for(var i = 1, arrsi = [], u = [], d = []; i < data.length; i++) if(data[i]-data[i-1]<0) {d.push(Math.abs(data[i]-data[i-1])),u.push(0);}else{d.push(0),u.push(data[i]-data[i-1]);}
  d = ta.wsma(d, length), u = ta.wsma(u, length);
  for(var i in d) arrsi.push(100-100/(1+(u[i]/d[i])));
  return arrsi;
}
module.exports = wrsi;
