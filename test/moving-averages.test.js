const { test } = require('node:test');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');
const p = require('./parameters.js');

const fx = (name, call) =>
  test(name, () => close((call || (() => ta[name].apply(null, p[name].in)))(), p[name].out));

fx('sma');
fx('smma');
fx('wma');
fx('ema');
fx('hull');
fx('lsma');
fx('vwma');
fx('vwwma');
fx('wsma');
fx('pwma');
fx('hwma');
fx('kama');
fx('cwma');
fx('dema');
fx('tema');
fx('trima');
fx('zlema');
fx('t3');
fx('vidya');
