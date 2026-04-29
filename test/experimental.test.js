const { test } = require('node:test');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');
const p = require('./parameters.js');

const fx = (name, call) =>
  test(name, () => close((call || (() => ta[name].apply(null, p[name].in)))(), p[name].out));

fx('support',          () => ta.support.apply(null, p.support.in).calculate(9));
fx('resistance',       () => ta.resistance.apply(null, p.resistance.in).calculate(4));
fx('divergence_state');
