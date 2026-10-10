# ta.js comparative benchmarks

Generated 2026-10-10T09:09:55.157Z.

- Node: `v25.9.0`
- OS:   `Darwin 25.6.0 / arm64`
- CPU:  `Apple M3` (8 cores)

## Library versions
| library | version |
|---|---|
| ta.js | 2.0.0 |
| technicalindicators | 3.1.0 |
| trading-signals | 7.4.3 |
| @debut/indicators | 1.3.22 |
| tulind | 0.8.20 |

## sma

_Simple Moving Average (period=20)_

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 370.02 kops/s | 34.44 kops/s | 2.20 kops/s | ✓ |
| technicalindicators | 15.65 kops/s | 4.07 kops/s | 387 ops/s | ✓ |
| trading-signals | 41.72 kops/s | 4.16 kops/s | 396 ops/s | ✓ |
| @debut/indicators | 81.48 kops/s | 8.53 kops/s | 783 ops/s | ✓ |
| tulind | 13.31 kops/s | 1.32 kops/s | 131 ops/s | _reference_ |

## ema

_Exponential Moving Average (period=20)_

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 229.12 kops/s | 24.51 kops/s | 1.95 kops/s | ✗ max Δ 2.27e-1 |
| technicalindicators | 50.31 kops/s | 5.22 kops/s | 536 ops/s | ✗ max Δ 2.27e-1 |
| trading-signals | 160.27 kops/s | 17.14 kops/s | 1.48 kops/s | ✓ |
| @debut/indicators | 104.76 kops/s | 11.49 kops/s | 1.04 kops/s | ✗ max Δ 2.27e-1 |
| tulind | 13.07 kops/s | 1.32 kops/s | 130 ops/s | _reference_ |

## wma

_Linear Weighted Moving Average (period=20). debut.LWMA is semantically equivalent._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 92.31 kops/s | 9.91 kops/s | 893 ops/s | ✓ |
| technicalindicators | 8.30 kops/s | 617 ops/s | 47 ops/s | ✓ |
| trading-signals | 38.22 kops/s | 3.81 kops/s | 371 ops/s | ✓ |
| @debut/indicators | 36.62 kops/s | 3.65 kops/s | 353 ops/s | ✓ |
| tulind | 13.26 kops/s | 1.32 kops/s | 129 ops/s | _reference_ |

## smma

