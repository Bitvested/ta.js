const ta = require('../_registry.js');
function normalize_from(data, value) {
  for(var i = 1, ret = [value]; i < data.length; i++) ret.push(ret[ret.length-1]*((data[i]-data[i-1])/data[i-1]+1));
  return ret;
}
module.exports = normalize_from;
