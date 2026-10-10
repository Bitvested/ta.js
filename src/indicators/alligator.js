const ta = require('../_registry.js');

// Displace a raw series to the right by `shift` bars, over an output of `n`
// bars, leaving NaN where the line is not yet defined. Mirrors TradingView's
// plot(series, offset = shift).
function displaced(series, length, shift, n) {
  const line = new Array(n).fill(NaN);
  const start = length - 1 + shift;
  for (let i = start; i < Math.min(n, start + series.length); i++) line[i] = series[i - start];
  return line;
}

function alligator(data, jl=13, tl=8, ll=5, js=8, ts=5, ls=3) {
  const n = data.length,
        jaw = displaced(ta.smma(data, jl), jl, js, n),
        teeth = displaced(ta.smma(data, tl), tl, ts, n),
        lips = displaced(ta.smma(data, ll), ll, ls, n),
        ret = new Array(n);
  for (let i = 0; i < n; i++) ret[i] = [jaw[i], teeth[i], lips[i]];
  return ret;
}
module.exports = alligator;