_Smoothed (Wilder's) Moving Average (period=20). ti.WEMA / ts.WSMA / debut.SMMA / tulind.wilders all compute Wilder smoothing._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 169.37 kops/s | 17.71 kops/s | 1.52 kops/s | ✓ |
| technicalindicators | 49.71 kops/s | 5.24 kops/s | 540 ops/s | ✓ |
| trading-signals | 33.12 kops/s | 3.31 kops/s | 322 ops/s | ✓ |
| @debut/indicators | 96.52 kops/s | 9.96 kops/s | 909 ops/s | ✓ |
| tulind | 13.14 kops/s | 1.32 kops/s | 130 ops/s | _reference_ |

## hull

_Hull Moving Average (period=20). ta.js + tulind only._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 36.47 kops/s | 4.61 kops/s | 400 ops/s | ✓ |
| tulind | 13.12 kops/s | 1.27 kops/s | 130 ops/s | _reference_ |

## kama

_Kaufman Adaptive Moving Average (er=10, fast=2, slow=30)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 213.45 kops/s | 23.83 kops/s | 1.75 kops/s | ✓ |
| tulind | 13.04 kops/s | 1.32 kops/s | 128 ops/s | _reference_ |

## vwma

_Volume Weighted Moving Average (period=20). ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 134.41 kops/s | 14.09 kops/s | 1.21 kops/s | ✓ |
| tulind | 9.12 kops/s | 936 ops/s | 94 ops/s | _reference_ |

## pwma

_Parabolic Weighted Moving Average (period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 38.72 kops/s | 3.94 kops/s | 380 ops/s | _reference_ |

## hwma

_Hyperbolic Weighted Moving Average (period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 38.98 kops/s | 4.02 kops/s | 352 ops/s | _reference_ |

## cwma

_Custom Weighted Moving Average (uniform weights, period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 38.89 kops/s | 4.09 kops/s | 381 ops/s | _reference_ |

## lsma

_Least Squares Moving Average (period=25). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 25.12 kops/s | 2.47 kops/s | 237 ops/s | _reference_ |

## vwwma

_Volume-Weighted WMA (period=20). Solo bench. ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 2.71 kops/s | 266 ops/s | 25 ops/s | _reference_ |

## wsma

_Wilder's SMA via the wsma alias (period=20). Solo bench (smma covers cross-lib)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 126.52 kops/s | 13.66 kops/s | 1.22 kops/s | _reference_ |

## dema

_Double EMA (period=20). 2·EMA − EMA(EMA)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 333.26 kops/s | 33.85 kops/s | 2.98 kops/s | ✗ max Δ 1.48e-1 |
| trading-signals | 135.21 kops/s | 14.91 kops/s | 1.24 kops/s | ✗ max Δ 6.94e-2 |
| tulind | 13.34 kops/s | 1.32 kops/s | 129 ops/s | _reference_ |

## tema

_Triple EMA (period=20). 3·EMA − 3·EMA(EMA) + EMA(EMA(EMA))._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 68.28 kops/s | 7.40 kops/s | 549 ops/s | ✗ max Δ 3.36e-1 |
| tulind | 13.36 kops/s | 1.32 kops/s | 129 ops/s | _reference_ |

## trima

_Triangular Moving Average (period=20). Double-smoothed SMA._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 146.27 kops/s | 17.10 kops/s | 942 ops/s | ✓ |
| tulind | 13.20 kops/s | 1.30 kops/s | 129 ops/s | _reference_ |

## t3

_T3 (Tilson, period=5, vfactor=0.7). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 34.68 kops/s | 3.86 kops/s | 277 ops/s | _reference_ |

## zlema

_Zero-Lag EMA (period=14). tulind streaming form._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 435.52 kops/s | 46.02 kops/s | 3.87 kops/s | ✗ max Δ 1.28e+0 |
| tulind | 12.88 kops/s | 1.29 kops/s | 129 ops/s | _reference_ |

## vidya

_Variable Index Dynamic Average (short=2, long=5, alpha=0.2)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 20.48 kops/s | 2.06 kops/s | 200 ops/s | ✓ |
| tulind | 12.97 kops/s | 1.29 kops/s | 128 ops/s | _reference_ |

## rsi

_Relative Strength Index (period=14, Wilder smoothing)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 153.37 kops/s | 16.43 kops/s | 1.35 kops/s | ✓ |
| technicalindicators | 7.80 kops/s | 782 ops/s | 78 ops/s | ✗ max Δ 5.00e-3 |
| trading-signals | 12.03 kops/s | 1.15 kops/s | 114 ops/s | ✓ |
| @debut/indicators | 38.69 kops/s | 3.80 kops/s | 365 ops/s | ✓ |
| tulind | 13.20 kops/s | 1.31 kops/s | 130 ops/s | _reference_ |

## macd

_MACD line (fast=12, slow=26). ta.js exposes only the line; we extract the line from others._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 80.44 kops/s | 9.01 kops/s | 642 ops/s | ✗ max Δ 1.75e-1 |
| technicalindicators | 12.22 kops/s | 1.32 kops/s | 122 ops/s | ✗ max Δ 1.75e-1 |
| trading-signals | 36.34 kops/s | 3.62 kops/s | 340 ops/s | ✗ max Δ 8.60e-2 |
| @debut/indicators | 36.57 kops/s | 3.80 kops/s | 315 ops/s | ✗ max Δ 1.75e-1 |
| tulind | 6.19 kops/s | 617 ops/s | 60 ops/s | _reference_ |

## atr

_Average True Range (period=14). Each lib gets bars in its native shape._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 155.35 kops/s | 16.58 kops/s | 1.43 kops/s | ✗ max Δ 1.47e-1 |
| technicalindicators | 18.20 kops/s | 2.00 kops/s | 198 ops/s | ✗ max Δ 3.32e-2 |
| trading-signals | 31.35 kops/s | 3.17 kops/s | 308 ops/s | ✓ |
| @debut/indicators | 108.42 kops/s | 11.71 kops/s | 982 ops/s | ✗ max Δ 3.32e-2 |
| tulind | 7.17 kops/s | 728 ops/s | 72 ops/s | _reference_ |

## roc

_Rate of Change (period=14, percent units after v2.0)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs technicalindicators |
|---|---:|---:|---:|---|
| ta.js | 131.35 kops/s | 14.24 kops/s | 1.26 kops/s | ✗ max Δ 1.00e+0 |
| technicalindicators | 28.60 kops/s | 1.15 kops/s | 101 ops/s | _reference_ |
| trading-signals | 38.00 kops/s | 3.81 kops/s | 367 ops/s | ✗ max Δ 6.16e+0 |
| @debut/indicators | 185.60 kops/s | 20.34 kops/s | 1.69 kops/s | ✓ |
| tulind | 13.42 kops/s | 1.34 kops/s | 132 ops/s | ✗ max Δ 6.16e+0 |

## psar

_Parabolic SAR (step=0.02, max=0.2). ta.js takes [[H, L], …]; competitor APIs vary._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 196.94 kops/s | 21.57 kops/s | 1.46 kops/s | ✓ |
| technicalindicators | 33.00 kops/s | 3.65 kops/s | 357 ops/s | ✓ |
| trading-signals | 64.31 kops/s | 6.47 kops/s | 585 ops/s | ✗ max Δ 2.01e+0 |
| @debut/indicators | 123.29 kops/s | 11.83 kops/s | 734 ops/s | ✗ max Δ 3.32e+0 |
| tulind | 9.36 kops/s | 922 ops/s | 92 ops/s | _reference_ |

## pr

_Williams %R (period=14). ta.js takes a close-only series; competitors take HLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 48.91 kops/s | 3.28 kops/s | 223 ops/s | ✗ max Δ 3.19e+1 |
| technicalindicators | 6.56 kops/s | 1.46 kops/s | 43 ops/s | ✓ |
| trading-signals | 22.53 kops/s | 1.39 kops/s | 68 ops/s | ✓ |
| tulind | 7.19 kops/s | 709 ops/s | 59 ops/s | _reference_ |

## mfi

_Money Flow Index (period=14). ta.js v2.0 takes [[H, L, C, V], …] — TA-Lib convention._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 163.00 kops/s | 18.80 kops/s | 916 ops/s | ✓ |
| technicalindicators | 4.94 kops/s | 507 ops/s | 30 ops/s | ✗ max Δ 5.00e-3 |
| @debut/indicators | 99.38 kops/s | 8.45 kops/s | 550 ops/s | ✓ |
| tulind | 5.68 kops/s | 590 ops/s | 58 ops/s | _reference_ |

## stoch

_Stochastic %K (length=14, smoothD=3, smoothK=3). Cross-lib comparison on the %K line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 54.83 kops/s | 4.86 kops/s | 267 ops/s | ✓ |
| technicalindicators | 6.46 kops/s | 634 ops/s | 33 ops/s | ✗ max Δ 4.13e+1 |
| trading-signals | 4.59 kops/s | 452 ops/s | 33 ops/s | ✓ |
| @debut/indicators | 35.35 kops/s | 3.21 kops/s | 237 ops/s | ✗ max Δ 4.13e+1 |
| tulind | 5.44 kops/s | 526 ops/s | 50 ops/s | _reference_ |

## obv

_On-Balance Volume. ta.js takes [[volume, close], …]; competitors take HLC+V or OHLCV._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 158.25 kops/s | 16.70 kops/s | 994 ops/s | ✓ |
| technicalindicators | 39.90 kops/s | 4.36 kops/s | 435 ops/s | ✓ |
| trading-signals | 22.99 kops/s | 3.12 kops/s | 296 ops/s | ✓ |
| tulind | 9.75 kops/s | 963 ops/s | 96 ops/s | _reference_ |

## mom

_Momentum (period=10). ta.js: data[i] − data[i − period]. Cross-checked vs tulind.mom._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 341.20 kops/s | 36.81 kops/s | 2.24 kops/s | ✗ max Δ 9.77e-1 |
| tulind | 13.36 kops/s | 1.35 kops/s | 133 ops/s | _reference_ |

## bop

_Balance of Power (period=14, SMA-smoothed). ta.js OHLC → tulind OHLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 145.78 kops/s | 17.34 kops/s | 675 ops/s | ✗ max Δ 1.07e+0 |
| tulind | 5.95 kops/s | 568 ops/s | 57 ops/s | _reference_ |

## fi

_Force Index (period=13). ta.js takes [[close, volume], …]; ti.ForceIndex takes parallel arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 30.13 kops/s | 3.17 kops/s | 302 ops/s | _reference_ |
| technicalindicators | 24.64 kops/s | 2.76 kops/s | 264 ops/s | ✗ max Δ 1.30e+5 |

## vwap

_Volume Weighted Average Price (full-window). ta.js single-window scalar series; ti.VWAP series._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 135.92 kops/s | 14.47 kops/s | 1.23 kops/s | _reference_ |
| technicalindicators | 35.61 kops/s | 4.16 kops/s | 392 ops/s | ✗ max Δ 1.72e+1 |

## kst

_Know Sure Thing (default Pring params). ta.js + ti only._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 19.14 kops/s | 2.05 kops/s | 162 ops/s | _reference_ |
| technicalindicators | 2.29 kops/s | 232 ops/s | 11 ops/s | ✗ max Δ 3.92e+1 |

## ichimoku

_Ichimoku Cloud (9/26/52/26). Cross-lib correctness compared on the Senkou A line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 8.22 kops/s | 374 ops/s | 34 ops/s | _reference_ |
| technicalindicators | 3.06 kops/s | 308 ops/s | 15 ops/s | ✗ max Δ 1.01e+2 |

## hv

_Historical Volatility (period=10). ta.js + tulind.volatility._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 288.63 kops/s | 33.68 kops/s | 2.08 kops/s | ✗ max Δ 1.33e+0 |
| tulind | 12.97 kops/s | 1.30 kops/s | 128 ops/s | _reference_ |

## cross

_Detect crossovers between two series (close vs SMA(20)). Output: count of crossings._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 488.64 kops/s | 43.99 kops/s | 3.17 kops/s | ✗ max Δ 2.00e+0 |
| tulind | 9.77 kops/s | 959 ops/s | 95 ops/s | _reference_ |

## aroon_up

_Aroon Up (period=10). Cross-checked vs tulind.aroon[1] (high line)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 112.06 kops/s | 11.57 kops/s | 874 ops/s | ✗ max Δ 1.00e+2 |
| tulind | 6.80 kops/s | 682 ops/s | 65 ops/s | _reference_ |

## aroon_down

_Aroon Down (period=10). Cross-checked vs tulind.aroon[0] (low line)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 108.14 kops/s | 11.31 kops/s | 868 ops/s | ✗ max Δ 1.00e+2 |
| tulind | 6.78 kops/s | 683 ops/s | 66 ops/s | _reference_ |

## aroon_osc

_Aroon Oscillator (period=10). Cross-checked vs tulind.aroonosc._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 37.49 kops/s | 4.65 kops/s | 357 ops/s | ✗ max Δ 1.09e+2 |
| tulind | 9.35 kops/s | 948 ops/s | 93 ops/s | _reference_ |

## supertrend

_SuperTrend bands (period=20, multiplier=3). ta.js outputs band pair; debut outputs full state._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 87.73 kops/s | 9.30 kops/s | 736 ops/s | _reference_ |
| @debut/indicators | 42.30 kops/s | 4.23 kops/s | 313 ops/s | ✗ max Δ 2.93e+0 |

## alligator

_Williams Alligator (default 13/8/5 jaw/teeth/lips). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 38.35 kops/s | 4.05 kops/s | 335 ops/s | _reference_ |

## halftrend

_HalfTrend (atr=14, amplitude=10, deviation=2). Solo bench. ta.js takes [[H, C, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 32.69 kops/s | 2.48 kops/s | 168 ops/s | _reference_ |

## zigzag

_ZigZag (perc=0.05) on close-only series. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 166.09 kops/s | 17.88 kops/s | 1.40 kops/s | _reference_ |

## elderray

_Elder Ray (period=13). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 43.11 kops/s | 4.71 kops/s | 248 ops/s | _reference_ |

## rvi

_Relative Vigor Index (period=10). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 16.71 kops/s | 1.65 kops/s | 159 ops/s | _reference_ |

## rvi_signal

_RVI signal smoother (over precomputed RVI series). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 285.84 kops/s | 33.44 kops/s | 2.20 kops/s | _reference_ |

## rsi_divergence

_RSI Divergence detection (period=14). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 76.46 kops/s | 8.36 kops/s | 490 ops/s | _reference_ |

## divergence

_Detect divergence between two series (close vs SMA(20)). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 264.02 kops/s | 29.46 kops/s | 1.16 kops/s | _reference_ |

## cop

_Coppock Curve (default 11/14/10). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 3.56 kops/s | 345 ops/s | 34 ops/s | _reference_ |

## asi

_Accumulative Swing Index. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 97.34 kops/s | 10.36 kops/s | 918 ops/s | _reference_ |

## tsi

_True Strength Index (long=25, short=13, signal=13). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 26.79 kops/s | 3.10 kops/s | 220 ops/s | _reference_ |

## bandwidth

_Bollinger Bandwidth (period=20, dev=2). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 114.28 kops/s | 13.02 kops/s | 905 ops/s | _reference_ |

## fractals

_Williams Fractals (price-mode). Solo bench. ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 91.09 kops/s | 8.27 kops/s | 489 ops/s | _reference_ |

## fib

_Fibonacci retracement levels (start, end). Solo bench (microbenchmark — single call returning 11 levels)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 74.82 Mops/s | 74.69 Mops/s | 73.71 Mops/s | _reference_ |

## wrsi

_Wilder RSI alias (period=14). Solo bench (rsi covers cross-lib)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 152.21 kops/s | 16.44 kops/s | 1.24 kops/s | _reference_ |

## trix

_TRIX — 1-day ROC of triple-smoothed EMA (period=20, percent units)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 62.11 kops/s | 6.79 kops/s | 495 ops/s | ✗ max Δ 3.43e-2 |
| technicalindicators | 8.15 kops/s | 858 ops/s | 84 ops/s | ✗ max Δ 3.43e-2 |
| tulind | 13.52 kops/s | 1.30 kops/s | 125 ops/s | _reference_ |

## adl

_Chaikin Accumulation/Distribution Line. ta.js takes [[H,C,L,V], …]; tulind exposes as ad._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 560.93 kops/s | 46.85 kops/s | 3.90 kops/s | ✓ |
| technicalindicators | 29.92 kops/s | 3.24 kops/s | 321 ops/s | ✓ |
| tulind | 5.86 kops/s | 601 ops/s | 59 ops/s | _reference_ |

## cci

_Commodity Channel Index (period=20). ta.js takes [[H,C,L], …]; competitors take HLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 34.35 kops/s | 4.00 kops/s | 312 ops/s | ✓ |
| technicalindicators | 1.99 kops/s | 266 ops/s | 16 ops/s | ✓ |
| trading-signals | 13.94 kops/s | 1.40 kops/s | 139 ops/s | ✓ |
| @debut/indicators | 19.13 kops/s | 1.55 kops/s | 138 ops/s | ✓ |
| tulind | 7.07 kops/s | 696 ops/s | 68 ops/s | _reference_ |

## pdm

_Wilder +DM (period=14). ta.js takes [[H,C,L], …]; tulind dm exposes parallel HL._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 206.29 kops/s | 20.82 kops/s | 1.75 kops/s | ✗ max Δ 4.39e+0 |
| tulind | 6.69 kops/s | 677 ops/s | 64 ops/s | _reference_ |

## mdm

_Wilder −DM (period=14)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 204.05 kops/s | 20.74 kops/s | 1.86 kops/s | ✗ max Δ 5.95e+0 |
| tulind | 6.69 kops/s | 671 ops/s | 65 ops/s | _reference_ |

## pdi

_+DI (period=14). Matches ti.ADX.pdi and debut.ADX.pdi._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 186.96 kops/s | 16.03 kops/s | 1.13 kops/s | ✗ max Δ 1.13e-1 |
| technicalindicators | 5.28 kops/s | 558 ops/s | 48 ops/s | ✗ max Δ 1.13e-1 |
| @debut/indicators | 24.55 kops/s | 2.38 kops/s | 230 ops/s | ✗ max Δ 1.13e-1 |
| tulind | 5.49 kops/s | 530 ops/s | 54 ops/s | _reference_ |

## mdi

_−DI (period=14). Matches ti.ADX.mdi and debut.ADX.mdi._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 183.66 kops/s | 13.59 kops/s | 1.16 kops/s | ✗ max Δ 1.71e-1 |
| technicalindicators | 5.38 kops/s | 422 ops/s | 47 ops/s | ✗ max Δ 1.22e-1 |
| @debut/indicators | 23.36 kops/s | 2.44 kops/s | 230 ops/s | ✗ max Δ 1.71e-1 |
| tulind | 5.28 kops/s | 549 ops/s | 51 ops/s | _reference_ |

## dx

_Directional Index (period=14)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 71.25 kops/s | 6.18 kops/s | 472 ops/s | ✗ max Δ 5.18e-1 |
| tulind | 7.23 kops/s | 726 ops/s | 71 ops/s | _reference_ |

## adx

_Wilder ADX (period=14). Matches ti.ADX.adx and debut.ADX.adx._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 51.43 kops/s | 4.81 kops/s | 374 ops/s | ✗ max Δ 2.24e-1 |
| technicalindicators | 5.35 kops/s | 549 ops/s | 47 ops/s | ✗ max Δ 2.24e-1 |
| trading-signals | 7.61 kops/s | 771 ops/s | 76 ops/s | ✓ |
| @debut/indicators | 23.84 kops/s | 2.39 kops/s | 239 ops/s | ✗ max Δ 2.24e-1 |
| tulind | 7.25 kops/s | 703 ops/s | 70 ops/s | _reference_ |

## adxr

_ADX Rating (period=14). adxr[i] = (adx[i] + adx[i − length + 1]) / 2._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 50.30 kops/s | 4.56 kops/s | 351 ops/s | ✗ max Δ 1.88e-1 |
| tulind | 7.27 kops/s | 721 ops/s | 69 ops/s | _reference_ |

## stoch_rsi

_Stochastic RSI (rsi=14, stoch=14, k=3, d=3). Cross-lib comparison on the smoothed K line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs technicalindicators |
|---|---:|---:|---:|---|
| ta.js | 30.53 kops/s | 2.25 kops/s | 150 ops/s | ✗ max Δ 6.08e-2 |
| technicalindicators | 2.90 kops/s | 295 ops/s | 16 ops/s | _reference_ |
| @debut/indicators | 15.01 kops/s | 1.48 kops/s | 131 ops/s | ✗ max Δ 6.08e-2 |

## ppo

_Percentage Price Oscillator (12, 26). 100·(EMA12 − EMA26)/EMA26._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 49.91 kops/s | 5.52 kops/s | 385 ops/s | ✗ max Δ 1.90e-1 |
| tulind | 12.94 kops/s | 1.29 kops/s | 130 ops/s | _reference_ |

## apo

_Absolute Price Oscillator (12, 26). EMA12 − EMA26._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 80.30 kops/s | 9.07 kops/s | 654 ops/s | ✗ max Δ 1.88e-1 |
| tulind | 13.07 kops/s | 1.27 kops/s | 130 ops/s | _reference_ |

## cmf

_Chaikin Money Flow (period=20). ta.js takes [[H, C, L, V], …]. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 130.11 kops/s | 13.44 kops/s | 1.07 kops/s | _reference_ |

## nvi

_Negative Volume Index. ta.js takes [[C, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 263.76 kops/s | 26.04 kops/s | 2.14 kops/s | ✓ |
| tulind | 9.54 kops/s | 954 ops/s | 91 ops/s | _reference_ |

## pvi

_Positive Volume Index. ta.js takes [[C, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 241.01 kops/s | 24.13 kops/s | 1.76 kops/s | ✓ |
| tulind | 9.51 kops/s | 961 ops/s | 92 ops/s | _reference_ |

## emv

_Ease of Movement (scale=10000). ta.js takes [[H, L, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 213.45 kops/s | 21.44 kops/s | 1.79 kops/s | ✓ |
| tulind | 7.22 kops/s | 712 ops/s | 74 ops/s | _reference_ |

## natr

_Normalized ATR (period=14). 100·ATR/Close._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 98.24 kops/s | 10.77 kops/s | 853 ops/s | ✗ max Δ 1.53e-1 |
| tulind | 7.24 kops/s | 713 ops/s | 70 ops/s | _reference_ |

## dpo

_Detrended Price Oscillator (period=21)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 247.69 kops/s | 26.26 kops/s | 1.69 kops/s | ✓ |
| tulind | 13.06 kops/s | 1.28 kops/s | 130 ops/s | _reference_ |

## mass

_Mass Index (length=25, EMA fixed at 9). ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 68.16 kops/s | 7.70 kops/s | 537 ops/s | ✗ max Δ 2.52e-2 |
| tulind | 8.90 kops/s | 913 ops/s | 89 ops/s | _reference_ |

## ulcer

_Ulcer Index (period=14). Drawdown-based volatility. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 83.77 kops/s | 8.30 kops/s | 501 ops/s | _reference_ |

## vortex

_Vortex Indicator (period=14). Solo bench. Output: [[VI+, VI−], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 102.13 kops/s | 10.77 kops/s | 790 ops/s | _reference_ |

## kdj

_KDJ (9, 3, 3). Solo bench. Output: [[K, D, J], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 45.69 kops/s | 4.13 kops/s | 273 ops/s | _reference_ |

## ao

_Awesome Oscillator (5/35 SMA on (H+L)/2). Each lib gets bars in its native shape._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 196.89 kops/s | 23.00 kops/s | 1.59 kops/s | ✗ max Δ 1.95e-1 |
| technicalindicators | 11.73 kops/s | 1.13 kops/s | 35 ops/s | ✗ max Δ 1.95e-1 |
| trading-signals | 13.73 kops/s | 1.42 kops/s | 138 ops/s | ✗ max Δ 1.95e-1 |
| @debut/indicators | 47.62 kops/s | 4.93 kops/s | 489 ops/s | ✗ max Δ 1.95e-1 |
| tulind | 9.07 kops/s | 877 ops/s | 89 ops/s | _reference_ |

## mom_osc

_Chande Momentum Oscillator (period=10). Cross-checked vs tulind.cmo._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 51.82 kops/s | 4.77 kops/s | 423 ops/s | ✓ |
| tulind | 13.07 kops/s | 1.29 kops/s | 129 ops/s | _reference_ |

## ac

_Williams Accelerator (5/34/5 default). ta.js + ts.AC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 41.63 kops/s | 3.93 kops/s | 259 ops/s | _reference_ |
| trading-signals | 7.92 kops/s | 776 ops/s | 75 ops/s | ✓ |

## chaikin_osc

_Chaikin Oscillator (3/10 EMAs over ADL). ta.js takes [[H, C, L, V]]; debut takes (h, l, c, v)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 67.91 kops/s | 7.41 kops/s | 562 ops/s | _reference_ |
| @debut/indicators | 50.64 kops/s | 5.39 kops/s | 508 ops/s | ✗ max Δ 1.12e+6 |

## fisher

_Fisher Transform (period=10). Cross-checked vs tulind.fisher (which takes H,L)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 44.00 kops/s | 5.56 kops/s | 356 ops/s | ✓ |
| tulind | 6.28 kops/s | 608 ops/s | 60 ops/s | _reference_ |

## gator

_Gator Oscillator (default 13/8/5 jaw/teeth/lips). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 27.26 kops/s | 2.97 kops/s | 247 ops/s | _reference_ |

## ult

_Ultimate Oscillator (7/14/28). ta.js takes [[H,C,L], …]; tulind takes parallel HLC arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 87.57 kops/s | 10.01 kops/s | 732 ops/s | ✓ |
| tulind | 6.84 kops/s | 685 ops/s | 66 ops/s | _reference_ |

## kvo

_Klinger Volume Oscillator (34, 55). ta.js takes [[H, C, L, V], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 235.98 kops/s | 23.48 kops/s | 1.36 kops/s | ✓ |
| tulind | 5.70 kops/s | 586 ops/s | 58 ops/s | _reference_ |

## bbands

_Bollinger Bands middle line (period=20, stdDev=2)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 196.16 kops/s | 22.37 kops/s | 1.14 kops/s | ✓ |
| technicalindicators | 2.33 kops/s | 156 ops/s | 14 ops/s | ✓ |
| trading-signals | 6.73 kops/s | 653 ops/s | 47 ops/s | ✓ |
| @debut/indicators | 39.49 kops/s | 4.00 kops/s | 366 ops/s | ✓ |
| tulind | 6.04 kops/s | 593 ops/s | 58 ops/s | _reference_ |

## keltner

_Keltner Channels (period=20, multiplier=1). Cross-checked vs ti.KeltnerChannels middle._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 60.22 kops/s | 6.73 kops/s | 405 ops/s | _reference_ |
| technicalindicators | 8.84 kops/s | 587 ops/s | 44 ops/s | ✗ max Δ 1.18e-1 |

## don

_Donchian Channels (period=20). Solo bench. ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 31.69 kops/s | 1.36 kops/s | 114 ops/s | _reference_ |

## fibbands

_Fibonacci Bands (period=20, dev=3). Solo bench. ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 14.59 kops/s | 1.51 kops/s | 136 ops/s | _reference_ |

## envelope

_Envelope (period=10, deviation=0.005). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 41.06 kops/s | 4.13 kops/s | 326 ops/s | _reference_ |

## std

_Rolling Standard Deviation (period=20). ta.js uses std_series for one-pass rolling computation._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 283.62 kops/s | 33.29 kops/s | 2.09 kops/s | ✓ |
| technicalindicators | 2.52 kops/s | 189 ops/s | 17 ops/s | ✓ |
| @debut/indicators | 98.61 kops/s | 10.47 kops/s | 964 ops/s | ✓ |
| tulind | 12.69 kops/s | 1.29 kops/s | 125 ops/s | _reference_ |

## cor

_Pearson Correlation (full-window scalar, two series). Solo bench — no competitor scalar API exposed at runtime._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 5.19 kops/s | 551 ops/s | 52 ops/s | _reference_ |

## recent_high

_Most-recent local high (lb=25). Returns a single {index, value} pivot. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 20.15 Mops/s | 19.10 Mops/s | 14.22 Mops/s | _reference_ |

## recent_low

_Most-recent local low (lb=25). Returns a single {index, value} pivot. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 26.75 Mops/s | 31.95 Mops/s | 24.86 Mops/s | _reference_ |

## lr_slope

_Linear regression slope (period=14). Matches tulind.linregslope._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 88.17 kops/s | 9.17 kops/s | 587 ops/s | ✓ |
| tulind | 12.91 kops/s | 1.22 kops/s | 125 ops/s | _reference_ |

## lr_intercept

_Linear regression intercept (period=14, b at x=0). Matches tulind.linregintercept._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 90.09 kops/s | 9.09 kops/s | 494 ops/s | ✓ |
| tulind | 12.60 kops/s | 1.25 kops/s | 122 ops/s | _reference_ |

## lr_angle

_Linear regression angle (period=14, atan(slope) in degrees). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 70.09 kops/s | 7.55 kops/s | 458 ops/s | _reference_ |

## tsf

_Time Series Forecast (period=14). lsma + slope. Matches tulind.tsf._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 87.51 kops/s | 8.91 kops/s | 504 ops/s | ✓ |
| tulind | 12.54 kops/s | 1.25 kops/s | 126 ops/s | _reference_ |

## ha

_Heikin-Ashi candles. Cross-lib correctness compared on HA close._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 120.70 kops/s | 12.55 kops/s | 1.01 kops/s | _reference_ |
| technicalindicators | 5.70 kops/s | 1.06 kops/s | 109 ops/s | ✓ |
| @debut/indicators | 143.79 kops/s | 14.59 kops/s | 805 ops/s | ✓ |

## ren

_Renko bricks (brickSize=1). ta.js outputs [[O,H,L,C], …]; ti.renko returns CandleList parallel arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 369.54 kops/s | 29.35 kops/s | 3.68 kops/s | _reference_ |
| technicalindicators | 11.05 kops/s | 2.07 kops/s | 352 ops/s | ✗ max Δ 1.26e+1 |
