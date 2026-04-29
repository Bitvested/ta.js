const { test } = require('node:test');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');
const p = require('./parameters.js');

const fx = (name, call) =>
  test(name, () => close((call || (() => ta[name].apply(null, p[name].in)))(), p[name].out));

fx('gator');
fx('mom_osc');
fx('chaikin_osc');
fx('ao');
fx('ac');
fx('fisher');
fx('ult');
fx('kvo');

fx('aroon_osc', () => ta.aroon.osc.apply(null, p.aroon_osc.in));
