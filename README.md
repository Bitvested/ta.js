# Technical Analysis (ta.js)

[![npm version](https://badge.fury.io/js/ta.js.svg)](https://www.npmjs.com/package/ta.js) [![Downloads](https://img.shields.io/npm/dm/ta.js.svg)](https://www.npmjs.com/package/ta.js) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, lightweight JavaScript library for Technical Analysis and financial market data calculations.

---

#### NOTE

**A react compatible version of this package is available here:**  
https://github.com/Bitvested/ta.web

## Install

#### NPM

```
npm install ta.js
```

#### CDN

Three browser bundles are shipped. Pick whichever fits your setup:

```html
<!-- IIFE bundle (recommended) — exposes `window.ta` -->
<script src="https://unpkg.com/ta.js/ta.iife.min.js"></script>
<script>
  ta.sma([1,2,3,4,5,6,10], 6);     // [3.5, 5]
  ta.aroon.up([[10,7],[12,9],[14,11],[13,10],[15,12]], 4);
</script>

<!-- ES module (for <script type="module"> and modern bundlers) -->
<script type="module">
  import { sma, rsi } from 'https://unpkg.com/ta.js/ta.esm.js';
  sma([1,2,3,4,5,6,10], 6);
</script>

<!-- Legacy bundle (top-level function globals; kept for backward compatibility) -->
<script src="https://unpkg.com/ta.js/ta.min.js"></script>
```

## Usage

#### CommonJS (Node)

```javascript
const ta = require('ta.js');
ta.sma([1,2,3,4,5,6,10], 6);         // [3.5, 5]
ta.aroon.up([[10,7],[12,9],[14,11],[13,10],[15,12]], 4);
```

#### ES modules

```javascript
import { sma, rsi, aroon } from 'ta.js/ta.esm.js';
sma([1,2,3,4,5,6,10], 6);
```

#### Browser

```html
<script src="https://unpkg.com/ta.js/ta.iife.min.js"></script>
<script>
  ta.sma([1,2,3,4,5,6,10], 6);
</script>
```

## Performance

ta.js v2.0 is the fastest pure-JS technical-analysis library at production data sizes. Across 67 cross-library benchmark cases at 100k bars, **ta.js wins 66**, typically by 2-3× over the next-best competitor and ~10× over `tulind`'s native C bindings (JS↔C marshaling overhead overwhelms the native-math advantage at every size we tested).

Headline indicators at **100,000 bars** (ops/sec, higher is better):

| indicator | ta.js | next-best | margin |
|---|---:|---|---:|
| sma    | **2,290** | `@debut/indicators` 779   | 2.94× |
| ema    | **1,870** | `trading-signals` 1,480   | 1.26× |
| rsi    | **1,340** | `@debut/indicators` 373   | 3.59× |
| macd   | **606**   | `trading-signals` 337     | 1.80× |
| bbands | **1,140** | `@debut/indicators` 370   | 3.08× |
| atr    | **1,380** | `@debut/indicators` 1,000 | 1.38× |
| stoch  | **303**   | `@debut/indicators` 241   | 1.26× |
| vwap   | **1,220** | `technicalindicators` 400 | 3.05× |

Measured on Apple M3 / Darwin 25.3.0 arm64 / Node v25.1.0 against `technicalindicators` 3.1.0, `trading-signals` 7.4.3, `@debut/indicators` 1.3.22, and `tulind` 0.8.20. Full per-case tables across 1k / 10k / 100k bar inputs are in [BENCHMARKS.md](https://github.com/Bitvested/ta.js/blob/main/BENCHMARKS.md). Reproduce on your hardware with:

```sh
cd bench
npm install
npm run bench:md   # regenerates BENCHMARKS.md + bench/results.json
```

Quote ratios, not absolute ops/sec, when comparing across machines.

## Examples

https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md

#### Moving Averages

*   [Simple Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sma)
*   [Smoothed Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#smma)
*   [Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#wma)
*   [Exponential Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ema)
*   [Hull Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#hull)
*   [Least Squares Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#lsma)
*   [Volume Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vwma)
*   [Volume Weighted Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vwwma)
*   [Wilder's Smoothing Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#wsma)
*   [Parabolic Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pwma)
*   [Hyperbolic Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#hwma)
*   [Kaufman Adaptive Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kama)
*   [Custom Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cwma)
*   [Double Exponential Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dema)
*   [Triple Exponential Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#tema)
*   [Triangular Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#trima)
*   [Tilson T3 Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#t3)
*   [Zero-Lag Exponential Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#zlema)
*   [Variable Index Dynamic Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vidya)

#### Indicators

*   [Moving Average Convergence / Divergence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#macd)
*   [MACD Signal](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#macd_signal)
*   [MACD Bars](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#macd_bars)
*   [Relative Strength Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rsi)
*   [Wilder's Relative Strength Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#wrsi)
*   [True Strength Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#tsi)
*   [Balance Of Power](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#bop)
*   [Force Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fi)
*   [Accumulative Swing Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#asi)
*   [Alligator Indicator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#alli)
*   [Williams %R](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pr)
*   [Stochastics](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#stoch)
*   [Fibonacci Retracement](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fib)
*   [Bollinger Bandwidth](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#bandwidth)
*   [Ichimoku Cloud](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ichi)
*   [Average True Range](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#atr)
*   [Aroon Up](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aroon-up)
*   [Aroon Down](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aroon-down)
*   [Money Flow Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mfi)
*   [Rate Of Change](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#roc)
*   [Coppock Curve](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cop)
*   [Know Sure Thing](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kst)
*   [On-Balance Volume](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#obv)
*   [Volume-Weighted Average Price](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vwap)
*   [Fractals](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fractals)
*   [Crossover](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cross)
*   [Momentum](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mom)
*   [HalfTrend](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#half)
*   [ZigZag](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#zigzag)
*   [Parabolic SAR](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#psar)
*   [SuperTrend](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#supertrend)
*   [Elder Ray Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#elderray)
*   [Historical Volatility](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#hv)
*   [Relative Vigor Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rvi)
*   [Relative Vigor Index Signal](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rvi_signal)
*   [RSI Divergence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rsi_divergence)
*   [Divergence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#divergence)
*   [TRIX](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#trix)
*   [Accumulation/Distribution Line](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#adl)
*   [Commodity Channel Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cci)
*   [Plus Directional Movement](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pdm)
*   [Minus Directional Movement](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mdm)
*   [Plus Directional Indicator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pdi)
*   [Minus Directional Indicator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mdi)
*   [Directional Movement Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dx)
*   [Average Directional Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#adx)
*   [Average Directional Index Rating](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#adxr)
*   [Stochastic RSI](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#stoch_rsi)
*   [Percentage Price Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ppo)
*   [Absolute Price Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#apo)
*   [Chaikin Money Flow](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cmf)
*   [Negative Volume Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#nvi)
*   [Positive Volume Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pvi)
*   [Ease Of Movement](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#emv)
*   [Normalized Average True Range](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#natr)
*   [Detrended Price Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dpo)
*   [Mass Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mass)
*   [Ulcer Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ulcer)
*   [Vortex Indicator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vortex)
*   [KDJ Indicator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kdj)

#### Oscillators

*   [Alligator Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#gator)
*   [Chande Momentum Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mom_osc)
*   [Chaikin Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#chaikin_osc)
*   [Aroon Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aroon-osc)
*   [Awesome Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ao)
*   [Accelerator Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ac)
*   [Fisher Transform](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fish)
*   [Ultimate Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ult)
*   [Klinger Volume Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kvo)

#### Bands

*   [Bollinger Bands](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#bands)
*   [Keltner Channels](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kelt)
*   [Donchian Channels](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#don)
*   [Fibonacci Bollinger Bands](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fibbands)
*   [Envelope](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#env)

#### Statistics

*   [Sum](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sum)
*   [Standard Deviation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#std)
*   [Standard Deviation Series](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#std_series)
*   [Linear Regression Slope](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#lr_slope)
*   [Linear Regression Intercept](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#lr_intercept)
*   [Linear Regression Angle](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#lr_angle)
*   [Time Series Forecast](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#tsf)
*   [Variance](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#variance)
*   [Normal CDF](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ncdf)
*   [Inverse Normal Distribution](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#normsinv)
*   [Monte Carlo Simulation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sim)
*   [Percentile](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#perc)
*   [Correlation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cor)
*   [Covariance](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cov)
*   [Percentage Difference](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dif)
*   [Expected Return](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#er)
*   [Abnormal Return](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ar)
*   [Kelly Criterion](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kelly)
*   [Martingale](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#martin)
*   [Anti-Martingale](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#amartin)
*   [Permutations](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#perm)
*   [Expected Trails](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#expected_trails)
*   [Winratio](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#winratio)
*   [Average Win](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#avgwin)
*   [Average Loss](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#avgloss)
*   [Return Positive](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#return_positive)
*   [Return Negative](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#return_negative)
*   [Drawdown](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#drawdown)
*   [Median](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#median)
*   [Recent High](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rh)
*   [Recent Low](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rl)
*   [Median Absolute Deviation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mad)
*   [Average Absolute Deviation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aad)
*   [Standard Error](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#stderr)
*   [Sum Squared Differences](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ssd)
*   [Logarithm](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#log)
*   [Exponent](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#exp)
*   [Normalize](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#norm)
*   [Denormalize](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dnorm)
*   [Normalize Pair](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#normp)
*   [Normalize From](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#normf)
*   [Standardize](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#standard)
*   [Z-Score](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#zscore)
*   [P-Value](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pvalue)
*   [K-means Clustering](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kmeans)
*   [Mean Squared Error](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mse)
*   [Cumulative](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cum)

#### Random functions

*   [Pseudo Random Number Generator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#prng)
*   [Pick Random](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pick)
*   [Random Range](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#range)
*   [Random Float](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#float)
*   [Random Order](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#order)

#### Chart Types

*   [Heikin Ashi](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ha)
*   [Renko](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ren)

#### Miscellaneous

*   [Fibonacci Sequence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fibnumbers)
*   [Times Up](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#times_up)
*   [Times Down](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#times_dn)

#### Experimental

*   [Support Line](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sup)
*   [Resistance Line](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#res)
*   [Divergence State](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#divergence_state)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## 👨‍💻 Maintained By

**ta.js** is an open-source project created and actively maintained by [**Nino Kroesen**](https://ninokroesen.com).

This library was built with performance in mind for high-frequency data and algorithmic trading systems. If you are interested in seeing these indicators in action within a live quantitative trading environment, check out [**Bitvested**](https://bitvested.com).

---