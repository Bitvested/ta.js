const ta = require('..');

function priceSeries(n, seed = 'bench') {
  const rng = ta.random.prng(seed);
  const out = new Array(n);
  let p = 100;
  for (let i = 0; i < n; i++) {
    p *= 1 + (rng() - 0.5) * 0.02;
    out[i] = p;
  }
  return out;
}

function ohlcSeries(n, seed = 'bench') {
  const rng = ta.random.prng(seed);
  const out = new Array(n);
  let close = 100;
  for (let i = 0; i < n; i++) {
    const drift = (rng() - 0.5) * 0.02;
    const open = close;
    const newClose = close * (1 + drift);
    const wickHi = Math.max(open, newClose) * (1 + rng() * 0.005);
    const wickLo = Math.min(open, newClose) * (1 - rng() * 0.005);
    out[i] = [open, wickHi, wickLo, newClose];
    close = newClose;
  }
  return out;
}

function volumeSeries(n, seed = 'bench') {
  const rng = ta.random.prng(seed);
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[i] = Math.floor(rng() * 1e6) + 1;
  return out;
}

module.exports = { priceSeries, ohlcSeries, volumeSeries };
