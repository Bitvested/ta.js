function hv(data, length=10) {
  const n = data.length;
  if (n < length) return [];
  let sumX = 0, sumX2 = 0;
  for (let i = 0; i < length; i++) {
    sumX  += data[i];
    sumX2 += data[i] * data[i];
  }
  const out = [];
  pushHv(out, sumX, sumX2, length);
  for (let i = length; i < n; i++) {
    const incoming = data[i], outgoing = data[i - length];
    sumX  += incoming - outgoing;
    sumX2 += incoming * incoming - outgoing * outgoing;
    pushHv(out, sumX, sumX2, length);
  }
  return out;
}
function pushHv(out, sumX, sumX2, length) {
  const mean = sumX / length;
  const v = sumX2 / length - mean * mean;
  out.push(Math.sqrt(v > 0 ? v : 0));
}
module.exports = hv;
