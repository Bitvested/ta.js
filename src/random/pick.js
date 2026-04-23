const ta = require('../_registry.js');
const pick = (data, rng) => data[Math.floor((rng) ? rng()*(Math.floor(data.length)) : Math.random()*(Math.floor(data.length)))];
module.exports = pick;
