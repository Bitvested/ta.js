const ta = require('../_registry.js');
function elderray(data, length=13) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  for (let i = length; i <= n; i++) {
    let hi = -Infinity, lo = Infinity, sum = 0;
    for (let j = i - length; j < i; j++) {
      if (data[j] > hi) hi = data[j];
      if (data[j] < lo) lo = data[j];
      sum += data[j];
    }
    const mean = sum / length;
    out.push([hi - mean, lo - mean]);
  }
  return out;
}
module.exports = elderray;
