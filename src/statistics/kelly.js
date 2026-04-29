const ta = require('../_registry.js');
function kelly(data) {
  const exp = ta.er(data) + 1;
  const winr = ta.winratio(data);
  return winr - (1 - winr) / exp;
}
module.exports = kelly;
