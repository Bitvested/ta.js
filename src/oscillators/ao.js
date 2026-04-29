function ao(data, length1=5, length2=35) {
  const n = data.length;
  if (n < length2) return [];
  const m = new Float64Array(n);
  for (let i = 0; i < n; i++) m[i] = (data[i][0] + data[i][1]) / 2;
  let sumSlow = 0;
  for (let i = 0; i < length2; i++) sumSlow += m[i];
  let sumFast = 0;
  for (let i = length2 - length1; i < length2; i++) sumFast += m[i];
  const out = [sumFast / length1 - sumSlow / length2];
  for (let i = length2; i < n; i++) {
    sumSlow += m[i] - m[i - length2];
    sumFast += m[i] - m[i - length1];
    out.push(sumFast / length1 - sumSlow / length2);
  }
  return out;
}
module.exports = ao;
