const ta = require('../_registry.js');
function zscore(data, len=data.length) {
  for(var i = len-1, out = [], pl = data.slice(0,len-1); i < data.length; i++) {
    pl.push(data[i]);
    var mean = ta.sma(pl, len),
        stdv = ta.std(pl, len);
    out.push((data[i]-mean[0])/stdv)
    pl.splice(0,1);
  }
  return out;
}
module.exports = zscore;
