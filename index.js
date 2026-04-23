const registry = require('./src/_registry.js');

Object.assign(registry, {
  // moving averages
  sma:    require('./src/moving-averages/sma.js'),
  smma:   require('./src/moving-averages/smma.js'),
  wma:    require('./src/moving-averages/wma.js'),
  ema:    require('./src/moving-averages/ema.js'),
  hull:   require('./src/moving-averages/hull.js'),
  lsma:   require('./src/moving-averages/lsma.js'),
  vwma:   require('./src/moving-averages/vwma.js'),
  vwwma:  require('./src/moving-averages/vwwma.js'),
  wsma:   require('./src/moving-averages/wsma.js'),
  pwma:   require('./src/moving-averages/pwma.js'),
  hwma:   require('./src/moving-averages/hwma.js'),
  kama:   require('./src/moving-averages/kama.js'),
  cwma:   require('./src/moving-averages/cwma.js'),

  // indicators
  macd:           require('./src/indicators/macd.js'),
  macd_signal:    require('./src/indicators/macd-signal.js'),
  macd_bars:      require('./src/indicators/macd-bars.js'),
  rsi:            require('./src/indicators/rsi.js'),
  wrsi:           require('./src/indicators/wrsi.js'),
  tsi:            require('./src/indicators/tsi.js'),
  bop:            require('./src/indicators/bop.js'),
  fi:             require('./src/indicators/fi.js'),
  asi:            require('./src/indicators/asi.js'),
  alligator:      require('./src/indicators/alligator.js'),
  pr:             require('./src/indicators/pr.js'),
  stoch:          require('./src/indicators/stoch.js'),
  fib:            require('./src/indicators/fib.js'),
  bandwidth:      require('./src/indicators/bandwidth.js'),
  ichimoku:       require('./src/indicators/ichimoku.js'),
  atr:            require('./src/indicators/atr.js'),
  mfi:            require('./src/indicators/mfi.js'),
  roc:            require('./src/indicators/roc.js'),
  cop:            require('./src/indicators/cop.js'),
  kst:            require('./src/indicators/kst.js'),
  obv:            require('./src/indicators/obv.js'),
  vwap:           require('./src/indicators/vwap.js'),
  fractals:       require('./src/indicators/fractals.js'),
  cross:          require('./src/indicators/cross.js'),
  mom:            require('./src/indicators/mom.js'),
  halftrend:      require('./src/indicators/halftrend.js'),
  zigzag:         require('./src/indicators/zigzag.js'),
  psar:           require('./src/indicators/psar.js'),
  supertrend:     require('./src/indicators/supertrend.js'),
  elderray:       require('./src/indicators/elderray.js'),
  hv:             require('./src/indicators/hv.js'),
  rvi:            require('./src/indicators/rvi.js'),
  rvi_signal:     require('./src/indicators/rvi-signal.js'),
  rsi_divergence: require('./src/indicators/rsi-divergence.js'),
  divergence:     require('./src/indicators/divergence.js'),

  // oscillators
  gator:       require('./src/oscillators/gator.js'),
  mom_osc:     require('./src/oscillators/mom-osc.js'),
  chaikin_osc: require('./src/oscillators/chaikin-osc.js'),
  ao:          require('./src/oscillators/ao.js'),
  ac:          require('./src/oscillators/ac.js'),
  fisher:      require('./src/oscillators/fisher.js'),

  // bands
  bands:    require('./src/bands/bands.js'),
  keltner:  require('./src/bands/keltner.js'),
  don:      require('./src/bands/don.js'),
  fibbands: require('./src/bands/fibbands.js'),
  envelope: require('./src/bands/envelope.js'),

  // statistics
  sum:             require('./src/statistics/sum.js'),
  std:             require('./src/statistics/std.js'),
  variance:        require('./src/statistics/variance.js'),
  ncdf:            require('./src/statistics/ncdf.js'),
  normsinv:        require('./src/statistics/normsinv.js'),
  sim:             require('./src/statistics/sim.js'),
  percentile:      require('./src/statistics/percentile.js'),
  cor:             require('./src/statistics/cor.js'),
  covariance:      require('./src/statistics/covariance.js'),
  dif:             require('./src/statistics/dif.js'),
  er:              require('./src/statistics/er.js'),
  ar:              require('./src/statistics/ar.js'),
  kelly:           require('./src/statistics/kelly.js'),
  martingale:      require('./src/statistics/martingale.js'),
  antimartingale:  require('./src/statistics/antimartingale.js'),
  permutations:    require('./src/statistics/permutations.js'),
  expected_trails: require('./src/statistics/expected-trails.js'),
  winratio:        require('./src/statistics/winratio.js'),
  avgwin:          require('./src/statistics/avgwin.js'),
  avgloss:         require('./src/statistics/avgloss.js'),
  return_positive: require('./src/statistics/return-positive.js'),
  return_negative: require('./src/statistics/return-negative.js'),
  drawdown:        require('./src/statistics/drawdown.js'),
  median:          require('./src/statistics/median.js'),
  recent_high:     require('./src/statistics/recent-high.js'),
  recent_low:      require('./src/statistics/recent-low.js'),
  mad:             require('./src/statistics/mad.js'),
  aad:             require('./src/statistics/aad.js'),
  se:              require('./src/statistics/se.js'),
  ssd:             require('./src/statistics/ssd.js'),
  log:             require('./src/statistics/log.js'),
  exp:             require('./src/statistics/exp.js'),
  normalize:       require('./src/statistics/normalize.js'),
  denormalize:     require('./src/statistics/denormalize.js'),
  normalize_pair:  require('./src/statistics/normalize-pair.js'),
  normalize_from:  require('./src/statistics/normalize-from.js'),
  standardize:     require('./src/statistics/standardize.js'),
  zscore:          require('./src/statistics/zscore.js'),
  pvalue:          require('./src/statistics/pvalue.js'),
  kmeans:          require('./src/statistics/kmeans.js'),
  mse:             require('./src/statistics/mse.js'),
  cum:             require('./src/statistics/cum.js'),

  // chart types
  ha:  require('./src/chart-types/ha.js'),
  ren: require('./src/chart-types/ren.js'),

  // misc
  fibnumbers: require('./src/misc/fibnumbers.js'),
  times_up:   require('./src/misc/times-up.js'),
  times_down: require('./src/misc/times-down.js'),

  // experimental
  support:          require('./src/experimental/support.js'),
  resistance:       require('./src/experimental/resistance.js'),
  divergence_state: require('./src/experimental/divergence-state.js'),

  // nested groups (public-API preserved exactly)
  aroon: {
    up:   require('./src/indicators/aroon-up.js'),
    down: require('./src/indicators/aroon-down.js'),
    osc:  require('./src/oscillators/aroon-osc.js'),
  },
  random: {
    prng:  require('./src/random/prng.js'),
    pick:  require('./src/random/pick.js'),
    range: require('./src/random/range.js'),
    float: require('./src/random/float.js'),
    order: require('./src/random/order.js'),
  },
});

// Node ≥12 worker_threads — same conditional as the original index.js:1
if (typeof process === 'object' && Number(process.versions.node.split('.')[0]) >= 12) {
  registry.multi = require('./multi/multi.js');
}

module.exports = registry;
