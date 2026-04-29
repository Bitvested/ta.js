function stoch(data, length=14, smoothd=3, smoothk=3) {
  if (length < smoothd) [length, smoothd] = [smoothd, length];
  if (smoothk > smoothd) [smoothk, smoothd] = [smoothd, smoothk];
  const n = data.length;
  const out = [];
  if (n < length) return out;

  const qHi = new Int32Array(n); let qHiH = 0, qHiT = 0;
  const qLo = new Int32Array(n); let qLoH = 0, qLoT = 0;

  const rawBuf = new Float64Array(smoothk);
  const smBuf  = new Float64Array(smoothd);
  let rawSum = 0, smSum = 0;
  let rawCount = 0, smCount = 0;
  let rawIdx = 0, smIdx = 0;

  for (let i = 0; i < n; i++) {
    const hi = data[i][0], lo = data[i][2];
    while (qHiT > qHiH && data[qHi[qHiT - 1]][0] <= hi) qHiT--;
    qHi[qHiT++] = i;
    if (qHi[qHiH] <= i - length) qHiH++;
    while (qLoT > qLoH && data[qLo[qLoT - 1]][2] >= lo) qLoT--;
    qLo[qLoT++] = i;
    if (qLo[qLoH] <= i - length) qLoH++;

    if (i < length - 1) continue;

    const highd = data[qHi[qHiH]][0];
    const lowd  = data[qLo[qLoH]][2];
    const range = highd - lowd;
    const rawK = range === 0 ? NaN : 100 * (data[i][1] - lowd) / range;

    if (rawCount < smoothk) { rawBuf[rawIdx] = rawK; rawSum += rawK; rawCount++; }
    else { rawSum += rawK - rawBuf[rawIdx]; rawBuf[rawIdx] = rawK; }
    rawIdx = (rawIdx + 1) % smoothk;
    if (rawCount < smoothk) continue;
    const smK = rawSum / smoothk;

    if (smCount < smoothd) { smBuf[smIdx] = smK; smSum += smK; smCount++; }
    else { smSum += smK - smBuf[smIdx]; smBuf[smIdx] = smK; }
    smIdx = (smIdx + 1) % smoothd;
    if (smCount < smoothd) continue;

    out.push([smK, smSum / smoothd]);
  }
  return out;
}
module.exports = stoch;
