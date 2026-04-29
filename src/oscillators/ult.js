function ult(data, p1=7, p2=14, p3=28) {
  const n = data.length;
  const need = Math.max(p1, p2, p3);
  if (n - 1 < need) return [];
  const bp = new Array(n);
  const tr = new Array(n);
  for (let i = 1; i < n; i++) {
    const h = data[i][0], c = data[i][1], l = data[i][2];
    const cprev = data[i-1][1];
    const lo = Math.min(l, cprev);
    bp[i] = c - lo;
    tr[i] = Math.max(h, cprev) - lo;
  }
  let sBp1 = 0, sTr1 = 0, sBp2 = 0, sTr2 = 0, sBp3 = 0, sTr3 = 0;
  for (let i = need - p1 + 1; i <= need; i++) { sBp1 += bp[i]; sTr1 += tr[i]; }
  for (let i = need - p2 + 1; i <= need; i++) { sBp2 += bp[i]; sTr2 += tr[i]; }
  for (let i = need - p3 + 1; i <= need; i++) { sBp3 += bp[i]; sTr3 += tr[i]; }
  const out = [ultVal(sBp1, sTr1, sBp2, sTr2, sBp3, sTr3)];
  for (let i = need + 1; i < n; i++) {
    sBp1 += bp[i] - bp[i - p1]; sTr1 += tr[i] - tr[i - p1];
    sBp2 += bp[i] - bp[i - p2]; sTr2 += tr[i] - tr[i - p2];
    sBp3 += bp[i] - bp[i - p3]; sTr3 += tr[i] - tr[i - p3];
    out.push(ultVal(sBp1, sTr1, sBp2, sTr2, sBp3, sTr3));
  }
  return out;
}
function ultVal(sBp1, sTr1, sBp2, sTr2, sBp3, sTr3) {
  const a1 = sTr1 === 0 ? NaN : sBp1 / sTr1;
  const a2 = sTr2 === 0 ? NaN : sBp2 / sTr2;
  const a3 = sTr3 === 0 ? NaN : sBp3 / sTr3;
  return 100 * (4*a1 + 2*a2 + a3) / 7;
}
module.exports = ult;
