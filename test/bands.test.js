const { test } = require('node:test');
const { close } = require('./helpers/close.js');
const ta = require('../index.js');
const p = require('./parameters.js');

const fx = (name, call) =>
  test(name, () => close((call || (() => ta[name].apply(null, p[name].in)))(), p[name].out));

fx('bands');
fx('keltner');
fx('don');
fx('fibbands');
fx('envelope');
