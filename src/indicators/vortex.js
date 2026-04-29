function vortex(data, length=14) {
  const n = data.length;
  if (n < length + 1) return [];
  const vmp = new Array(n);
  const vmn = new Array(n);
  const tr  = new Array(n);
  for (let i = 1; i < n; i++) {
    const h = data[i][0], l = data[i][2], cprev = data[i-1][1];
    const hprev = data[i-1][0], lprev = data[i-1][2];
    vmp[i] = Math.abs(h - lprev);
    vmn[i] = Math.abs(l - hprev);
    tr[i]  = Math.max(h - l, Math.abs(h - cprev), Math.abs(l - cprev));
  }
  let sP = 0, sN = 0, sT = 0;
  for (let i = 1; i <= length; i++) { sP += vmp[i]; sN += vmn[i]; sT += tr[i]; }
  const out = new Array(n - length);
  out[0] = [sT === 0 ? NaN : sP / sT, sT === 0 ? NaN : sN / sT];
  for (let i = length + 1; i < n; i++) {
    sP += vmp[i] - vmp[i - length];
    sN += vmn[i] - vmn[i - length];
    sT += tr[i]  - tr[i  - length];
    out[i - length] = [sT === 0 ? NaN : sP / sT, sT === 0 ? NaN : sN / sT];
  }
  return out;
}
module.exports = vortex;
