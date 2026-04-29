function divergence(data1, data2) {
  if (data1.length > data2.length) data1 = data1.slice(data1.length - data2.length);
  if (data2.length > data1.length) data2 = data2.slice(data2.length - data1.length);
  const out = [];
  for (let i = 1; i < data1.length; i++) {
    const up1 = data1[i] > data1[i-1], dn1 = data1[i] < data1[i-1];
    const up2 = data2[i] > data2[i-1], dn2 = data2[i] < data2[i-1];
    out.push((up1 && dn2) || (dn1 && up2) ? 1 : 0);
  }
  return out;
}
module.exports = divergence;
