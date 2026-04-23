#!/usr/bin/env node
// Generates the browser bundles from src/ via esbuild.
// Additive only: ta.min.js (hand-maintained legacy) is NOT touched.
//
//   ta.iife.min.js   IIFE, minified, exposes `window.ta`
//   ta.esm.js        ESM, not minified (tree-shakable), named exports
//
// Both alias `./multi/multi.js` → `src/_browser-multi-stub.js` so browser
// bundles don't pull the Node-only `worker_threads` module.
//
// Usage:
//   node scripts/build.js            # build both bundles, write to disk
//   node scripts/build.js --check    # build in memory, diff against disk, exit 1 if drift

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.resolve(__dirname, '..');
const ENTRY = path.join(ROOT, 'index.js');
const STUB  = path.join(ROOT, 'src', '_browser-multi-stub.js');

const OUT_IIFE = path.join(ROOT, 'ta.iife.min.js');
const OUT_ESM  = path.join(ROOT, 'ta.esm.js');

const checkMode = process.argv.includes('--check');

// esbuild's `alias` field only supports package-name keys, not relative paths.
// Use a resolve plugin to redirect the Node-only multi module in browser builds.
const stubMultiPlugin = {
  name: 'stub-multi',
  setup(build) {
    build.onResolve({ filter: /(^|\/)multi\/multi\.js$/ }, () => ({ path: STUB }));
  },
};

const commonOpts = {
  entryPoints: [ENTRY],
  bundle: true,
  platform: 'browser',
  plugins: [stubMultiPlugin],
  banner: { js: '/* ta.js (c) Nino Kroesen. MIT License. */' },
  write: !checkMode,
};

async function buildIIFE() {
  const opts = {
    ...commonOpts,
    format: 'iife',
    globalName: 'ta',
    minify: true,
    outfile: OUT_IIFE,
  };
  if (checkMode) { delete opts.outfile; opts.write = false; }
  const result = await esbuild.build(opts);
  return checkMode ? result.outputFiles[0].text : null;
}

async function buildESM() {
  // index.js is CJS (module.exports = registry). Bundling it directly as ESM yields
  // only a `default` export, not named exports. Generate a virtual ESM entry that
  // re-exports each key, then bundle that.
  const ta = require(ENTRY);
  const keys = Object.keys(ta);
  const lines = [
    `import __ta from ${JSON.stringify(ENTRY)};`,
    ...keys.map(k => `export const ${k} = __ta[${JSON.stringify(k)}];`),
    `export default __ta;`,
  ];
  const virtualEntry = lines.join('\n');

  const opts = {
    bundle: true,
    platform: 'browser',
    plugins: [stubMultiPlugin],
    banner: { js: '/* ta.js (c) Nino Kroesen. MIT License. */' },
    write: !checkMode,
    format: 'esm',
    minify: false,
    outfile: OUT_ESM,
    stdin: {
      contents: virtualEntry,
      resolveDir: ROOT,
      sourcefile: '_esm-entry-virtual.js',
      loader: 'js',
    },
  };
  if (checkMode) { delete opts.outfile; opts.write = false; }
  const result = await esbuild.build(opts);
  return checkMode ? result.outputFiles[0].text : null;
}

async function main() {
  if (checkMode) {
    console.log('Check mode — comparing in-memory build to disk');
    const [iife, esm] = await Promise.all([buildIIFE(), buildESM()]);
    const onDiskIIFE = fs.readFileSync(OUT_IIFE, 'utf8');
    const onDiskESM  = fs.readFileSync(OUT_ESM, 'utf8');
    let drift = false;
    if (iife !== onDiskIIFE) { console.error('DRIFT: ta.iife.min.js differs from build output'); drift = true; }
    if (esm  !== onDiskESM ) { console.error('DRIFT: ta.esm.js differs from build output');      drift = true; }
    if (drift) process.exit(1);
    console.log('OK — bundles match build output');
    return;
  }

  await Promise.all([buildIIFE(), buildESM()]);
  const iifeBytes = fs.statSync(OUT_IIFE).size;
  const esmBytes  = fs.statSync(OUT_ESM).size;
  console.log(`ta.iife.min.js  ${iifeBytes} bytes`);
  console.log(`ta.esm.js       ${esmBytes} bytes`);
}

main().catch(e => { console.error(e); process.exit(1); });
