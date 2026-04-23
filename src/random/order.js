const ta = require('../_registry.js');
function order(data, rng) {
  var ret = []; data = data.slice();
  do {
    var index = Math.floor((rng) ? rng()*(Math.floor(data.length)) : Math.random()*(Math.floor(data.length)));
    ret.push(data[index]);
    data.splice(index, 1);
  } while(data.length > 0);
  return ret;
}
module.exports = order;
