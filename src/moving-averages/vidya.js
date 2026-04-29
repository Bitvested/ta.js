const ta = require('../_registry.js');
function vidya(data, shortLength=2, longLength=5, alpha=0.2) {
  const n = data.length;
  if (n < longLength) return [];
  let prev = data[longLength - 2];
  const out = [prev];
  for (let i = longLength - 1; i < n; i++) {
    const sShort = ta.std(data.slice(i - shortLength + 1, i + 1), shortLength);
    const sLong  = ta.std(data.slice(i - longLength + 1,  i + 1), longLength);
    const k = sLong === 0 ? 0 : sShort / sLong;
    prev = alpha * k * data[i] + (1 - alpha * k) * prev;
    out.push(prev);
  }
  return out;
}
module.exports = vidya;
