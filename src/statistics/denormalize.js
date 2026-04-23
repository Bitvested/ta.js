const ta = require('../_registry.js');
function denormalize(data, norm, marg=0) {
  for(var i = 0, max = Math.max.apply(null, data.slice())*(1+marg), min = Math.min.apply(null, data.slice())*(1-marg), dnorm = []; i < norm.length; i++) dnorm.push(min+norm[i]*(max-min));
  return dnorm;
}
module.exports = denormalize;
