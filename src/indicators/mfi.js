function mfi(data, length=14) {
  const n = data.length;
  if (n <= length) return [];
  const pos = new Array(n);
  const neg = new Array(n);
  pos[0] = 0; neg[0] = 0;
  let prevTp = (data[0][0] + data[0][1] + data[0][2]) / 3;
  for (let i = 1; i < n; i++) {
    const tp = (data[i][0] + data[i][1] + data[i][2]) / 3;
    const flow = tp * data[i][3];
    if (tp > prevTp) { pos[i] = flow; neg[i] = 0; }
    else if (tp < prevTp) { pos[i] = 0; neg[i] = flow; }
    else { pos[i] = 0; neg[i] = 0; }
    prevTp = tp;
  }
  let sumPos = 0, sumNeg = 0;
  for (let i = 1; i <= length; i++) { sumPos += pos[i]; sumNeg += neg[i]; }
  const out = [mfiVal(sumPos, sumNeg)];
  for (let i = length + 1; i < n; i++) {
    sumPos += pos[i] - pos[i - length];
    sumNeg += neg[i] - neg[i - length];
    out.push(mfiVal(sumPos, sumNeg));
  }
  return out;
}
function mfiVal(p, n) {
  if (p === 0 && n === 0) return NaN;
  if (n === 0) return 100;
  return 100 * p / (p + n);
}
module.exports = mfi;
