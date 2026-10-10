# ta.js comparative benchmarks

Generated 2026-10-10T07:07:48.784Z.

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
| ta.js | 359.96 kops/s | 34.08 kops/s | 2.45 kops/s | ✓ |
| technicalindicators | 15.80 kops/s | 1.16 kops/s | 394 ops/s | ✓ |
| trading-signals | 40.74 kops/s | 4.11 kops/s | 395 ops/s | ✓ |
| @debut/indicators | 80.73 kops/s | 8.30 kops/s | 779 ops/s | ✓ |
| tulind | 13.14 kops/s | 1.32 kops/s | 130 ops/s | _reference_ |

## ema

_Exponential Moving Average (period=20)_

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 227.05 kops/s | 24.43 kops/s | 1.77 kops/s | ✗ max Δ 2.27e-1 |
| technicalindicators | 49.35 kops/s | 5.25 kops/s | 512 ops/s | ✗ max Δ 2.27e-1 |
| trading-signals | 159.44 kops/s | 17.21 kops/s | 1.48 kops/s | ✓ |
| @debut/indicators | 104.03 kops/s | 11.34 kops/s | 1.04 kops/s | ✗ max Δ 2.27e-1 |
| tulind | 12.97 kops/s | 1.30 kops/s | 128 ops/s | _reference_ |

## wma

_Linear Weighted Moving Average (period=20). debut.LWMA is semantically equivalent._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 92.41 kops/s | 9.82 kops/s | 897 ops/s | ✓ |
| technicalindicators | 10.78 kops/s | 795 ops/s | 47 ops/s | ✓ |
| trading-signals | 38.06 kops/s | 3.80 kops/s | 370 ops/s | ✓ |
| @debut/indicators | 35.91 kops/s | 3.65 kops/s | 355 ops/s | ✓ |
| tulind | 13.10 kops/s | 1.31 kops/s | 128 ops/s | _reference_ |

## smma

