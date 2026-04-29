// Compatibility shim. Real cases now live in `bench/cases/<category>.js`,
// aggregated by `bench/cases/index.js`. This file forwards for any external
// caller still importing `bench/cases.js`. Remove in a follow-up.
module.exports = require('./cases/index.js');
