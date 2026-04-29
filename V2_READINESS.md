# ta.js v2.0 — Performance & Readiness Analysis

_Generated 2026-04-29 from `bench/results.json` (67 cross-lib cases × 3 sizes × 5 libs)._

Companion to `BENCHMARKS.md` (raw per-case tables) and `bench/COVERAGE.md` (function-level coverage matrix).

## Headline numbers

Cross-library standings at **100k bars** — the algorithm-dominant size where JS↔C marshaling and constant factors stop dominating.

- **ta.js wins outright on 66 of 67 cross-lib indicators** (98.5%)
- **One loss**: `roc` — rank 2/5, 22% behind `@debut/indicators` (1.24 kops/s vs 1.59 kops/s)
- Median ratio (ta.js ops / leader ops) at 100k: **1.00** — the median case is a ta.js win
- Geometric mean across all 67 cases at 100k: **1.00** of the leader's throughput

| Tier | Count | Examples |
|---|---:|---|
| 1st place | 66 | `sma`, `ema`, `rsi`, `macd`, `bbands`, `atr`, `stoch`, `ao`, `hv`, `vwap`, `std`, `cci`, `adx`, … |
| Within 30% of leader | 1 | `roc` (78% of leader) |
| 3-6× behind leader | 0 | — |
| Catastrophic | 0 | — |

Every blocker the prior readiness analysis flagged is resolved. Tag `v2.0.0` is unblocked from a performance standpoint.

## What changed since the v1.17.0 baseline

The four cases that the v1 bench flagged as "fixable algorithmic gaps" have been rewritten with running-state patterns. Per-step work moved from `O(length)` to `O(1)` amortized.

| Indicator | v1.17.0 (pre-fix) | v2.0 (post-fix) | Speedup | New rank |
|---|---:|---:|---:|---|
| `stoch`  | 0.02 ops/s (rank 5/5) | **303 ops/s (rank 1/5)** | ≈ 15,000× | leads `@debut` 241 by 1.26× |
| `ao`     | 85 ops/s (rank 4/5)   | **1,820 ops/s (rank 1/5)** | ≈ 21× | leads `@debut` 485 by 3.75× |
| `hv`     | 30 ops/s (rank 2/2)   | **2,010 ops/s (rank 1/2)** | ≈ 67× | leads `tulind` 132 by 15× |
| `vwap`   | 93 ops/s (rank 2/2)   | **1,220 ops/s (rank 1/2)** | ≈ 13× | leads `ti` 400 by 3.05× |
| `std`    | 264 ops/s (rank 2/4)  | **2,340 ops/s (rank 1/4)** via `std_series` | ≈ 8.9× | leads `@debut` 939 by 2.5× |

### How each fix works

- **`stoch`** — monotonic `Int32Array` deques for rolling high/low + `Float64Array` ring buffers for `smoothk` and `smoothd` running sums. Replaces the cubic-time nested-`splice` + per-iter `ta.sma()` over a growing array.
- **`ao`** — pre-computes `(H+L)/2` once into a `Float64Array`, then maintains two running sums (fast and slow) updated in O(1) per step. Replaces per-iter `ta.sma()` over a 35-bar window.
- **`hv`** — Welford-style running `sumX` / `sumX²`. Variance is `E[X²] − E[X]²`. Replaces per-iter `ta.ssd()` calls.
- **`vwap`** — running `sumPV` / `sumV` updated in O(1) per step. Replaces naive `slice(i-length, i)` window walks.
- **`std_series`** — companion API to scalar `std()`. Same running sum-of-squares pattern; closes the structural gap to streaming-class libs (Debut, TS) by giving the user a sliding API when they need one.

## The 66 wins, by margin over second-place at 100k

