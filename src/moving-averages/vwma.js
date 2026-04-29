function vwma(data, length=20) {
  const n = data.length;
  if (n < length) return [];
  let sumPV = 0, sumV = 0;
  for (let i = 0; i < length; i++) {
    sumPV += data[i][0] * data[i][1];
    sumV  += data[i][1];
  }
  const out = [sumPV / sumV];
  for (let i = length; i < n; i++) {
    const o = i - length;
    sumPV += data[i][0] * data[i][1] - data[o][0] * data[o][1];
    sumV  += data[i][1] - data[o][1];
    out.push(sumPV / sumV);
  }
  return out;
}
module.exports = vwma;
