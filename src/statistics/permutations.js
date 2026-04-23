const ta = require('../_registry.js');
const permutations = (data) => data.reduce((a,b) => a * b);
module.exports = permutations;
