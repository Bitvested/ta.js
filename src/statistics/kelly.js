const ta = require('../_registry.js');
function kelly(data) {
  var exp = ta.er(data) + 1,
      winr = ta.winratio(data);
  if(isNaN(exp)) exp = 1;
  return winr - (1-winr) / exp;
}
module.exports = kelly;
