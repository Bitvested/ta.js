const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { bench, fmtOps, fmtTime } = require('./harness.js');
const { compareScalar } = require('./compare.js');
const { cases, loadErrs } = require('./cases/index.js');

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const argVal = (n, def) => {
  const i = args.indexOf(n);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : def;
};

const SIZES         = (argVal('--sizes', '1000,10000,100000')).split(',').map(Number);
const ONLY          = argVal('--only', null);
const WRITE_MD      = flag('--md');
const WRITE_JSON    = flag('--json');
const QUIET         = flag('--quiet');
const REFERENCE_LIB = argVal('--reference', 'tulind');

function libVersion(name) {
  try { return require(name + '/package.json').version; } catch { return null; }
}

const env = {
  date: new Date().toISOString(),
  node: process.version,
  os: os.type() + ' ' + os.release() + ' / ' + process.arch,
  cpu: (os.cpus()[0] || {}).model || 'unknown',
  cpuCount: os.cpus().length,
  libs: {
    'ta.js':                require('../package.json').version,
    'technicalindicators':  libVersion('technicalindicators'),
    'trading-signals':      libVersion('trading-signals'),
    '@debut/indicators':    libVersion('@debut/indicators'),
    'tulind':               libVersion('tulind'),
  },
};

function run() {
  const results = [];

  for (const c of cases) {
    if (ONLY && !ONLY.split(',').includes(c.name)) continue;
    if (!QUIET) console.log('\n=== ' + c.name + ' — ' + c.description + ' ===');

    for (const size of SIZES) {
      const data = c.generate(size);

      const adapterEntries = Object.entries(c.adapters).filter(([_, a]) => a);
      const prepared = new Map();
      const sample = new Map();

      for (const [lib, adapter] of adapterEntries) {
        try {
          const input = adapter.prepare(data);
          prepared.set(lib, input);
          const raw = adapter.compute(input);
          sample.set(lib, adapter.extract(raw));
        } catch (e) {
          if (!QUIET) console.log('  [' + lib + '] sanity-call threw: ' + e.message.split('\n')[0]);
        }
      }

      // Per-case `reference` override beats the global --reference flag, which
      // beats first-available. Lets indicators with documented convention
      // divergences (e.g. tulind.roc returns fraction; everyone else percent)
      // pick a same-convention reference for a meaningful correctness diff.
      const caseRef = c.reference;
      const refLib = (caseRef && adapterEntries.find(([l]) => l === caseRef && sample.has(l))?.[0])
                  || adapterEntries.find(([l]) => l === REFERENCE_LIB && sample.has(l))?.[0]
                  || adapterEntries.find(([l]) => sample.has(l))?.[0];

      for (const [lib, adapter] of adapterEntries) {
        if (!prepared.has(lib)) continue;
        const input = prepared.get(lib);

        let stats;
        try { stats = bench(() => adapter.compute(input)); }
        catch (e) { stats = { error: e.message.split('\n')[0] }; }

        let correctness = null;
        if (sample.has(lib) && refLib && lib !== refLib) {
          correctness = compareScalar(sample.get(refLib), sample.get(lib));
        } else if (lib === refLib) {
          correctness = { match: true, isReference: true };
        }

        results.push({
          indicator: c.name,
          description: c.description,
          size,
          lib,
          stats,
          correctness,
          referenceLib: refLib,
        });

        if (!QUIET) {
          const tag = lib === refLib ? '(ref)' :
                      !correctness ? '' :
                      correctness.match ? '✓' :
                      '✗ Δ' + correctness.maxAbsDiff.toExponential(2) + '@i' + correctness.diffAt;
          if (stats.error) {
            console.log('  size=' + size + '  ' + lib.padEnd(22) + '  ERROR: ' + stats.error);
          } else {
            console.log(
              '  size=' + String(size).padStart(7) + '  ' + lib.padEnd(22) +
              fmtOps(stats.opsPerSec).padStart(13) + '  ' +
              fmtTime(stats.medianNs).padStart(10) + '/op  ' +
              tag
            );
          }
        }
      }
    }
  }

  return { env, results };
}

function renderMd({ env, results }) {
  const lines = [];
  lines.push('# ta.js comparative benchmarks');
  lines.push('');
  lines.push('Generated ' + env.date + '.');
  lines.push('');
  lines.push('- Node: `' + env.node + '`');
  lines.push('- OS:   `' + env.os + '`');
  lines.push('- CPU:  `' + env.cpu + '` (' + env.cpuCount + ' cores)');
  lines.push('');
  lines.push('## Library versions');
  lines.push('| library | version |');
  lines.push('|---|---|');
  for (const [k, v] of Object.entries(env.libs)) lines.push('| ' + k + ' | ' + (v || '_not installed_') + ' |');
  lines.push('');

  const byIndicator = new Map();
  for (const r of results) {
    if (!byIndicator.has(r.indicator)) byIndicator.set(r.indicator, []);
    byIndicator.get(r.indicator).push(r);
  }

  for (const [name, rows] of byIndicator) {
    lines.push('## ' + name);
    lines.push('');
    lines.push('_' + rows[0].description + '_');
    lines.push('');
    const sizes = [...new Set(rows.map(r => r.size))];
    const libs = [...new Set(rows.map(r => r.lib))];
    lines.push('| library | ' + sizes.map(s => 'ops/s @ ' + s).join(' | ') + ' | correctness vs ' + (rows[0].referenceLib || 'n/a') + ' |');
    lines.push('|---|' + sizes.map(() => '---:').join('|') + '|---|');
    for (const lib of libs) {
      const cells = sizes.map(s => {
        const r = rows.find(rr => rr.lib === lib && rr.size === s);
        if (!r || !r.stats || r.stats.error) return '_n/a_';
        return fmtOps(r.stats.opsPerSec);
      });
      const last = rows.find(rr => rr.lib === lib);
      let corr = '—';
      if (last && last.correctness) {
        if (last.correctness.isReference) corr = '_reference_';
        else if (last.correctness.match) corr = '✓';
        else corr = '✗ max Δ ' + last.correctness.maxAbsDiff.toExponential(2);
      }
      lines.push('| ' + lib + ' | ' + cells.join(' | ') + ' | ' + corr + ' |');
    }
    lines.push('');
  }

  if (Object.keys(loadErrs).length) {
    lines.push('## Load errors');
    for (const [k, v] of Object.entries(loadErrs)) lines.push('- ' + k + ': ' + v);
    lines.push('');
  }

  return lines.join('\n');
}

const out = run();

if (WRITE_MD) {
  const md = renderMd(out);
  fs.writeFileSync(path.join(__dirname, '..', 'BENCHMARKS.md'), md);
  console.log('\nwrote BENCHMARKS.md');
}
if (WRITE_JSON) {
  fs.writeFileSync(path.join(__dirname, 'results.json'), JSON.stringify(out, null, 2));
  console.log('wrote bench/results.json');
}

if (Object.keys(loadErrs).length && !QUIET) {
  console.log('\nLoad errors:');
  for (const [k, v] of Object.entries(loadErrs)) console.log('  ' + k + ': ' + v);
}
