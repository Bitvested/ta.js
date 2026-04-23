const ta = require('../_registry.js');
function mfi(data, length=14) {
  for(var i = length, mfi = [], n = data.map(x => x[1]), p = data.map(x => x[0]), pos = 0, neg = 0; i <= data.length; i++, pos = 0, neg = 0) {
    for(var q = i-length; q < i; q++) pos += p[q], neg += n[q];
    mfi.push((100 - 100 / (1 + pos / neg)));
  }
  return mfi;
}
module.exports = mfi;
