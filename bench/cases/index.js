const movingAverages = require('./moving-averages.js');
const indicators     = require('./indicators.js');
const oscillators    = require('./oscillators.js');
const bands          = require('./bands.js');
const statistics     = require('./statistics.js');
const chartTypes     = require('./chart-types.js');
const { loadErrs }   = require('./_libs.js');

const cases = [
  ...movingAverages,
  ...indicators,
  ...oscillators,
  ...bands,
  ...statistics,
  ...chartTypes,
];

module.exports = { cases, loadErrs };
