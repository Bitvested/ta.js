# ta.js comparative benchmarks

Generated 2026-04-29T18:10:55.040Z.

- Node: `v25.1.0`
- OS:   `Darwin 25.3.0 / arm64`
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
| ta.js | 379.78 kops/s | 36.19 kops/s | 2.29 kops/s | ✓ |
| technicalindicators | 16.35 kops/s | 1.39 kops/s | 396 ops/s | ✓ |
| trading-signals | 41.35 kops/s | 4.16 kops/s | 396 ops/s | ✓ |
| @debut/indicators | 84.50 kops/s | 8.52 kops/s | 779 ops/s | ✓ |
| tulind | 13.73 kops/s | 1.36 kops/s | 135 ops/s | _reference_ |

## ema

_Exponential Moving Average (period=20)_

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 241.39 kops/s | 26.11 kops/s | 1.87 kops/s | ✗ max Δ 2.27e-1 |
| technicalindicators | 49.22 kops/s | 5.40 kops/s | 532 ops/s | ✗ max Δ 2.27e-1 |
| trading-signals | 185.93 kops/s | 17.73 kops/s | 1.48 kops/s | ✓ |
| @debut/indicators | 106.03 kops/s | 11.56 kops/s | 1.01 kops/s | ✗ max Δ 2.27e-1 |
| tulind | 13.36 kops/s | 1.34 kops/s | 133 ops/s | _reference_ |

## wma

_Linear Weighted Moving Average (period=20). debut.LWMA is semantically equivalent._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 92.84 kops/s | 9.90 kops/s | 893 ops/s | ✓ |
| technicalindicators | 10.76 kops/s | 1.78 kops/s | 48 ops/s | ✓ |
| trading-signals | 38.39 kops/s | 3.89 kops/s | 370 ops/s | ✓ |
| @debut/indicators | 36.46 kops/s | 3.69 kops/s | 355 ops/s | ✓ |
| tulind | 13.47 kops/s | 1.34 kops/s | 133 ops/s | _reference_ |

## smma

