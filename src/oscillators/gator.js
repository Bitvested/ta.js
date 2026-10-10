const ta = require('../_registry.js');

// Derived from alligator's displaced lines, so the output keeps alligator's
// bar alignment. TradingView's Gator Oscillator does not displace its lines:
// pass js = ts = ls = 0 to match it.
function gator(data, jl=13, tl=8, ll=5, js=8, ts=5, ls=3) {
  return ta.alligator(data, jl, tl, ll, js, ts, ls)
    .map(([jaw, teeth, lips]) => [Math.abs(jaw - teeth), -Math.abs(teeth - lips)]);
}
module.exports = gator;
