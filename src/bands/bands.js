function bands(data, length=14, deviations=1) {
  const n = data.length;
  if (n < length) return [];
  const out = [];
  let sumX = 0, sumX2 = 0;
  for (let i = 0; i < length; i++) {
    sumX += data[i];
    sumX2 += data[i] * data[i];
  }
  pushBand(out, sumX, sumX2, length, deviations);
  for (let i = length; i < n; i++) {
    const incoming = data[i];
    const outgoing = data[i - length];
    sumX += incoming - outgoing;
    sumX2 += incoming * incoming - outgoing * outgoing;
    pushBand(out, sumX, sumX2, length, deviations);
  }
  return out;
}
function pushBand(out, sumX, sumX2, length, deviations) {
  const mean = sumX / length;
  const v = sumX2 / length - mean * mean;
  const std = Math.sqrt(v > 0 ? v : 0);
  out.push([mean + std * deviations, mean, mean - std * deviations]);
}
module.exports = bands;