| Lead | Indicators |
|---|---|
| **>20× faster** | `cross` 32×, `zlema` 29×, `pdm` 28×, `mdm` 27×, `emv` 24×, `pvi` 22×, `kvo` 22×, `nvi` 21× |
| **10-20× faster** | `mom` 15×, `hv` 15×, `kst` 15×, `vwma` 13×, plus the rest of the directional-movement family |
| **5-10× faster** | `aroon_*`, `bop`, `ren`, `keltner`, `kama`, `fisher`, `rsi`, `bbands`, … |
| **1-5× faster** | the long tail (`sma`, `ema`, `wma`, `obv`, `mfi`, `atr`, `ha`, `fi`, `chaikin_osc`, …) — all #1 |

**Every indicator a TA library is judged on — SMA, EMA, RSI, MACD, BBands, ATR, Stoch — ta.js is first**, often by 2-3× over the next-best and ~10× over `tulind` (native C bindings) once JS↔C marshaling is amortized.

## The single remaining loss

| Indicator | Gap | Root cause |
|---|---|---|
| `roc` | 22% behind `@debut` (1.24 vs 1.59 kops/s @ 100k) | `@debut.ROC` is a streaming-class implementation with a slightly tighter inner loop. Constant-factor, not algorithmic. |

Not a v2.0 blocker. Acceptable v2.0 → v2.0.x carryover; the gap is small enough that VM-level constant-factor cleanup (avoid the spread for the n-period lookback, inline the divide) would likely close it.

## V2 readiness verdict

**Ready to ship.**

| Dimension | Status |
|---|---|
| Correctness (`docs/audit-v1.17.0.md` surface) | ✅ All formula bugs, mutations, and convention deviations fixed; 159 tests pass, 0 skipped |
| Headline-function performance | ✅ Every "people actually use this" indicator ranks #1 with meaningful margins |
| API conventions | ✅ Aligned with TA-Lib (Wilder RSI, percent ROC, OHLC+V MFI, abs-side ATR, normalized shape for atr/smma/fisher) |
| Bench coverage | 67 cross-lib cases tracked across SMA/EMA/RSI/MACD/BBands/ATR plus the new ADX, CCI, TRIX, KDJ, Vortex, Ulcer, … |
| Headline competitive position | ✅ 66 of 67 wins; one near-tie loss |
| Previously-broken `stoch` | ✅ Fixed; now leads at every size |
| Previously-trailing `ao`/`hv`/`vwap`/`std` | ✅ Fixed; now leading their respective categories |

## Where ta.js stands relative to the field

| vs | Verdict |
|---|---|
| **`technicalindicators`** (most-installed by download count) | ta.js wins decisively across every shared case. TI's API is convenient but the implementations are unoptimized. |
| **`tulind`** (native libtulipindicators bindings) | ta.js wins every head-to-head at 100k. JS↔C marshaling overhead consistently overwhelms tulind's native math advantage. **ta.js is genuinely faster than C bindings here**, which is the strongest signal. |
| **`@debut/indicators`** (~20 indicators, streaming-class design) | ta.js wins every shared case at 100k except `roc` (–22%). The previous-version structural disadvantages on `stoch` / `ao` / `std` are gone. |
| **`trading-signals` v7** | ta.js wins every shared case at 100k. |

## Net read

v2.0 has earned the "fastest pure-JS TA library" claim by a wide margin: 66/67 cross-lib wins at 100k bars, with the lone exception (`roc`) within 22% of the leader. The previous-version blockers (`stoch`, `ao`, `hv`, `vwap`) are not just fixed — they're now category leaders, several by 10-20× margins.

The bench surface (67 cases) is broad enough that any future regression will surface immediately. This is a durable position, not a one-time benchmark stunt.

## Reproducing this analysis

```sh
cd bench
npm install
npm run bench:md         # writes BENCHMARKS.md (raw tables) + bench/results.json
npm run bench:coverage:write   # writes COVERAGE.md (matrix view)
```

Numbers are machine-specific (Apple M3 / macOS Darwin 25.3.0 arm64 / Node v25.1.0). Re-run on the target machine before quoting.
