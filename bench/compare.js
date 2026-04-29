const ABS_TOL = 1e-6;
const REL_TOL = 1e-6;

function isFiniteNum(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function nearlyEqual(a, b) {
  if (a === b) return true;
  if (!isFiniteNum(a) || !isFiniteNum(b)) return false;
  const diff = Math.abs(a - b);
  return diff <= ABS_TOL || diff <= REL_TOL * Math.max(Math.abs(a), Math.abs(b));
}

function trimNonFinite(arr) {
  let i = 0;
  while (i < arr.length && !isFiniteNum(arr[i])) i++;
  return arr.slice(i);
}

function maxAbsDiff(a, b) {
  const len = Math.min(a.length, b.length);
  let max = 0, atIdx = -1;
  for (let i = 0; i < len; i++) {
    const aa = a[a.length - len + i];
    const bb = b[b.length - len + i];
    if (!isFiniteNum(aa) || !isFiniteNum(bb)) continue;
    const d = Math.abs(aa - bb);
    if (d > max) { max = d; atIdx = i; }
  }
  return { max, atIdx, lenA: a.length, lenB: b.length, comparedLen: len };
}

function compareScalar(reference, candidate) {
  const a = trimNonFinite(reference);
  const b = trimNonFinite(candidate);
  const r = maxAbsDiff(a, b);
  return {
    match: r.max <= Math.max(ABS_TOL, REL_TOL * Math.max(...a.map(Math.abs).filter(isFiniteNum), 1)),
    maxAbsDiff: r.max,
    diffAt: r.atIdx,
    lenRef: r.lenA,
    lenCandidate: r.lenB,
  };
}

module.exports = { compareScalar, nearlyEqual, trimNonFinite };
