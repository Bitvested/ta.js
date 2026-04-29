function bench(fn, opts = {}) {
  const minTimeNs    = (opts.minTimeMs    || 500) * 1e6;
  const targetBatchNs= (opts.targetBatchMs || 5)   * 1e6;
  const maxSamples   = opts.maxSamples || 100;
  const minSamples   = opts.minSamples || 10;
  const warmup       = opts.warmup     || 5;

  for (let i = 0; i < warmup; i++) fn();

  let batchSize = 1;
  while (batchSize < 1e7) {
    const t0 = process.hrtime.bigint();
    for (let i = 0; i < batchSize; i++) fn();
    const t1 = process.hrtime.bigint();
    if (Number(t1 - t0) >= targetBatchNs) break;
    batchSize *= 2;
  }

  const samples = [];
  const start = process.hrtime.bigint();
  while (true) {
    const t0 = process.hrtime.bigint();
    for (let i = 0; i < batchSize; i++) fn();
    const t1 = process.hrtime.bigint();
    samples.push(Number(t1 - t0) / batchSize);
    const elapsed = Number(t1 - start);
    if (samples.length >= maxSamples) break;
    if (samples.length >= minSamples && elapsed >= minTimeNs) break;
  }

  samples.sort((a, b) => a - b);
  const median = samples[Math.floor(samples.length / 2)];
  return {
    batchSize,
    samples: samples.length,
    medianNs: median,
    minNs:    samples[0],
    p99Ns:    samples[Math.min(samples.length - 1, Math.floor(samples.length * 0.99))],
    opsPerSec: 1e9 / median,
  };
}

function fmtOps(opsPerSec) {
  if (opsPerSec >= 1e9) return (opsPerSec / 1e9).toFixed(2) + ' Gops/s';
  if (opsPerSec >= 1e6) return (opsPerSec / 1e6).toFixed(2) + ' Mops/s';
  if (opsPerSec >= 1e3) return (opsPerSec / 1e3).toFixed(2) + ' kops/s';
  return opsPerSec.toFixed(0) + ' ops/s';
}

function fmtTime(ns) {
  if (ns >= 1e9) return (ns / 1e9).toFixed(2) + ' s';
  if (ns >= 1e6) return (ns / 1e6).toFixed(2) + ' ms';
  if (ns >= 1e3) return (ns / 1e3).toFixed(2) + ' µs';
  return ns.toFixed(1) + ' ns';
}

module.exports = { bench, fmtOps, fmtTime };
