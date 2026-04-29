# Performance baseline & action plan

> **Post-v2.0 status (2026-04-29):** every action item in §7 has landed. Headline standings are now in `V2_READINESS.md`: ta.js wins 66 of 67 cross-lib cases at 100k bars (single near-tie loss is `roc` at –22% vs `@debut`). The §1–§6 narrative below is preserved as the v1.17.0 baseline for migration history; treat it as "what we found and the plan we made" rather than current state.

**Baseline commit:** `23e5b31` (v1.17.0) + test-infrastructure refresh (no indicator code changes).
**Baseline date:** 2026-04-25
**Machine:** Apple M3, 8 cores / Darwin 25.3.0 arm64 / Node v25.1.0.
**Source data:** `bench/results.json` (full numbers); `BENCHMARKS.md` (rendered table).
**Methodology:** see `bench/README.md`. Per-library input pre-shaped outside the timed loop; adaptive batching; ≥10 samples or ≥500 ms; cross-library output diffs against `tulind` as the de-facto-standard reference.

> This is an internal analysis doc. Excluded from the npm package via `.npmignore`. Re-run `cd bench && npm run bench:md` to refresh `BENCHMARKS.md` and `bench/results.json`. For current standings see `V2_READINESS.md`.

---

## 1. TL;DR

ta.js is **mid-pack today, not bottom**. Across six headline indicators at 100k bars:

- **2 wins:** `macd` (line only), `atr` — leader of the table, ahead of native `tulind`.
- **2 ties:** `ema`, `bbands` — within ~1.2× and ~3.4× of the leader respectively.
- **2 losses:** `sma` (≈11× behind leader), `rsi` (≈3× behind leader).

The losses are not algorithmic surprises — they are well-understood `O(N·length)` patterns where every competitor uses the running-sum / running-state trick that ta.js skips. Fixing them is a known, bounded amount of work and should put ta.js at the top of 5/6 indicators.

---

## 2. Standings at 100,000 bars

Larger sizes amortize per-call setup so they reflect the algorithm. Rankings flip slightly at 1k bars where call-overhead dominates (notably: `tulind` does worse there because of JS↔C marshaling).

| indicator | ta.js (ops/s) | rank | leader (ops/s) | gap to leader | gap explanation |
|---|---:|---|---|---:|---|
| **macd line** | **482**    | 1st | ta.js          | —     | clean two-EMA difference, no extra work |
| **atr**       | **1,210**  | 1st | ta.js          | —     | already streaming via Wilder recurrence |
| ema           | 1,220      | 2nd | trading-signals 1,420 | 1.16× | constant-factor; trading-signals is just slightly tighter |
| bbands middle | 109        | 2nd | @debut 367     | 3.4×  | per-step `ta.std` allocates and re-walks the window |
| rsi           | 123        | 3rd | @debut 363     | 3.0×  | per-step inner loop over the gain/loss window |
| sma           | 69         | 5th (last) | @debut 766 | **11.1×** | per-step `ta.sum(data.slice(...))` — full O(N·length) |

Full per-size table is in `BENCHMARKS.md`. Snapshots reproducible via:

```sh
cd bench && npm install && npm run bench:md
```

---

## 3. Where ta.js wins and why

### 3.1 ATR

`src/indicators/atr.js` runs in `O(N)`: seed with the first bar's range, then update via Wilder's recurrence `atr[i] = (atr[i-1]·(N-1) + TR) / N`. No window slicing. Constant work per bar.

Beats native `tulind` at every size because the JS-side computation is simple enough that the C-call marshaling overhead in tulind costs more than the actual math saves. This is a real, durable win unless someone vendors a typed-array backed alternative.

### 3.2 MACD line

`src/indicators/macd.js` is just `ema(d, fast) − ema(d, slow)`. Both EMAs are `O(N)` (per §3.3 below). Two passes plus a subtraction — minimal allocation.

