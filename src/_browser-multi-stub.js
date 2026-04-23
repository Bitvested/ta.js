// Browser-bundle stub for multi/multi.js.
// The real multi module uses worker_threads (Node-only). Browser bundles alias
// `./multi/multi.js` → this file via esbuild so worker_threads is never pulled.
// `sim` is still available as a top-level indicator (src/statistics/sim.js);
// what's stubbed here is the worker-thread–accelerated variant exposed as `ta.multi.sim`.
module.exports = { sim: undefined };
