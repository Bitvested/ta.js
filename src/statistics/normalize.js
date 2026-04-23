const ta = require('../_registry.js');
function normalize(data, marg=0) {
  for(var i = 0, max = Math.max.apply(null, data.slice())*(1+marg), min = Math.min.apply(null, data.slice())*(1-marg), norm = []; i < data.length; i++) norm.push(1-(max-data[i])/(max-min));
  return norm;
}
module.exports = normalize;