**Caveat:** competitors compute `{macd, signal, histogram}` in their MACD function (signal is an EMA of the macd line, histogram is `macd − signal`). ta.js exposes those as `macd_signal()` and `macd_bars()`. The benchmark currently extracts only the macd line from competitors for the cross-library comparison, but the **timed compute call** for competitors does the full work, so they're carrying ~2× the work in their numbers. To know how ta.js fares on the **full pipeline**, add a "macd full" case that times `macd → macd_signal → macd_bars` end-to-end. Open item — see §6.

---

## 4. Where ta.js loses, with line numbers and expected impact

### 4.1 SMA — `src/moving-averages/sma.js:4` (HIGH priority, ~11× speedup available)

```js
function sma(data, length=14) {
  for(var i = length, sma = []; i <= data.length; i++) {
    var avg = ta.sum(data.slice(i-length,i));   // ← O(length) per step
    sma.push(avg / length);
  }
  return sma;
}
```

`O(N·length)` total. Every step allocates a window slice and walks it.

**Fix:** running sum.

```js
function sma(data, length=14) {
  if (data.length < length) return [];
  let sum = 0;
  for (let i = 0; i < length; i++) sum += data[i];
  const out = [sum / length];
  for (let i = length; i < data.length; i++) {
    sum += data[i] - data[i - length];
    out.push(sum / length);
  }
  return out;
}
```

