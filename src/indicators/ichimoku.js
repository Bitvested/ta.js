function ichimoku(data, length1=9, length2=26, length3=52, length4=26) {
  const n = data.length;
  if (n < length3) return [];
  const place = [];
  for (let i = length3 - 1; i < n; i++) {
    let h1 = -Infinity, l1 = Infinity;
    for (let j = i - length1 + 1; j <= i; j++) {
      if (data[j][0] > h1) h1 = data[j][0];
      if (data[j][2] < l1) l1 = data[j][2];
    }
    let h2 = -Infinity, l2 = Infinity;
    for (let j = i - length2 + 1; j <= i; j++) {
      if (data[j][0] > h2) h2 = data[j][0];
      if (data[j][2] < l2) l2 = data[j][2];
    }
    let h3 = -Infinity, l3 = Infinity;
    for (let j = i - length3 + 1; j <= i; j++) {
      if (data[j][0] > h3) h3 = data[j][0];
      if (data[j][2] < l3) l3 = data[j][2];
    }
    const tsen = (h1 + l1) / 2;
    const ksen = (h2 + l2) / 2;
    const senka = data[i][1] + ksen;
    const senkb = (h3 + l3) / 2;
    const chik = data[i][1];
    place.push([tsen, ksen, senka, senkb, chik]);
  }
  const cloud = [];
  for (let i = length4; i < place.length - length4; i++) {
    cloud.push([place[i][0], place[i][1], place[i + length4][2], place[i + length4][3], place[i - length4][4]]);
  }
  return cloud;
}
module.exports = ichimoku;
