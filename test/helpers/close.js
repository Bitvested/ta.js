const { AssertionError } = require('node:assert');

const ABS_TOL = 1e-12;
const REL_TOL = 1e-12;

function nearlyEqual(a, b) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;
    const diff = Math.abs(a - b);
    return diff <= ABS_TOL || diff <= REL_TOL * Math.max(Math.abs(a), Math.abs(b));
  }
  return false;
}

function deepNearlyEqual(a, b) {
  if (nearlyEqual(a, b)) return true;
  if (a === null || b === null || typeof a !== typeof b) return a === b;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepNearlyEqual(a[i], b[i])) return false;
    return true;
  }
  if (typeof a === 'object') {
    if (Array.isArray(b)) return false;
    const ka = Object.keys(a);
    if (ka.length !== Object.keys(b).length) return false;
    for (const k of ka) {
      if (!Object.prototype.hasOwnProperty.call(b, k) || !deepNearlyEqual(a[k], b[k])) return false;
    }
    return true;
  }
  return false;
}

function close(actual, expected, message) {
  if (!deepNearlyEqual(actual, expected)) {
    throw new AssertionError({
      message: message || 'values not nearly equal',
      actual,
      expected,
      operator: 'close',
      stackStartFn: close,
    });
  }
}

module.exports = { close, nearlyEqual, deepNearlyEqual };