_Smoothed (Wilder's) Moving Average (period=20). ti.WEMA / ts.WSMA / debut.SMMA / tulind.wilders all compute Wilder smoothing._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 169.62 kops/s | 17.66 kops/s | 1.50 kops/s | ✓ |
| technicalindicators | 48.17 kops/s | 5.22 kops/s | 520 ops/s | ✓ |
| trading-signals | 32.84 kops/s | 3.33 kops/s | 323 ops/s | ✓ |
| @debut/indicators | 96.40 kops/s | 10.12 kops/s | 910 ops/s | ✓ |
| tulind | 13.06 kops/s | 1.32 kops/s | 130 ops/s | _reference_ |

## hull

_Hull Moving Average (period=20). ta.js + tulind only._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 36.40 kops/s | 4.58 kops/s | 402 ops/s | ✓ |
| tulind | 12.88 kops/s | 1.31 kops/s | 129 ops/s | _reference_ |

## kama

_Kaufman Adaptive Moving Average (er=10, fast=2, slow=30)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 213.58 kops/s | 24.27 kops/s | 1.93 kops/s | ✓ |
| tulind | 13.00 kops/s | 1.30 kops/s | 129 ops/s | _reference_ |

## vwma

_Volume Weighted Moving Average (period=20). ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 134.76 kops/s | 14.30 kops/s | 1.24 kops/s | ✓ |
| tulind | 9.44 kops/s | 944 ops/s | 96 ops/s | _reference_ |

## pwma

_Parabolic Weighted Moving Average (period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 39.65 kops/s | 4.01 kops/s | 381 ops/s | _reference_ |

## hwma

_Hyperbolic Weighted Moving Average (period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 38.92 kops/s | 3.89 kops/s | 373 ops/s | _reference_ |

## cwma

_Custom Weighted Moving Average (uniform weights, period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 40.38 kops/s | 4.04 kops/s | 386 ops/s | _reference_ |

## lsma

_Least Squares Moving Average (period=25). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 24.71 kops/s | 2.45 kops/s | 232 ops/s | _reference_ |

## vwwma

_Volume-Weighted WMA (period=20). Solo bench. ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 2.71 kops/s | 270 ops/s | 26 ops/s | _reference_ |

## wsma

_Wilder's SMA via the wsma alias (period=20). Solo bench (smma covers cross-lib)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 125.27 kops/s | 13.62 kops/s | 1.21 kops/s | _reference_ |

## dema

_Double EMA (period=20). 2·EMA − EMA(EMA)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 336.87 kops/s | 33.82 kops/s | 2.97 kops/s | ✗ max Δ 1.48e-1 |
| trading-signals | 130.91 kops/s | 14.77 kops/s | 1.31 kops/s | ✗ max Δ 6.94e-2 |
| tulind | 13.20 kops/s | 1.31 kops/s | 129 ops/s | _reference_ |

## tema

_Triple EMA (period=20). 3·EMA − 3·EMA(EMA) + EMA(EMA(EMA))._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 68.36 kops/s | 7.47 kops/s | 480 ops/s | ✗ max Δ 3.36e-1 |
| tulind | 13.54 kops/s | 1.30 kops/s | 130 ops/s | _reference_ |

## trima

_Triangular Moving Average (period=20). Double-smoothed SMA._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 145.50 kops/s | 16.67 kops/s | 1.12 kops/s | ✓ |
| tulind | 12.99 kops/s | 1.31 kops/s | 129 ops/s | _reference_ |

## t3

_T3 (Tilson, period=5, vfactor=0.7). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 34.33 kops/s | 3.83 kops/s | 255 ops/s | _reference_ |

## zlema

_Zero-Lag EMA (period=14). tulind streaming form._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 421.95 kops/s | 45.57 kops/s | 3.79 kops/s | ✗ max Δ 1.28e+0 |
| tulind | 12.79 kops/s | 1.29 kops/s | 129 ops/s | _reference_ |

## vidya

_Variable Index Dynamic Average (short=2, long=5, alpha=0.2)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 21.03 kops/s | 2.11 kops/s | 206 ops/s | ✓ |
| tulind | 12.89 kops/s | 1.27 kops/s | 128 ops/s | _reference_ |

## rsi

_Relative Strength Index (period=14, Wilder smoothing)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 152.91 kops/s | 16.43 kops/s | 1.33 kops/s | ✓ |
| technicalindicators | 7.74 kops/s | 782 ops/s | 78 ops/s | ✗ max Δ 5.00e-3 |
| trading-signals | 11.65 kops/s | 1.15 kops/s | 113 ops/s | ✓ |
| @debut/indicators | 37.96 kops/s | 3.87 kops/s | 370 ops/s | ✓ |
| tulind | 12.98 kops/s | 1.30 kops/s | 126 ops/s | _reference_ |

## macd

_MACD line (fast=12, slow=26). ta.js exposes only the line; we extract the line from others._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 79.51 kops/s | 8.81 kops/s | 660 ops/s | ✗ max Δ 1.75e-1 |
| technicalindicators | 11.53 kops/s | 1.08 kops/s | 119 ops/s | ✗ max Δ 1.75e-1 |
| trading-signals | 35.88 kops/s | 3.52 kops/s | 281 ops/s | ✗ max Δ 8.60e-2 |
| @debut/indicators | 36.27 kops/s | 3.81 kops/s | 299 ops/s | ✗ max Δ 1.75e-1 |
| tulind | 6.06 kops/s | 606 ops/s | 59 ops/s | _reference_ |

## atr

_Average True Range (period=14). Each lib gets bars in its native shape._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 152.51 kops/s | 16.53 kops/s | 1.36 kops/s | ✗ max Δ 1.47e-1 |
| technicalindicators | 18.12 kops/s | 1.97 kops/s | 197 ops/s | ✗ max Δ 3.32e-2 |
| trading-signals | 30.38 kops/s | 3.03 kops/s | 297 ops/s | ✓ |
| @debut/indicators | 105.83 kops/s | 11.73 kops/s | 976 ops/s | ✗ max Δ 3.32e-2 |
| tulind | 7.18 kops/s | 717 ops/s | 72 ops/s | _reference_ |

## roc

_Rate of Change (period=14, percent units after v2.0)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs technicalindicators |
|---|---:|---:|---:|---|
| ta.js | 132.19 kops/s | 14.22 kops/s | 1.24 kops/s | ✗ max Δ 1.00e+0 |
| technicalindicators | 13.11 kops/s | 1.24 kops/s | 100 ops/s | _reference_ |
| trading-signals | 37.62 kops/s | 3.67 kops/s | 365 ops/s | ✗ max Δ 6.16e+0 |
| @debut/indicators | 186.74 kops/s | 20.14 kops/s | 1.72 kops/s | ✓ |
| tulind | 13.37 kops/s | 1.33 kops/s | 128 ops/s | ✗ max Δ 6.16e+0 |

## psar

_Parabolic SAR (step=0.02, max=0.2). ta.js takes [[H, L], …]; competitor APIs vary._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 194.70 kops/s | 21.14 kops/s | 1.51 kops/s | ✓ |
| technicalindicators | 33.00 kops/s | 3.63 kops/s | 349 ops/s | ✓ |
| trading-signals | 62.65 kops/s | 6.43 kops/s | 563 ops/s | ✗ max Δ 2.01e+0 |
| @debut/indicators | 123.73 kops/s | 11.78 kops/s | 721 ops/s | ✗ max Δ 3.32e+0 |
| tulind | 9.37 kops/s | 930 ops/s | 92 ops/s | _reference_ |

## pr

_Williams %R (period=14). ta.js takes a close-only series; competitors take HLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 48.68 kops/s | 3.85 kops/s | 218 ops/s | ✗ max Δ 3.19e+1 |
| technicalindicators | 8.60 kops/s | 1.42 kops/s | 41 ops/s | ✓ |
| trading-signals | 23.39 kops/s | 1.29 kops/s | 116 ops/s | ✓ |
| tulind | 7.08 kops/s | 710 ops/s | 70 ops/s | _reference_ |

## mfi

_Money Flow Index (period=14). ta.js v2.0 takes [[H, L, C, V], …] — TA-Lib convention._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 167.65 kops/s | 19.05 kops/s | 888 ops/s | ✓ |
| technicalindicators | 4.94 kops/s | 502 ops/s | 28 ops/s | ✗ max Δ 5.00e-3 |
| @debut/indicators | 96.11 kops/s | 7.87 kops/s | 554 ops/s | ✓ |
| tulind | 5.85 kops/s | 579 ops/s | 58 ops/s | _reference_ |

## stoch

_Stochastic %K (length=14, smoothD=3, smoothK=3). Cross-lib comparison on the %K line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 55.10 kops/s | 4.87 kops/s | 309 ops/s | ✓ |
| technicalindicators | 6.54 kops/s | 640 ops/s | 32 ops/s | ✗ max Δ 4.13e+1 |
| trading-signals | 4.62 kops/s | 454 ops/s | 36 ops/s | ✓ |
| @debut/indicators | 35.24 kops/s | 3.23 kops/s | 246 ops/s | ✗ max Δ 4.13e+1 |
| tulind | 5.37 kops/s | 536 ops/s | 53 ops/s | _reference_ |

## obv

_On-Balance Volume. ta.js takes [[volume, close], …]; competitors take HLC+V or OHLCV._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 156.93 kops/s | 16.47 kops/s | 1.02 kops/s | ✓ |
| technicalindicators | 40.04 kops/s | 4.39 kops/s | 436 ops/s | ✓ |
| trading-signals | 23.08 kops/s | 3.08 kops/s | 294 ops/s | ✓ |
| tulind | 9.69 kops/s | 981 ops/s | 95 ops/s | _reference_ |

## mom

_Momentum (period=10). ta.js: data[i] − data[i − period]. Cross-checked vs tulind.mom._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 337.96 kops/s | 36.70 kops/s | 2.57 kops/s | ✗ max Δ 9.77e-1 |
| tulind | 13.36 kops/s | 1.33 kops/s | 132 ops/s | _reference_ |

## bop

_Balance of Power (period=14, SMA-smoothed). ta.js OHLC → tulind OHLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 151.48 kops/s | 18.77 kops/s | 692 ops/s | ✗ max Δ 1.07e+0 |
| tulind | 5.91 kops/s | 592 ops/s | 59 ops/s | _reference_ |

## fi

_Force Index (period=13). ta.js takes [[close, volume], …]; ti.ForceIndex takes parallel arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 31.03 kops/s | 3.14 kops/s | 311 ops/s | _reference_ |
| technicalindicators | 24.63 kops/s | 2.60 kops/s | 267 ops/s | ✗ max Δ 1.30e+5 |

## vwap

_Volume Weighted Average Price (full-window). ta.js single-window scalar series; ti.VWAP series._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 135.52 kops/s | 14.42 kops/s | 1.24 kops/s | _reference_ |
| technicalindicators | 34.93 kops/s | 4.27 kops/s | 404 ops/s | ✗ max Δ 1.72e+1 |

## kst

_Know Sure Thing (default Pring params). ta.js + ti only._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 19.65 kops/s | 2.11 kops/s | 164 ops/s | _reference_ |
| technicalindicators | 2.26 kops/s | 230 ops/s | 10 ops/s | ✗ max Δ 3.92e+1 |

## ichimoku

_Ichimoku Cloud (9/26/52/26). Cross-lib correctness compared on the Senkou A line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 8.27 kops/s | 376 ops/s | 34 ops/s | _reference_ |
| technicalindicators | 3.12 kops/s | 310 ops/s | 14 ops/s | ✗ max Δ 1.01e+2 |

## hv

_Historical Volatility (period=10). ta.js + tulind.volatility._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 290.22 kops/s | 33.92 kops/s | 2.15 kops/s | ✗ max Δ 1.33e+0 |
| tulind | 12.98 kops/s | 1.30 kops/s | 130 ops/s | _reference_ |

## cross

_Detect crossovers between two series (close vs SMA(20)). Output: count of crossings._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 490.20 kops/s | 42.52 kops/s | 3.06 kops/s | ✗ max Δ 2.00e+0 |
| tulind | 9.72 kops/s | 962 ops/s | 94 ops/s | _reference_ |

## aroon_up

_Aroon Up (period=10). Cross-checked vs tulind.aroon[1] (high line)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 110.42 kops/s | 11.41 kops/s | 855 ops/s | ✗ max Δ 1.00e+2 |
| tulind | 6.83 kops/s | 684 ops/s | 65 ops/s | _reference_ |

## aroon_down

_Aroon Down (period=10). Cross-checked vs tulind.aroon[0] (low line)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 103.68 kops/s | 11.31 kops/s | 849 ops/s | ✗ max Δ 1.00e+2 |
| tulind | 6.63 kops/s | 686 ops/s | 67 ops/s | _reference_ |

## aroon_osc

_Aroon Oscillator (period=10). Cross-checked vs tulind.aroonosc._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 38.26 kops/s | 4.88 kops/s | 365 ops/s | ✗ max Δ 1.09e+2 |
| tulind | 9.56 kops/s | 958 ops/s | 92 ops/s | _reference_ |

## supertrend

_SuperTrend bands (period=20, multiplier=3). ta.js outputs band pair; debut outputs full state._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 87.69 kops/s | 9.32 kops/s | 714 ops/s | _reference_ |
| @debut/indicators | 41.94 kops/s | 4.22 kops/s | 378 ops/s | ✗ max Δ 2.93e+0 |

## alligator

_Williams Alligator (default 13/8/5 jaw/teeth/lips). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 43.59 kops/s | 4.56 kops/s | 373 ops/s | _reference_ |

## halftrend

_HalfTrend (atr=14, amplitude=10, deviation=2). Solo bench. ta.js takes [[H, C, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 2.47 kops/s | 238 ops/s | 21 ops/s | _reference_ |

## zigzag

_ZigZag (perc=0.05) on close-only series. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 168.17 kops/s | 17.94 kops/s | 1.41 kops/s | _reference_ |

## elderray

_Elder Ray (period=13). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 42.89 kops/s | 4.55 kops/s | 242 ops/s | _reference_ |

## rvi

_Relative Vigor Index (period=10). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 16.46 kops/s | 1.67 kops/s | 163 ops/s | _reference_ |

## rvi_signal

_RVI signal smoother (over precomputed RVI series). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 280.90 kops/s | 33.46 kops/s | 2.22 kops/s | _reference_ |

## rsi_divergence

_RSI Divergence detection (period=14). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 74.71 kops/s | 8.23 kops/s | 490 ops/s | _reference_ |

## divergence

_Detect divergence between two series (close vs SMA(20)). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 263.70 kops/s | 29.04 kops/s | 1.17 kops/s | _reference_ |

## cop

_Coppock Curve (default 11/14/10). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 3.58 kops/s | 347 ops/s | 34 ops/s | _reference_ |

## asi

_Accumulative Swing Index. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 90.89 kops/s | 10.10 kops/s | 922 ops/s | _reference_ |

## tsi

_True Strength Index (long=25, short=13, signal=13). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 27.35 kops/s | 3.15 kops/s | 221 ops/s | _reference_ |

## bandwidth

_Bollinger Bandwidth (period=20, dev=2). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 113.63 kops/s | 13.09 kops/s | 707 ops/s | _reference_ |

## fractals

_Williams Fractals (price-mode). Solo bench. ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 90.82 kops/s | 8.36 kops/s | 489 ops/s | _reference_ |

## fib

_Fibonacci retracement levels (start, end). Solo bench (microbenchmark — single call returning 11 levels)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 76.03 Mops/s | 76.80 Mops/s | 73.42 Mops/s | _reference_ |

## wrsi

_Wilder RSI alias (period=14). Solo bench (rsi covers cross-lib)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 151.02 kops/s | 16.31 kops/s | 1.25 kops/s | _reference_ |

## trix

_TRIX — 1-day ROC of triple-smoothed EMA (period=20, percent units)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 61.90 kops/s | 6.72 kops/s | 429 ops/s | ✗ max Δ 3.43e-2 |
| technicalindicators | 8.20 kops/s | 844 ops/s | 84 ops/s | ✗ max Δ 3.43e-2 |
| tulind | 13.33 kops/s | 1.29 kops/s | 129 ops/s | _reference_ |

## adl

_Chaikin Accumulation/Distribution Line. ta.js takes [[H,C,L,V], …]; tulind exposes as ad._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 559.47 kops/s | 52.61 kops/s | 4.18 kops/s | ✓ |
| technicalindicators | 29.92 kops/s | 3.31 kops/s | 319 ops/s | ✓ |
| tulind | 5.93 kops/s | 577 ops/s | 58 ops/s | _reference_ |

## cci

_Commodity Channel Index (period=20). ta.js takes [[H,C,L], …]; competitors take HLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 34.30 kops/s | 4.10 kops/s | 311 ops/s | ✓ |
| technicalindicators | 2.01 kops/s | 174 ops/s | 15 ops/s | ✓ |
| trading-signals | 14.06 kops/s | 1.40 kops/s | 137 ops/s | ✓ |
| @debut/indicators | 19.22 kops/s | 1.54 kops/s | 139 ops/s | ✓ |
| tulind | 7.08 kops/s | 700 ops/s | 70 ops/s | _reference_ |

## pdm

_Wilder +DM (period=14). ta.js takes [[H,C,L], …]; tulind dm exposes parallel HL._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 203.48 kops/s | 20.50 kops/s | 1.80 kops/s | ✗ max Δ 4.39e+0 |
| tulind | 6.63 kops/s | 666 ops/s | 65 ops/s | _reference_ |

## mdm

_Wilder −DM (period=14)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 203.10 kops/s | 20.54 kops/s | 1.80 kops/s | ✗ max Δ 5.95e+0 |
| tulind | 6.66 kops/s | 663 ops/s | 65 ops/s | _reference_ |

## pdi

_+DI (period=14). Matches ti.ADX.pdi and debut.ADX.pdi._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 190.03 kops/s | 15.28 kops/s | 1.15 kops/s | ✗ max Δ 1.13e-1 |
| technicalindicators | 4.91 kops/s | 394 ops/s | 46 ops/s | ✗ max Δ 1.13e-1 |
| @debut/indicators | 24.41 kops/s | 2.45 kops/s | 245 ops/s | ✗ max Δ 1.13e-1 |
| tulind | 5.40 kops/s | 552 ops/s | 54 ops/s | _reference_ |

## mdi

_−DI (period=14). Matches ti.ADX.mdi and debut.ADX.mdi._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 184.33 kops/s | 13.68 kops/s | 1.13 kops/s | ✗ max Δ 1.71e-1 |
| technicalindicators | 5.21 kops/s | 403 ops/s | 46 ops/s | ✗ max Δ 1.22e-1 |
| @debut/indicators | 24.30 kops/s | 2.45 kops/s | 237 ops/s | ✗ max Δ 1.71e-1 |
| tulind | 5.51 kops/s | 548 ops/s | 52 ops/s | _reference_ |

## dx

_Directional Index (period=14)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 71.08 kops/s | 6.30 kops/s | 475 ops/s | ✗ max Δ 5.18e-1 |
| tulind | 6.95 kops/s | 720 ops/s | 70 ops/s | _reference_ |

## adx

_Wilder ADX (period=14). Matches ti.ADX.adx and debut.ADX.adx._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 54.26 kops/s | 4.86 kops/s | 379 ops/s | ✗ max Δ 2.24e-1 |
| technicalindicators | 5.13 kops/s | 541 ops/s | 45 ops/s | ✗ max Δ 2.24e-1 |
| trading-signals | 7.61 kops/s | 751 ops/s | 75 ops/s | ✓ |
| @debut/indicators | 23.84 kops/s | 2.48 kops/s | 237 ops/s | ✗ max Δ 2.24e-1 |
| tulind | 7.00 kops/s | 720 ops/s | 70 ops/s | _reference_ |

## adxr

_ADX Rating (period=14). adxr[i] = (adx[i] + adx[i − length + 1]) / 2._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 50.69 kops/s | 4.60 kops/s | 350 ops/s | ✗ max Δ 1.88e-1 |
| tulind | 7.22 kops/s | 697 ops/s | 70 ops/s | _reference_ |

## stoch_rsi

_Stochastic RSI (rsi=14, stoch=14, k=3, d=3). Cross-lib comparison on the smoothed K line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs technicalindicators |
|---|---:|---:|---:|---|
| ta.js | 30.30 kops/s | 2.60 kops/s | 149 ops/s | ✗ max Δ 6.08e-2 |
| technicalindicators | 2.78 kops/s | 282 ops/s | 16 ops/s | _reference_ |
| @debut/indicators | 15.10 kops/s | 1.46 kops/s | 128 ops/s | ✗ max Δ 6.08e-2 |

## ppo

_Percentage Price Oscillator (12, 26). 100·(EMA12 − EMA26)/EMA26._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 50.44 kops/s | 5.56 kops/s | 410 ops/s | ✗ max Δ 1.90e-1 |
| tulind | 12.87 kops/s | 1.29 kops/s | 129 ops/s | _reference_ |

## apo

_Absolute Price Oscillator (12, 26). EMA12 − EMA26._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 79.81 kops/s | 8.97 kops/s | 653 ops/s | ✗ max Δ 1.88e-1 |
| tulind | 13.00 kops/s | 1.31 kops/s | 130 ops/s | _reference_ |

## cmf

_Chaikin Money Flow (period=20). ta.js takes [[H, C, L, V], …]. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 129.00 kops/s | 13.21 kops/s | 1.09 kops/s | _reference_ |

## nvi

_Negative Volume Index. ta.js takes [[C, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 257.68 kops/s | 19.02 kops/s | 1.94 kops/s | ✓ |
| tulind | 9.44 kops/s | 951 ops/s | 95 ops/s | _reference_ |

## pvi

_Positive Volume Index. ta.js takes [[C, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 259.90 kops/s | 26.71 kops/s | 1.76 kops/s | ✓ |
| tulind | 9.49 kops/s | 956 ops/s | 95 ops/s | _reference_ |

## emv

_Ease of Movement (scale=10000). ta.js takes [[H, L, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 212.17 kops/s | 21.43 kops/s | 1.80 kops/s | ✓ |
| tulind | 7.31 kops/s | 721 ops/s | 73 ops/s | _reference_ |

## natr

_Normalized ATR (period=14). 100·ATR/Close._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 98.55 kops/s | 10.71 kops/s | 864 ops/s | ✗ max Δ 1.53e-1 |
| tulind | 7.18 kops/s | 720 ops/s | 72 ops/s | _reference_ |

## dpo

_Detrended Price Oscillator (period=21)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 247.25 kops/s | 27.24 kops/s | 1.69 kops/s | ✓ |
| tulind | 13.19 kops/s | 1.31 kops/s | 130 ops/s | _reference_ |

## mass

_Mass Index (length=25, EMA fixed at 9). ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 66.64 kops/s | 7.62 kops/s | 498 ops/s | ✗ max Δ 2.52e-2 |
| tulind | 9.22 kops/s | 913 ops/s | 90 ops/s | _reference_ |

## ulcer

_Ulcer Index (period=14). Drawdown-based volatility. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 85.80 kops/s | 8.30 kops/s | 496 ops/s | _reference_ |

## vortex

_Vortex Indicator (period=14). Solo bench. Output: [[VI+, VI−], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 103.28 kops/s | 10.84 kops/s | 599 ops/s | _reference_ |

## kdj

_KDJ (9, 3, 3). Solo bench. Output: [[K, D, J], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 45.44 kops/s | 4.00 kops/s | 271 ops/s | _reference_ |

## ao

_Awesome Oscillator (5/35 SMA on (H+L)/2). Each lib gets bars in its native shape._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 192.14 kops/s | 23.16 kops/s | 1.81 kops/s | ✗ max Δ 1.95e-1 |
| technicalindicators | 5.98 kops/s | 1.12 kops/s | 34 ops/s | ✗ max Δ 1.95e-1 |
| trading-signals | 14.31 kops/s | 1.42 kops/s | 139 ops/s | ✗ max Δ 1.95e-1 |
| @debut/indicators | 49.57 kops/s | 5.17 kops/s | 477 ops/s | ✗ max Δ 1.95e-1 |
| tulind | 9.38 kops/s | 929 ops/s | 90 ops/s | _reference_ |

## mom_osc

_Chande Momentum Oscillator (period=10). Cross-checked vs tulind.cmo._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 51.65 kops/s | 4.88 kops/s | 431 ops/s | ✓ |
| tulind | 13.11 kops/s | 1.31 kops/s | 130 ops/s | _reference_ |

## ac

_Williams Accelerator (5/34/5 default). ta.js + ts.AC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 41.28 kops/s | 3.77 kops/s | 257 ops/s | _reference_ |
| trading-signals | 8.25 kops/s | 816 ops/s | 79 ops/s | ✓ |

## chaikin_osc

_Chaikin Oscillator (3/10 EMAs over ADL). ta.js takes [[H, C, L, V]]; debut takes (h, l, c, v)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 67.79 kops/s | 7.54 kops/s | 562 ops/s | _reference_ |
| @debut/indicators | 50.96 kops/s | 5.49 kops/s | 513 ops/s | ✗ max Δ 1.12e+6 |

## fisher

_Fisher Transform (period=10). Cross-checked vs tulind.fisher (which takes H,L)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 44.35 kops/s | 4.26 kops/s | 324 ops/s | ✓ |
| tulind | 6.38 kops/s | 637 ops/s | 63 ops/s | _reference_ |

## gator

_Gator Oscillator (default 13/8/5 jaw/teeth/lips). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 43.95 kops/s | 5.02 kops/s | 396 ops/s | _reference_ |

## ult

_Ultimate Oscillator (7/14/28). ta.js takes [[H,C,L], …]; tulind takes parallel HLC arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 91.39 kops/s | 10.08 kops/s | 752 ops/s | ✓ |
| tulind | 7.00 kops/s | 686 ops/s | 68 ops/s | _reference_ |

## kvo

_Klinger Volume Oscillator (34, 55). ta.js takes [[H, C, L, V], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 235.82 kops/s | 23.91 kops/s | 1.39 kops/s | ✓ |
| tulind | 5.80 kops/s | 579 ops/s | 59 ops/s | _reference_ |

## bbands

_Bollinger Bands middle line (period=20, stdDev=2)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 197.18 kops/s | 22.38 kops/s | 1.15 kops/s | ✓ |
| technicalindicators | 2.28 kops/s | 236 ops/s | 13 ops/s | ✓ |
| trading-signals | 6.71 kops/s | 650 ops/s | 48 ops/s | ✓ |
| @debut/indicators | 38.44 kops/s | 3.84 kops/s | 359 ops/s | ✓ |
| tulind | 6.25 kops/s | 605 ops/s | 60 ops/s | _reference_ |

## keltner

_Keltner Channels (period=20, multiplier=1). Cross-checked vs ti.KeltnerChannels middle._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 58.02 kops/s | 6.18 kops/s | 405 ops/s | _reference_ |
| technicalindicators | 8.06 kops/s | 581 ops/s | 40 ops/s | ✗ max Δ 1.18e-1 |

## don

_Donchian Channels (period=20). Solo bench. ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 32.00 kops/s | 1.65 kops/s | 115 ops/s | _reference_ |

## fibbands

_Fibonacci Bands (period=20, dev=3). Solo bench. ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 15.03 kops/s | 1.48 kops/s | 139 ops/s | _reference_ |

## envelope

_Envelope (period=10, deviation=0.005). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 41.43 kops/s | 4.09 kops/s | 323 ops/s | _reference_ |

## std

_Rolling Standard Deviation (period=20). ta.js uses std_series for one-pass rolling computation._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 278.72 kops/s | 33.82 kops/s | 2.16 kops/s | ✓ |
| technicalindicators | 2.49 kops/s | 181 ops/s | 16 ops/s | ✓ |
| @debut/indicators | 99.67 kops/s | 10.71 kops/s | 938 ops/s | ✓ |
| tulind | 12.87 kops/s | 1.28 kops/s | 129 ops/s | _reference_ |

## cor

_Pearson Correlation (full-window scalar, two series). Solo bench — no competitor scalar API exposed at runtime._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 5.42 kops/s | 578 ops/s | 53 ops/s | _reference_ |

## recent_high

_Most-recent local high (lb=25). Returns a single {index, value} pivot. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 20.06 Mops/s | 19.03 Mops/s | 14.08 Mops/s | _reference_ |

## recent_low

_Most-recent local low (lb=25). Returns a single {index, value} pivot. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 27.28 Mops/s | 32.84 Mops/s | 25.23 Mops/s | _reference_ |

## lr_slope

_Linear regression slope (period=14). Matches tulind.linregslope._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 89.69 kops/s | 9.10 kops/s | 488 ops/s | ✓ |
| tulind | 13.04 kops/s | 1.31 kops/s | 129 ops/s | _reference_ |

## lr_intercept

_Linear regression intercept (period=14, b at x=0). Matches tulind.linregintercept._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 88.87 kops/s | 9.08 kops/s | 495 ops/s | ✓ |
| tulind | 13.09 kops/s | 1.30 kops/s | 129 ops/s | _reference_ |

## lr_angle

_Linear regression angle (period=14, atan(slope) in degrees). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 60.32 kops/s | 7.59 kops/s | 461 ops/s | _reference_ |

## tsf

_Time Series Forecast (period=14). lsma + slope. Matches tulind.tsf._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 87.75 kops/s | 8.95 kops/s | 493 ops/s | ✓ |
| tulind | 12.88 kops/s | 1.30 kops/s | 127 ops/s | _reference_ |

## ha

_Heikin-Ashi candles. Cross-lib correctness compared on HA close._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 122.55 kops/s | 13.05 kops/s | 936 ops/s | _reference_ |
| technicalindicators | 5.76 kops/s | 1.06 kops/s | 107 ops/s | ✓ |
| @debut/indicators | 143.75 kops/s | 14.55 kops/s | 1.11 kops/s | ✓ |

## ren

_Renko bricks (brickSize=1). ta.js outputs [[O,H,L,C], …]; ti.renko returns CandleList parallel arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 387.92 kops/s | 36.02 kops/s | 4.46 kops/s | _reference_ |
| technicalindicators | 11.60 kops/s | 2.15 kops/s | 359 ops/s | ✗ max Δ 1.26e+1 |
