function cross(d1, d2) {
  if (d1.length > d2.length) d1 = d1.slice(d1.length - d2.length);
  let crossed = d1[0] > d2[0];
  const indexes = [];
  for (let i = 0; i < d1.length; i++) {
    if (d1[i] < d2[i] && crossed) {
      indexes.push({ index: i, cross: false });
      crossed = false;
    }
    if (d1[i] > d2[i] && !crossed) {
      indexes.push({ index: i, cross: true });
      crossed = true;
    }
  }
  return indexes;
}
module.exports = cross;
