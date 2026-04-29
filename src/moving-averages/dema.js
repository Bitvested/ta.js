function dema(data, length=30) {
  const n = data.length;
  if (n < 2 * length - 1) return [];
  const alpha = 2 / (length + 1);
  let sum = 0;
  for (let i = 0; i < length; i++) sum += data[i];
  let e1 = sum / length;
  let sumE1 = e1;
  for (let i = length; i < 2 * length - 1; i++) {
    e1 = (data[i] - e1) * alpha + e1;
    sumE1 += e1;
  }
  let e2 = sumE1 / length;
  const out = new Array(n - 2 * length + 2);
  out[0] = 2 * e1 - e2;
  for (let i = 2 * length - 1; i < n; i++) {
    e1 = (data[i] - e1) * alpha + e1;
    e2 = (e1 - e2) * alpha + e2;
    out[i - 2 * length + 2] = 2 * e1 - e2;
  }
  return out;
}
module.exports = dema;
