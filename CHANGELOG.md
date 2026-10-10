# Changelog

All notable changes to ta.js are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Releases before 2.1.0 are described in the [GitHub releases](https://github.com/Bitvested/ta.js/releases).

## [2.1.0]

> ### ⚠️ Read this before upgrading
>
> **Four indicators return different numbers, and three of them return a different number of rows.** These are corrections — each was verified against the implementation it was ported from, and each fix has a test that fails against the old code — but nothing raises, so an existing pipeline will consume the new values silently.
>
> | function | what changed |
> |---|---|
> | `halftrend` | **row count**: `n - atrlen` → `n`. One row per input bar, so row `i` now covers bar `i`. It also returned *zero* trend changes on real data. |
> | `alligator`, `gator` | **row count**: `n - jl - js + 2` → `n`. Rows are now oldest-first and aligned to the input bars. |
> | `kama` | **row count** `n - len1` → `n - len1 + 1`, and **values**: the smoothing constant had lost its slow term, so every value was wrong. |
> | `er`, `ar`, `kelly` | **values for one-sided input**: a series with no losses (or no wins) returned `NaN` for `er`/`kelly`; it now returns the geometric mean of the side that exists, and a Kelly fraction of 1 / negative respectively. |
>
> If you index results by bar, or compare them against stored values, re-run before trusting them.

### Added

- **TypeScript declarations.** `index.d.ts` types all 144 exports plus the `aroon`, `random` and `multi` namespaces, and `package.json` points at it with `types`. Named imports, a default import and `require` are all typed. Row layouts differ per function group and a wrong order still compiles, so each group documents the layout it expects ([#21](https://github.com/Bitvested/ta.js/issues/21), [#26](https://github.com/Bitvested/ta.js/pull/26)).
- **`occ` — the Open Close Cross.** Moving averages of open and close on a chosen basis (`SMA`, `EMA`, `DEMA`, `TEMA`, `WMA`, `SMMA`, `HullMA`, `TMA`), delayed by a configurable number of bars, with the direction of each bar. Four of the Pine original's twelve basis types are absent: LSMA needs an offset parameter this library's `lsma` does not have, VWMA needs volume in the row, and ALMA and SSMA are not implemented here.

### Fixed

- **`kama` computed the wrong average entirely.** The smoothing constant dropped its slow term (`- 2/(len3+1) + 2/(len3+1)` cancelled, leaving `ER * fast`); the volatility window summed `len1-1` one-bar changes instead of `len1`, which let the efficiency ratio exceed 1 and divided by zero on flat input; the seed was the SMA of the *last* window rather than the first, so the opening value was computed from data at the end of the series; and the loop started one bar late. The recursion now matches tulind — the reference the benchmarks compare against — bit-identically on short, flat, trending and gapping series, and to 1.4e-14 on a 100k random walk. It is also ~2.5× faster, because the volatility sum is carried across bars instead of re-summed ([#22](https://github.com/Bitvested/ta.js/issues/22), [#27](https://github.com/Bitvested/ta.js/pull/27)).
- **`halftrend` never flipped.** The flip tests read `sma(...)[0]` — the SMA at the *start* of the window, roughly `atrlen` bars old — instead of at the current bar, so both conditions compared stale values and never fired: on 4901 bars of 5-minute data it produced zero trend changes. The extremes also came from the ATR window instead of `amplitude` bars, and the down-flip compared `close` with `<` where the Pine uses `>`. It now follows [everget's Pine](https://www.tradingview.com/script/U1SJ8ubc-HalfTrend/) line by line, and is 8-14× faster ([#28](https://github.com/Bitvested/ta.js/pull/28)).
- **`er` and `kelly` on a one-sided series.** A series with no losses evaluated the geometric mean of the losing side anyway, where `1 ** Infinity` is `NaN` in JS. An empty side carries weight zero, so it now contributes nothing: `kelly` returns 1 for an all-winning series and -1.0276 for an all-losing one. Mixed series are unchanged to the last bit ([#29](https://github.com/Bitvested/ta.js/pull/29)).
- **`alligator` / `gator` aligned to the input bars.** Both returned their rows newest-first and truncated, so the output could not be lined up with the input at all, and each line was displaced by `shift - 1` bars instead of `shift`. `gator`'s upper histogram also had the wrong sign.
- BLOG_CONTEXT.md and `.vscode/` are no longer shipped in the published tarball ([#30](https://github.com/Bitvested/ta.js/pull/30)).

### Changed

- Bundles regenerated (`ta.esm.js`, `ta.iife.min.js`) and the comparative benchmarks refreshed on the current code.
- README and package metadata rewritten for discovery: description, keywords, and a benchmark summary.

### Notes

- `ta.min.js` is a frozen legacy bundle, not a mirror of `src`: 22 of its own fixtures already disagree with `src` (including `atr`, `rsi`, `stoch`, `smma`) and 45 functions are absent. It is still referenced from the README's CDN section. Prefer `ta.iife.min.js`, which is generated from source and verified against it on every build.
- `atr` seeds Wilder smoothing from the first bar's high−low, where TradingView's `ta.atr` seeds with the mean of the first `length` true ranges. The difference is 5.5% at the first ATR bar and decays below float resolution after a few thousand bars, so it shifts `supertrend`, `keltner` and `natr` at the start of a chart only.