_Smoothed (Wilder's) Moving Average (period=20). ti.WEMA / ts.WSMA / debut.SMMA / tulind.wilders all compute Wilder smoothing._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 180.42 kops/s | 18.86 kops/s | 1.53 kops/s | ✓ |
| technicalindicators | 49.67 kops/s | 5.28 kops/s | 537 ops/s | ✓ |
| trading-signals | 32.93 kops/s | 3.34 kops/s | 325 ops/s | ✓ |
| @debut/indicators | 96.69 kops/s | 10.13 kops/s | 935 ops/s | ✓ |
| tulind | 13.50 kops/s | 1.33 kops/s | 135 ops/s | _reference_ |

## hull

_Hull Moving Average (period=20). ta.js + tulind only._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 36.56 kops/s | 4.60 kops/s | 399 ops/s | ✓ |
| tulind | 13.40 kops/s | 1.34 kops/s | 132 ops/s | _reference_ |

## kama

_Kaufman Adaptive Moving Average (er=10, fast=2, slow=30)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 85.74 kops/s | 9.46 kops/s | 766 ops/s | ✗ max Δ 3.01e+1 |
| tulind | 13.37 kops/s | 1.34 kops/s | 132 ops/s | _reference_ |

## vwma

_Volume Weighted Moving Average (period=20). ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 138.10 kops/s | 14.69 kops/s | 1.25 kops/s | ✓ |
| tulind | 9.78 kops/s | 988 ops/s | 98 ops/s | _reference_ |

## pwma

_Parabolic Weighted Moving Average (period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 39.59 kops/s | 4.07 kops/s | 386 ops/s | _reference_ |

## hwma

_Hyperbolic Weighted Moving Average (period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 39.19 kops/s | 4.05 kops/s | 382 ops/s | _reference_ |

## cwma

_Custom Weighted Moving Average (uniform weights, period=20). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 40.77 kops/s | 4.10 kops/s | 387 ops/s | _reference_ |

## lsma

_Least Squares Moving Average (period=25). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 25.17 kops/s | 2.49 kops/s | 240 ops/s | _reference_ |

## vwwma

_Volume-Weighted WMA (period=20). Solo bench. ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 3.09 kops/s | 306 ops/s | 30 ops/s | _reference_ |

## wsma

_Wilder's SMA via the wsma alias (period=20). Solo bench (smma covers cross-lib)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 128.90 kops/s | 13.97 kops/s | 1.23 kops/s | _reference_ |

## dema

_Double EMA (period=20). 2·EMA − EMA(EMA)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 351.12 kops/s | 35.31 kops/s | 2.98 kops/s | ✗ max Δ 1.48e-1 |
| trading-signals | 137.26 kops/s | 15.06 kops/s | 1.22 kops/s | ✗ max Δ 6.94e-2 |
| tulind | 13.80 kops/s | 1.36 kops/s | 133 ops/s | _reference_ |

## tema

_Triple EMA (period=20). 3·EMA − 3·EMA(EMA) + EMA(EMA(EMA))._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 69.19 kops/s | 7.56 kops/s | 479 ops/s | ✗ max Δ 3.36e-1 |
| tulind | 13.79 kops/s | 1.36 kops/s | 135 ops/s | _reference_ |

## trima

_Triangular Moving Average (period=20). Double-smoothed SMA._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 150.51 kops/s | 17.53 kops/s | 904 ops/s | ✓ |
| tulind | 13.58 kops/s | 1.35 kops/s | 135 ops/s | _reference_ |

## t3

_T3 (Tilson, period=5, vfactor=0.7). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 35.40 kops/s | 3.92 kops/s | 258 ops/s | _reference_ |

## zlema

_Zero-Lag EMA (period=14). tulind streaming form._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 440.28 kops/s | 46.16 kops/s | 3.90 kops/s | ✗ max Δ 1.28e+0 |
| tulind | 13.53 kops/s | 1.36 kops/s | 135 ops/s | _reference_ |

## vidya

_Variable Index Dynamic Average (short=2, long=5, alpha=0.2)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 20.66 kops/s | 2.06 kops/s | 200 ops/s | ✓ |
| tulind | 13.18 kops/s | 1.34 kops/s | 133 ops/s | _reference_ |

## rsi

_Relative Strength Index (period=14, Wilder smoothing)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 154.80 kops/s | 16.57 kops/s | 1.34 kops/s | ✓ |
| technicalindicators | 7.46 kops/s | 760 ops/s | 76 ops/s | ✗ max Δ 5.00e-3 |
| trading-signals | 11.98 kops/s | 1.17 kops/s | 115 ops/s | ✓ |
| @debut/indicators | 38.39 kops/s | 3.90 kops/s | 373 ops/s | ✓ |
| tulind | 13.46 kops/s | 1.34 kops/s | 132 ops/s | _reference_ |

## macd

_MACD line (fast=12, slow=26). ta.js exposes only the line; we extract the line from others._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 81.21 kops/s | 9.13 kops/s | 606 ops/s | ✗ max Δ 1.75e-1 |
| technicalindicators | 12.37 kops/s | 1.23 kops/s | 119 ops/s | ✗ max Δ 1.75e-1 |
| trading-signals | 36.24 kops/s | 3.58 kops/s | 337 ops/s | ✗ max Δ 8.60e-2 |
| @debut/indicators | 37.47 kops/s | 3.76 kops/s | 309 ops/s | ✗ max Δ 1.75e-1 |
| tulind | 6.37 kops/s | 629 ops/s | 61 ops/s | _reference_ |

## atr

_Average True Range (period=14). Each lib gets bars in its native shape._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 156.54 kops/s | 16.46 kops/s | 1.38 kops/s | ✗ max Δ 1.47e-1 |
| technicalindicators | 18.09 kops/s | 1.98 kops/s | 196 ops/s | ✗ max Δ 3.32e-2 |
| trading-signals | 30.62 kops/s | 3.16 kops/s | 301 ops/s | ✓ |
| @debut/indicators | 108.49 kops/s | 11.64 kops/s | 1.00 kops/s | ✗ max Δ 3.32e-2 |
| tulind | 7.40 kops/s | 744 ops/s | 74 ops/s | _reference_ |

## roc

_Rate of Change (period=14, percent units after v2.0)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs technicalindicators |
|---|---:|---:|---:|---|
| ta.js | 132.56 kops/s | 14.15 kops/s | 1.24 kops/s | ✗ max Δ 1.00e+0 |
| technicalindicators | 13.45 kops/s | 1.18 kops/s | 104 ops/s | _reference_ |
| trading-signals | 38.21 kops/s | 3.81 kops/s | 365 ops/s | ✗ max Δ 6.16e+0 |
| @debut/indicators | 187.78 kops/s | 20.31 kops/s | 1.59 kops/s | ✓ |
| tulind | 13.59 kops/s | 1.38 kops/s | 136 ops/s | ✗ max Δ 6.16e+0 |

## psar

_Parabolic SAR (step=0.02, max=0.2). ta.js takes [[H, L], …]; competitor APIs vary._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 195.14 kops/s | 21.54 kops/s | 1.45 kops/s | ✓ |
| technicalindicators | 33.00 kops/s | 3.64 kops/s | 357 ops/s | ✓ |
| trading-signals | 64.40 kops/s | 6.52 kops/s | 582 ops/s | ✗ max Δ 2.01e+0 |
| @debut/indicators | 131.35 kops/s | 12.76 kops/s | 731 ops/s | ✗ max Δ 3.32e+0 |
| tulind | 9.58 kops/s | 962 ops/s | 94 ops/s | _reference_ |

## pr

_Williams %R (period=14). ta.js takes a close-only series; competitors take HLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 49.21 kops/s | 3.83 kops/s | 217 ops/s | ✗ max Δ 3.19e+1 |
| technicalindicators | 6.93 kops/s | 606 ops/s | 43 ops/s | ✓ |
| trading-signals | 23.56 kops/s | 1.36 kops/s | 112 ops/s | ✓ |
| tulind | 7.41 kops/s | 734 ops/s | 72 ops/s | _reference_ |

## mfi

_Money Flow Index (period=14). ta.js v2.0 takes [[H, L, C, V], …] — TA-Lib convention._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 169.85 kops/s | 18.92 kops/s | 852 ops/s | ✓ |
| technicalindicators | 4.89 kops/s | 491 ops/s | 28 ops/s | ✗ max Δ 5.00e-3 |
| @debut/indicators | 96.43 kops/s | 8.45 kops/s | 558 ops/s | ✓ |
| tulind | 6.07 kops/s | 609 ops/s | 60 ops/s | _reference_ |

## stoch

_Stochastic %K (length=14, smoothD=3, smoothK=3). Cross-lib comparison on the %K line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 53.65 kops/s | 4.94 kops/s | 303 ops/s | ✓ |
| technicalindicators | 6.59 kops/s | 676 ops/s | 32 ops/s | ✗ max Δ 4.13e+1 |
| trading-signals | 4.50 kops/s | 451 ops/s | 35 ops/s | ✓ |
| @debut/indicators | 34.94 kops/s | 3.30 kops/s | 241 ops/s | ✗ max Δ 4.13e+1 |
| tulind | 5.51 kops/s | 547 ops/s | 54 ops/s | _reference_ |

## obv

_On-Balance Volume. ta.js takes [[volume, close], …]; competitors take HLC+V or OHLCV._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 157.33 kops/s | 17.01 kops/s | 1.01 kops/s | ✓ |
| technicalindicators | 40.25 kops/s | 4.42 kops/s | 361 ops/s | ✓ |
| trading-signals | 23.11 kops/s | 3.16 kops/s | 285 ops/s | ✓ |
| tulind | 10.20 kops/s | 1.03 kops/s | 101 ops/s | _reference_ |

## mom

_Momentum (period=10). ta.js: data[i] − data[i − period]. Cross-checked vs tulind.mom._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 337.32 kops/s | 36.78 kops/s | 2.10 kops/s | ✗ max Δ 9.77e-1 |
| tulind | 13.60 kops/s | 1.36 kops/s | 136 ops/s | _reference_ |

## bop

_Balance of Power (period=14, SMA-smoothed). ta.js OHLC → tulind OHLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 143.78 kops/s | 18.87 kops/s | 645 ops/s | ✗ max Δ 1.07e+0 |
| tulind | 6.13 kops/s | 609 ops/s | 59 ops/s | _reference_ |

## fi

_Force Index (period=13). ta.js takes [[close, volume], …]; ti.ForceIndex takes parallel arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 30.64 kops/s | 3.10 kops/s | 295 ops/s | _reference_ |
| technicalindicators | 23.84 kops/s | 2.77 kops/s | 272 ops/s | ✗ max Δ 1.30e+5 |

## vwap

_Volume Weighted Average Price (full-window). ta.js single-window scalar series; ti.VWAP series._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 134.72 kops/s | 14.24 kops/s | 1.22 kops/s | _reference_ |
| technicalindicators | 33.55 kops/s | 4.25 kops/s | 400 ops/s | ✗ max Δ 1.72e+1 |

## kst

_Know Sure Thing (default Pring params). ta.js + ti only._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 19.87 kops/s | 2.14 kops/s | 147 ops/s | _reference_ |
| technicalindicators | 2.29 kops/s | 133 ops/s | 10 ops/s | ✗ max Δ 3.92e+1 |

## ichimoku

_Ichimoku Cloud (9/26/52/26). Cross-lib correctness compared on the Senkou A line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 8.04 kops/s | 369 ops/s | 34 ops/s | _reference_ |
| technicalindicators | 3.04 kops/s | 313 ops/s | 15 ops/s | ✗ max Δ 1.01e+2 |

## hv

_Historical Volatility (period=10). ta.js + tulind.volatility._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 289.59 kops/s | 34.53 kops/s | 2.01 kops/s | ✗ max Δ 1.33e+0 |
| tulind | 13.34 kops/s | 1.33 kops/s | 132 ops/s | _reference_ |

## cross

_Detect crossovers between two series (close vs SMA(20)). Output: count of crossings._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 488.85 kops/s | 43.53 kops/s | 3.10 kops/s | ✗ max Δ 2.00e+0 |
| tulind | 10.21 kops/s | 997 ops/s | 98 ops/s | _reference_ |

## aroon_up

_Aroon Up (period=10). Cross-checked vs tulind.aroon[1] (high line)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 108.84 kops/s | 11.37 kops/s | 873 ops/s | ✗ max Δ 1.00e+2 |
| tulind | 7.14 kops/s | 709 ops/s | 70 ops/s | _reference_ |

## aroon_down

_Aroon Down (period=10). Cross-checked vs tulind.aroon[0] (low line)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 109.65 kops/s | 11.49 kops/s | 846 ops/s | ✗ max Δ 1.00e+2 |
| tulind | 7.12 kops/s | 711 ops/s | 69 ops/s | _reference_ |

## aroon_osc

_Aroon Oscillator (period=10). Cross-checked vs tulind.aroonosc._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 38.11 kops/s | 4.79 kops/s | 337 ops/s | ✗ max Δ 1.09e+2 |
| tulind | 9.89 kops/s | 985 ops/s | 96 ops/s | _reference_ |

## supertrend

_SuperTrend bands (period=20, multiplier=3). ta.js outputs band pair; debut outputs full state._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 88.33 kops/s | 9.49 kops/s | 692 ops/s | _reference_ |
| @debut/indicators | 41.56 kops/s | 4.17 kops/s | 301 ops/s | ✗ max Δ 2.93e+0 |

## alligator

_Williams Alligator (default 13/8/5 jaw/teeth/lips). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 43.52 kops/s | 4.58 kops/s | 354 ops/s | _reference_ |

## halftrend

_HalfTrend (atr=14, amplitude=10, deviation=2). Solo bench. ta.js takes [[H, C, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 2.50 kops/s | 239 ops/s | 21 ops/s | _reference_ |

## zigzag

_ZigZag (perc=0.05) on close-only series. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 169.29 kops/s | 18.08 kops/s | 1.35 kops/s | _reference_ |

## elderray

_Elder Ray (period=13). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 43.84 kops/s | 5.42 kops/s | 248 ops/s | _reference_ |

## rvi

_Relative Vigor Index (period=10). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 16.62 kops/s | 1.67 kops/s | 162 ops/s | _reference_ |

## rvi_signal

_RVI signal smoother (over precomputed RVI series). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 288.36 kops/s | 33.48 kops/s | 2.00 kops/s | _reference_ |

## rsi_divergence

_RSI Divergence detection (period=14). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 77.20 kops/s | 8.19 kops/s | 465 ops/s | _reference_ |

## divergence

_Detect divergence between two series (close vs SMA(20)). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 262.56 kops/s | 29.60 kops/s | 1.12 kops/s | _reference_ |

## cop

_Coppock Curve (default 11/14/10). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 3.61 kops/s | 354 ops/s | 35 ops/s | _reference_ |

## asi

_Accumulative Swing Index. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 97.67 kops/s | 10.26 kops/s | 927 ops/s | _reference_ |

## tsi

_True Strength Index (long=25, short=13, signal=13). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 27.65 kops/s | 3.14 kops/s | 182 ops/s | _reference_ |

## bandwidth

_Bollinger Bandwidth (period=20, dev=2). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 113.14 kops/s | 12.62 kops/s | 716 ops/s | _reference_ |

## fractals

_Williams Fractals (price-mode). Solo bench. ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 90.12 kops/s | 8.11 kops/s | 470 ops/s | _reference_ |

## fib

_Fibonacci retracement levels (start, end). Solo bench (microbenchmark — single call returning 11 levels)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 78.15 Mops/s | 80.46 Mops/s | 80.19 Mops/s | _reference_ |

## wrsi

_Wilder RSI alias (period=14). Solo bench (rsi covers cross-lib)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 142.49 kops/s | 14.01 kops/s | 1.20 kops/s | _reference_ |

## trix

_TRIX — 1-day ROC of triple-smoothed EMA (period=20, percent units)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 62.35 kops/s | 6.75 kops/s | 449 ops/s | ✗ max Δ 3.43e-2 |
| technicalindicators | 7.96 kops/s | 854 ops/s | 87 ops/s | ✗ max Δ 3.43e-2 |
| tulind | 13.13 kops/s | 1.34 kops/s | 133 ops/s | _reference_ |

## adl

_Chaikin Accumulation/Distribution Line. ta.js takes [[H,C,L,V], …]; tulind exposes as ad._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 562.75 kops/s | 52.65 kops/s | 3.68 kops/s | ✓ |
| technicalindicators | 30.16 kops/s | 3.35 kops/s | 315 ops/s | ✓ |
| tulind | 6.21 kops/s | 624 ops/s | 61 ops/s | _reference_ |

## cci

_Commodity Channel Index (period=20). ta.js takes [[H,C,L], …]; competitors take HLC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 34.25 kops/s | 4.12 kops/s | 321 ops/s | ✓ |
| technicalindicators | 2.65 kops/s | 272 ops/s | 16 ops/s | ✓ |
| trading-signals | 13.89 kops/s | 1.42 kops/s | 139 ops/s | ✓ |
| @debut/indicators | 18.97 kops/s | 1.57 kops/s | 140 ops/s | ✓ |
| tulind | 7.34 kops/s | 734 ops/s | 70 ops/s | _reference_ |

## pdm

_Wilder +DM (period=14). ta.js takes [[H,C,L], …]; tulind dm exposes parallel HL._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 205.39 kops/s | 20.80 kops/s | 1.85 kops/s | ✗ max Δ 4.39e+0 |
| tulind | 6.86 kops/s | 692 ops/s | 67 ops/s | _reference_ |

## mdm

_Wilder −DM (period=14)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 205.97 kops/s | 20.82 kops/s | 1.80 kops/s | ✗ max Δ 5.95e+0 |
| tulind | 6.92 kops/s | 690 ops/s | 67 ops/s | _reference_ |

## pdi

_+DI (period=14). Matches ti.ADX.pdi and debut.ADX.pdi._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 189.67 kops/s | 14.72 kops/s | 1.17 kops/s | ✗ max Δ 1.13e-1 |
| technicalindicators | 5.30 kops/s | 539 ops/s | 47 ops/s | ✗ max Δ 1.13e-1 |
| @debut/indicators | 25.26 kops/s | 2.58 kops/s | 243 ops/s | ✗ max Δ 1.13e-1 |
| tulind | 5.74 kops/s | 573 ops/s | 56 ops/s | _reference_ |

## mdi

_−DI (period=14). Matches ti.ADX.mdi and debut.ADX.mdi._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 178.87 kops/s | 13.82 kops/s | 1.17 kops/s | ✗ max Δ 1.71e-1 |
| technicalindicators | 5.33 kops/s | 425 ops/s | 48 ops/s | ✗ max Δ 1.22e-1 |
| @debut/indicators | 25.52 kops/s | 2.52 kops/s | 241 ops/s | ✗ max Δ 1.71e-1 |
| tulind | 5.73 kops/s | 574 ops/s | 56 ops/s | _reference_ |

## dx

_Directional Index (period=14)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 72.22 kops/s | 6.49 kops/s | 481 ops/s | ✗ max Δ 5.18e-1 |
| tulind | 7.54 kops/s | 754 ops/s | 74 ops/s | _reference_ |

## adx

_Wilder ADX (period=14). Matches ti.ADX.adx and debut.ADX.adx._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 54.12 kops/s | 4.88 kops/s | 376 ops/s | ✗ max Δ 2.24e-1 |
| technicalindicators | 5.38 kops/s | 436 ops/s | 44 ops/s | ✗ max Δ 2.24e-1 |
| trading-signals | 8.07 kops/s | 774 ops/s | 77 ops/s | ✓ |
| @debut/indicators | 25.00 kops/s | 2.52 kops/s | 236 ops/s | ✗ max Δ 2.24e-1 |
| tulind | 7.51 kops/s | 753 ops/s | 74 ops/s | _reference_ |

## adxr

_ADX Rating (period=14). adxr[i] = (adx[i] + adx[i − length + 1]) / 2._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 50.51 kops/s | 4.64 kops/s | 355 ops/s | ✗ max Δ 1.88e-1 |
| tulind | 7.57 kops/s | 752 ops/s | 73 ops/s | _reference_ |

## stoch_rsi

_Stochastic RSI (rsi=14, stoch=14, k=3, d=3). Cross-lib comparison on the smoothed K line._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs technicalindicators |
|---|---:|---:|---:|---|
| ta.js | 30.70 kops/s | 2.38 kops/s | 148 ops/s | ✗ max Δ 6.08e-2 |
| technicalindicators | 2.76 kops/s | 278 ops/s | 17 ops/s | _reference_ |
| @debut/indicators | 15.28 kops/s | 1.39 kops/s | 130 ops/s | ✗ max Δ 6.08e-2 |

## ppo

_Percentage Price Oscillator (12, 26). 100·(EMA12 − EMA26)/EMA26._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 51.27 kops/s | 5.58 kops/s | 372 ops/s | ✗ max Δ 1.90e-1 |
| tulind | 13.48 kops/s | 1.35 kops/s | 134 ops/s | _reference_ |

## apo

_Absolute Price Oscillator (12, 26). EMA12 − EMA26._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 81.36 kops/s | 9.14 kops/s | 585 ops/s | ✗ max Δ 1.88e-1 |
| tulind | 13.51 kops/s | 1.36 kops/s | 134 ops/s | _reference_ |

## cmf

_Chaikin Money Flow (period=20). ta.js takes [[H, C, L, V], …]. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 129.19 kops/s | 13.38 kops/s | 1.09 kops/s | _reference_ |

## nvi

_Negative Volume Index. ta.js takes [[C, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 266.12 kops/s | 26.98 kops/s | 2.10 kops/s | ✓ |
| tulind | 9.91 kops/s | 994 ops/s | 99 ops/s | _reference_ |

## pvi

_Positive Volume Index. ta.js takes [[C, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 268.20 kops/s | 27.05 kops/s | 2.18 kops/s | ✓ |
| tulind | 10.02 kops/s | 993 ops/s | 99 ops/s | _reference_ |

## emv

_Ease of Movement (scale=10000). ta.js takes [[H, L, V], …]. Matches tulind._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 214.74 kops/s | 21.60 kops/s | 1.86 kops/s | ✓ |
| tulind | 7.68 kops/s | 775 ops/s | 77 ops/s | _reference_ |

## natr

_Normalized ATR (period=14). 100·ATR/Close._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 100.97 kops/s | 10.79 kops/s | 852 ops/s | ✗ max Δ 1.53e-1 |
| tulind | 7.52 kops/s | 755 ops/s | 75 ops/s | _reference_ |

## dpo

_Detrended Price Oscillator (period=21)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 254.18 kops/s | 27.81 kops/s | 1.48 kops/s | ✓ |
| tulind | 13.69 kops/s | 1.36 kops/s | 135 ops/s | _reference_ |

## mass

_Mass Index (length=25, EMA fixed at 9). ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 69.66 kops/s | 7.80 kops/s | 513 ops/s | ✗ max Δ 2.52e-2 |
| tulind | 9.62 kops/s | 951 ops/s | 95 ops/s | _reference_ |

## ulcer

_Ulcer Index (period=14). Drawdown-based volatility. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 84.25 kops/s | 8.49 kops/s | 509 ops/s | _reference_ |

## vortex

_Vortex Indicator (period=14). Solo bench. Output: [[VI+, VI−], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 104.90 kops/s | 11.45 kops/s | 808 ops/s | _reference_ |

## kdj

_KDJ (9, 3, 3). Solo bench. Output: [[K, D, J], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 46.41 kops/s | 4.24 kops/s | 242 ops/s | _reference_ |

## ao

_Awesome Oscillator (5/35 SMA on (H+L)/2). Each lib gets bars in its native shape._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 205.35 kops/s | 23.66 kops/s | 1.82 kops/s | ✗ max Δ 1.95e-1 |
| technicalindicators | 6.24 kops/s | 509 ops/s | 35 ops/s | ✗ max Δ 1.95e-1 |
| trading-signals | 14.43 kops/s | 1.44 kops/s | 142 ops/s | ✗ max Δ 1.95e-1 |
| @debut/indicators | 49.97 kops/s | 5.18 kops/s | 485 ops/s | ✗ max Δ 1.95e-1 |
| tulind | 9.81 kops/s | 974 ops/s | 96 ops/s | _reference_ |

## mom_osc

_Chande Momentum Oscillator (period=10). Cross-checked vs tulind.cmo._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 51.78 kops/s | 4.95 kops/s | 430 ops/s | ✓ |
| tulind | 13.67 kops/s | 1.36 kops/s | 135 ops/s | _reference_ |

## ac

_Williams Accelerator (5/34/5 default). ta.js + ts.AC._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 44.31 kops/s | 4.16 kops/s | 270 ops/s | _reference_ |
| trading-signals | 8.05 kops/s | 800 ops/s | 79 ops/s | ✓ |

## chaikin_osc

_Chaikin Oscillator (3/10 EMAs over ADL). ta.js takes [[H, C, L, V]]; debut takes (h, l, c, v)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 70.09 kops/s | 7.69 kops/s | 526 ops/s | _reference_ |
| @debut/indicators | 51.29 kops/s | 5.59 kops/s | 500 ops/s | ✗ max Δ 1.12e+6 |

## fisher

_Fisher Transform (period=10). Cross-checked vs tulind.fisher (which takes H,L)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 45.31 kops/s | 5.62 kops/s | 369 ops/s | ✓ |
| tulind | 6.66 kops/s | 664 ops/s | 64 ops/s | _reference_ |

## gator

_Gator Oscillator (default 13/8/5 jaw/teeth/lips). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 44.62 kops/s | 5.15 kops/s | 362 ops/s | _reference_ |

## ult

_Ultimate Oscillator (7/14/28). ta.js takes [[H,C,L], …]; tulind takes parallel HLC arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 93.16 kops/s | 10.58 kops/s | 769 ops/s | ✓ |
| tulind | 7.43 kops/s | 740 ops/s | 74 ops/s | _reference_ |

## kvo

_Klinger Volume Oscillator (34, 55). ta.js takes [[H, C, L, V], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 240.94 kops/s | 23.44 kops/s | 1.34 kops/s | ✓ |
| tulind | 6.22 kops/s | 622 ops/s | 62 ops/s | _reference_ |

## bbands

_Bollinger Bands middle line (period=20, stdDev=2)._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 201.73 kops/s | 22.88 kops/s | 1.14 kops/s | ✓ |
| technicalindicators | 1.67 kops/s | 155 ops/s | 14 ops/s | ✓ |
| trading-signals | 6.73 kops/s | 676 ops/s | 53 ops/s | ✓ |
| @debut/indicators | 38.79 kops/s | 3.97 kops/s | 370 ops/s | ✓ |
| tulind | 6.37 kops/s | 636 ops/s | 63 ops/s | _reference_ |

## keltner

_Keltner Channels (period=20, multiplier=1). Cross-checked vs ti.KeltnerChannels middle._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 61.69 kops/s | 6.96 kops/s | 409 ops/s | _reference_ |
| technicalindicators | 8.85 kops/s | 948 ops/s | 41 ops/s | ✗ max Δ 1.18e-1 |

## don

_Donchian Channels (period=20). Solo bench. ta.js takes [[H, L], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 32.38 kops/s | 1.54 kops/s | 117 ops/s | _reference_ |

## fibbands

_Fibonacci Bands (period=20, dev=3). Solo bench. ta.js takes [[price, volume], …]._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 14.72 kops/s | 1.50 kops/s | 137 ops/s | _reference_ |

## envelope

_Envelope (period=10, deviation=0.005). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 41.63 kops/s | 4.47 kops/s | 322 ops/s | _reference_ |

## std

_Rolling Standard Deviation (period=20). ta.js uses std_series for one-pass rolling computation._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 287.81 kops/s | 33.51 kops/s | 2.34 kops/s | ✓ |
| technicalindicators | 2.57 kops/s | 265 ops/s | 17 ops/s | ✓ |
| @debut/indicators | 99.51 kops/s | 10.68 kops/s | 939 ops/s | ✓ |
| tulind | 13.59 kops/s | 1.35 kops/s | 134 ops/s | _reference_ |

## cor

_Pearson Correlation (full-window scalar, two series). Solo bench — no competitor scalar API exposed at runtime._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 5.33 kops/s | 580 ops/s | 52 ops/s | _reference_ |

## recent_high

_Most-recent local high (lb=25). Returns a single {index, value} pivot. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 20.31 Mops/s | 19.28 Mops/s | 14.17 Mops/s | _reference_ |

## recent_low

_Most-recent local low (lb=25). Returns a single {index, value} pivot. Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 26.86 Mops/s | 32.44 Mops/s | 24.95 Mops/s | _reference_ |

## lr_slope

_Linear regression slope (period=14). Matches tulind.linregslope._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 92.50 kops/s | 9.20 kops/s | 506 ops/s | ✓ |
| tulind | 13.48 kops/s | 1.35 kops/s | 134 ops/s | _reference_ |

## lr_intercept

_Linear regression intercept (period=14, b at x=0). Matches tulind.linregintercept._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 88.75 kops/s | 9.17 kops/s | 507 ops/s | ✓ |
| tulind | 13.59 kops/s | 1.35 kops/s | 134 ops/s | _reference_ |

## lr_angle

_Linear regression angle (period=14, atan(slope) in degrees). Solo bench._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 72.94 kops/s | 7.65 kops/s | 466 ops/s | _reference_ |

## tsf

_Time Series Forecast (period=14). lsma + slope. Matches tulind.tsf._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs tulind |
|---|---:|---:|---:|---|
| ta.js | 89.58 kops/s | 9.07 kops/s | 619 ops/s | ✓ |
| tulind | 13.60 kops/s | 1.36 kops/s | 135 ops/s | _reference_ |

## ha

_Heikin-Ashi candles. Cross-lib correctness compared on HA close._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 124.89 kops/s | 13.46 kops/s | 948 ops/s | _reference_ |
| technicalindicators | 5.91 kops/s | 1.10 kops/s | 109 ops/s | ✓ |
| @debut/indicators | 145.08 kops/s | 14.53 kops/s | 782 ops/s | ✓ |

## ren

_Renko bricks (brickSize=1). ta.js outputs [[O,H,L,C], …]; ti.renko returns CandleList parallel arrays._

| library | ops/s @ 1000 | ops/s @ 10000 | ops/s @ 100000 | correctness vs ta.js |
|---|---:|---:|---:|---|
| ta.js | 395.52 kops/s | 33.85 kops/s | 4.29 kops/s | _reference_ |
| technicalindicators | 11.86 kops/s | 2.14 kops/s | 380 ops/s | ✗ max Δ 1.26e+1 |
