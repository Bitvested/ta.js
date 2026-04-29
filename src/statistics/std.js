function std(data, length=data.length) {
  const n = data.length;
  const start = length < n ? n - length : 0;
  let sum = 0;
  for (let i = start; i < n; i++) sum += data[i];
  const mean = sum / length;
  let sq = 0;
  for (let i = start; i < n; i++) {
    const d = data[i] - mean;
    sq += d * d;
  }
  return Math.sqrt(sq / length);
}
module.exports = std;
