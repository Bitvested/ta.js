const ta = require('../_registry.js');
function wsma(data, length=14) {
  for(var i = length, wsm = [], weight = 1/length; i <= data.length; i++) {
    if(wsm.length > 0) {
      wsm.push((data[i-1]-wsm[wsm.length-1]) * weight + wsm[wsm.length-1]);
      continue;
    }
    var pl = data.slice(i-length,i),average=0;
    for(var q in pl) average += pl[q];
    wsm.push(average/length);
  }
  return wsm;
}
module.exports = wsma;