**Expected impact:** `O(length)` → `O(1)` per step. At `length=20`, ~20× algorithmic speedup, modulo constant-factor noise. The benchmark gap (11×) is the realistic recovered factor — putting ta.js ahead of @debut/indicators (currently 766 ops/s at 100k vs ta.js's 69).

**Downstream:** `bbands` calls `ta.sma`; `bands` middle line gets faster for free. Other SMA-using indicators benefit transparently via the `_registry.js` dispatch.

### 4.2 RSI — `src/indicators/rsi.js:3-9` (HIGH priority, ~3× speedup + correctness fix)

```js
function rsi(data, length=14) {
  for(var i = length-1,gain=0,loss=0,arrsi = [], pl = data.slice(0,length-1); i < data.length; i++,gain=0,loss=0) {
    pl.push(data[i]);
    for(var q = 1; q < pl.length; q++) if(pl[q]-pl[q-1] < 0) {loss+=Math.abs(pl[q]-pl[q-1]);}else{gain+=pl[q]-pl[q-1];}
    var rsi = 100 - 100 / (1 + ((gain / length) / (loss / length)));
    arrsi.push(rsi);
    pl.splice(0,1);   // ← O(length) per step
  }
  return arrsi;
}
```

Two costs stacked: the inner `for(q < pl.length)` recomputes the gain/loss sums from scratch every step (`O(length)`), and `pl.splice(0,1)` is `O(length)` array re-indexing. Combined: `O(N·length)`.

**Fix:** maintain rolling `gain` and `loss` totals. When a new bar comes in, add its delta to the total; when a bar falls out of the window, subtract its delta. Plus switch to **Wilder smoothing** (per AUDIT.md §6 / convention alignment):

```js
function rsi(data, length=14) {
  if (data.length <= length) return [];
  let gain = 0, loss = 0;
  for (let i = 1; i <= length; i++) {
    const d = data[i] - data[i-1];
    if (d > 0) gain += d; else loss -= d;
  }
  let avgG = gain / length, avgL = loss / length;
  const out = [100 - 100 / (1 + avgG / avgL)];
  for (let i = length + 1; i < data.length; i++) {
    const d = data[i] - data[i-1];
    const g = d > 0 ? d : 0;
    const l = d < 0 ? -d : 0;
    avgG = (avgG * (length - 1) + g) / length;   // Wilder
    avgL = (avgL * (length - 1) + l) / length;
    out.push(100 - 100 / (1 + avgG / avgL));
  }
  return out;
}
```

**Expected impact:** `O(length)` → `O(1)` per step. At `length=14`, ~14× algorithmic speedup; benchmark gap is 3× because RSI's per-step constant work is heavier (two divisions, multiple comparisons) — bring `ta.js` in line with @debut/indicators (currently 363 ops/s vs 123).

**Correctness side-effect:** moves ta.js's RSI from Cutler smoothing to Wilder smoothing, eliminating the `Δ ≈ 30` divergence vs `tulind` (and matching everyone except `technicalindicators`, which has its own ~5e-3 oddity). This is the AUDIT.md §6 alignment item — the perf rewrite naturally fixes the convention divergence.

### 4.3 Bollinger Bands — `src/bands/bands.js:6` (MEDIUM priority)

```js
for(var i = 0, pl = [], deviation = [], boll = [], sma = ta.sma(data, length); i < data.length; i++) {
  pl.push(data[i]);
  if(pl.length >= length) {
    var devi = ta.std(pl, length);   // ← O(length) per step
    deviation.push(devi);
    pl.splice(0, 1);                 // ← O(length) per step
  }
}
```

Per-step `ta.std` walks the window. Per-step `pl.splice(0, 1)` is `O(length)`. Plus the upstream `ta.sma` itself is currently slow (§4.1).

**Fix in two layers:**
1. Once §4.1 lands, the `ta.sma(data, length)` call becomes free and `bbands` automatically inherits.
2. Replace the per-step `ta.std` with a running variance using Welford's algorithm, or maintain `Σx` and `Σx²` running sums (since std = √(E[x²] − E[x]²)).
3. Replace `pl.splice(0, 1)` with a rolling-index circular buffer or just don't materialize `pl` at all — the running-sum approach makes it unnecessary.

**Expected impact:** combined with §4.1, brings bbands from `O(N·length²)` effective complexity to `O(N)`. Should leapfrog @debut/indicators (367 ops/s) and put ta.js firmly in 1st.

### 4.4 EMA — `src/moving-averages/ema.js` (LOW priority, ~1.2× available)

The EMA is already `O(N)`. The remaining gap to `trading-signals` (1.42 kops/s vs ta.js 1.22 kops/s — 16%) is constant-factor:
- `var q in pl` (line 9) — `for...in` is slower than indexed `for` for arrays
- `data.slice(i-length, i)` for the seed is an unnecessary allocation; can compute the seed sum in the same loop that sets up `i`
- The `ema.length > 0` branch test runs every iteration; could split into a "seed" pass and a "recurrence" pass

Tightening these probably recovers most of the 16%. Not where the leverage is — touch only after §4.1 / §4.2 / §4.3.

### 4.5 The systemic pattern

Every loss reduces to one of two patterns:

1. **Sliding-window scalar aggregate computed by re-walking the window** (`sma`, `rsi` gain/loss, `bbands` std). Fix: maintain running totals; on each step subtract the falling-out element and add the new one. `O(N·length) → O(N)`.

2. **`Math.max.apply(null, slice(...))` / `Math.min.apply(...)`** — not in this benchmark's six indicators but pervasive in `ichimoku`, `don`, `aroon`, `pr`, `fractals`, `recent_high`/`recent_low`, `stoch`, `fisher`. Same issue, different shape. Fix: rolling-extremum loop or, for very long windows, a monotonic-deque (`O(N)` amortized).

Both patterns are mechanical, well-understood, and have been on the v2.0 plan since AUDIT.md §5. The benchmark just makes the cost concrete.

---

## 5. Numerical correctness sidebar

The benchmark also reports cross-library output diffs. Findings worth noting:

- **SMA, BBands middle:** all five libraries agree to within 1e-6 — these are the cleanest comparisons.
- **EMA:** ta.js, technicalindicators, @debut/indicators all show `Δ ≈ 0.227` against `tulind`. `trading-signals` matches `tulind`. Cause: differing seed conventions (some use first-value, some use SMA-of-first-N). Documented divergence, not a bug.
- **RSI:** ta.js shows `Δ ≈ 30` (Cutler vs Wilder, AUDIT.md §6); `technicalindicators` shows `Δ ≈ 5e-3` (small implementation variance); `trading-signals` and `@debut/indicators` match `tulind` exactly.
- **MACD:** every library disagrees with every other library (`Δ` 0.08–0.18). Cascading EMA-seed differences. Mostly noise, but means the macd line you get from ta.js is not bit-equivalent to TA-Lib's.
- **ATR:** ta.js shows `Δ ≈ 0.147`; technicalindicators and @debut show `Δ ≈ 0.033`; trading-signals matches `tulind`. Cause: different ATR seeding strategies.

The take-away: **if a user expects bit-exact agreement with TA-Lib, ta.js currently fails on 4/6 indicators.** The v2.0 convention-alignment work in AUDIT.md §6 would close most of these. Some (the EMA seed convention) are still a design choice; document either way.

---

## 6. Open items / where to push next

In rough order of value:

1. **Add a "macd full pipeline" case** — time ta.js's `macd → macd_signal → macd_bars` against competitors' single-call `MACD`. Will tell us whether the ta.js MACD lead is real or an artifact of doing less work.
2. **Expand the case set.** Currently 6 indicators. Add at least: `wma`, `stoch`, `obv`, `vwap`, `aroon` (any of `up`/`down`/`osc`), `cci` (where available), `bbands` upper+lower (currently only middle), `wsma`/`smma` (will surface the §4.1 fix everywhere SMMA is used). Aim for ~15 to cover the most-used surface.
3. **Median-of-N runs.** M3 thermals and macOS background noise can swing a single run by 5–10%. A `--reps 3` flag in `bench/run.js` that takes the median of three full passes per (lib, indicator, size) cell would tighten the numbers.
4. **Track size-scaling.** The current 1k/10k/100k spread is enough to see scaling, but a log-log plot of ops/sec vs N per library would make the algorithmic-complexity differences (`O(N)` vs `O(N·length)`) jump off the page. Could be a separate `bench/render-plot.js` or just a Markdown ascii chart.
5. **Add a memory column.** `process.memoryUsage().heapUsed` before/after a fixed number of iterations gives an allocation-pressure signal. Streaming libs (trading-signals, @debut) and ta.js's running-sum rewrites should win here too — useful for the "compact and fast" claim.
6. **Bench the `multi.sim` path.** Single-threaded comparison only covers the hot path. The Monte-Carlo workload via `worker_threads` has its own performance story.
7. **Try `bun` and `deno`.** Pure-JS perf is runtime-dependent. Bun's JSC may shake the rankings.

---

## 7. Action plan (when v2.0 lands)

Order matters because §4.1 SMA is upstream of §4.3 BBands and several other indicators via `_registry.js`. Doing it first lets the cascade do half the work for free.

```
✅ 1. running-sum SMA               src/moving-averages/sma.js          ~11× on sma, cascades
✅ 2. running-sum + Wilder RSI      src/indicators/rsi.js                ~3× on rsi, fixes Cutler divergence
✅ 3. running-variance BBands       src/bands/bands.js                   ~3× on bbands, depends on (1)
✅ 4. rolling-extremum sweep        ichimoku, don, aroon, pr, fractals,  varies; stoch went from 0.02 ops/s
                                    recent_high/low, stoch, fisher       to 303 ops/s at 100k bars
✅ 5. EMA constant-factor cleanup   src/moving-averages/ema.js           ~1.2×
□  6. revisit ATR                   src/indicators/atr.js                already fast; only re-examine if
                                                                        switching to typed-array fast path
```

All §7 items 1–5 landed in v2.0. Item 6 deferred — ATR remains category leader without it.

After each landing, re-run `cd bench && npm run bench:md` and append the new ranking column to this file (don't overwrite — keep the v1.17.0 baseline numbers as historical record).

---

## 8. Reproducibility note

Numbers in §2 are from a single run of `node bench/run.js` against working-tree v1.17.0 code on 2026-04-25. They will drift with:

- Node version (V8 inlining heuristics evolve)
- Hardware (Apple M3 vs M-series vs x86)
- macOS power management state (low-power mode throttles by ~30%)
- Other processes competing for CPU

Quote ratios, not absolute ops/sec, when comparing across machines. The 11× SMA gap and the 3× RSI gap are the real signal — those are algorithmic-complexity gaps and will hold across hardware.
