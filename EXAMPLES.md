# Technical Analysis (ta.js)

ta.js is a JavaScript module for dealing with financial technical analysis.

#### NOTE
**A react compatible version of this package is available here:**
https://github.com/Bitvested/ta.web

## Installation

#### NPM
Use the package manager npm to install ta.js.

```bash
npm install ta.js --save
```
#### CDN
```html
<script src="https://unpkg.com/ta.js/ta.min.js"></script>
```
## Usage
```javascript
const ta = require('ta.js');
```
## Examples
#### Moving Averages
- [Simple Moving Average](#sma)
- [Smoothed Moving Average](#smma)
- [Weighted Moving Average](#wma)
- [Exponential Moving Average](#ema)
- [Hull Moving Average](#hull)
- [Least Squares Moving Average](#lsma)
- [Volume Weighted Moving Average](#vwma)
- [Volume Weighted Weighted Moving Average](#vwwma)
- [Wilder's Smoothing Moving Average](#wsma)
- [Parabolic Weighted Moving Average](#pwma)
- [Hyperbolic Weighted Moving Average](#hwma)
- [Kaufman Adaptive Moving Average](#kama)
- [Custom Weighted Moving Average](#cwma)
#### Indicators
- [Moving Average Convergence / Divergence](#macd)
- [MACD Signal](#macd_signal)
- [MACD Bars](#macd_bars)
- [Relative Strength Index](#rsi)
- [Wilder's Relative Strength Index](#wrsi)
- [True Strength Index](#tsi)
- [Balance Of Power](#bop)
- [Force Index](#fi)
- [Accumulative Swing Index](#asi)
- [Alligator Indicator](#alli)
- [Williams %R](#pr)
- [Stochastics](#stoch)
- [Fibonacci Retracement](#fib)
- [Bollinger Bandwidth](#bandwidth)
- [Ichimoku Cloud](#ichi)
- [Average True Range](#atr)
- [Aroon Up](#aroon-up)
- [Aroon Down](#aroon-down)
- [Money Flow Index](#mfi)
- [Rate Of Change](#roc)
- [Coppock Curve](#cop)
- [Know Sure Thing](#kst)
- [On-Balance Volume](#obv)
- [Volume-Weighted Average Price](#vwap)
- [Fractals](#fractals)
- [Crossover](#cross)
- [Momentum](#mom)
- [HalfTrend](#half)
- [ZigZag](#zigzag)
- [Parabolic SAR](#psar)
- [SuperTrend](#supertrend)
- [Elder Ray Index](#elderray)
- [Historical Volatility](#hv)
- [Relative Vigor Index](#rvi)
- [Relative Vigor Index Signal](#rvi_signal)
- [RSI Divergence](#rsi_divergence)
- [Divergence](#divergence)
#### Oscillators
- [Alligator Oscillator](#gator)
- [Chande Momentum Oscillator](#mom_osc)
- [Chaikin Oscillator](#chaikin_osc)
- [Aroon Oscillator](#aroon-osc)
- [Awesome Oscillator](#ao)
- [Accelerator Oscillator](#ac)
- [Fisher Transform](#fish)
#### Bands
- [Bollinger Bands](#bands)
- [Keltner Channels](#kelt)
- [Donchian Channels](#don)
- [Fibonacci Bollinger Bands](#fibbands)
- [Envelope](#env)
#### Statistics
- [Sum](#sum)
- [Standard Deviation](#std)
- [Variance](#variance)
- [Normal CDF](#ncdf)
- [Inverse Normal Distribution](#normsinv)
- [Monte Carlo Simulation](#sim)
- [Percentile](#perc)
- [Correlation](#cor)
- [Covariance](#cov)
- [Percentage Difference](#dif)
- [Expected Return](#er)
- [Abnormal Return](#ar)
- [Kelly Criterion](#kelly)
- [Martingale](#martin)
- [Anti-Martingale](#amartin)
- [Permutations](#perm)
- [Expected Trails](#expected_trails)
- [Winratio](#winratio)
- [Average Win](#avgwin)
- [Average Loss](#avgloss)
- [Return Positive](#return_positive)
- [Return Negative](#return_negative)
- [Drawdown](#drawdown)
- [Median](#median)
- [Recent High](#rh)
- [Recent Low](#rl)
- [Median Absolute Deviation](#mad)
- [Average Absolute Deviation](#aad)
- [Standard Error](#stderr)
- [Sum Squared Differences](#ssd)
- [Logarithm](#log)
- [Exponent](#exp)
- [Normalize](#norm)
- [Denormalize](#dnorm)
- [Normalize Pair](#normp)
- [Normalize From](#normf)
- [Standardize](#standard)
- [Z-Score](#zscore)
- [P-Value](#pvalue)
- [K-means Clustering](#kmeans)
- [Mean Squared Error](#mse)
- [Cumulative](#cum)
#### Random functions
- [Pseudo Random Number Generator](#prng)
- [Pick Random](#pick)
- [Random Range](#range)
- [Random Float](#float)
- [Random Order](#order)
#### Chart Types
- [Heikin Ashi](#ha)
- [Renko](#ren)
#### Miscellaneous
- [Fibonacci Sequence](#fibnumbers)
- [Times Up](#times_up)
- [Times Down](#times_dn)
#### Experimental
- [Support Line](#sup)
- [Resistance Line](#res)
- [Divergence State](#divergence_state)
### Moving Averages
#### <a id="sma"></a>Simple Moving Average (SMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 14
ta.sma(data, length);
// output (array)
// [3.5, 5]
```
#### <a id="smma"></a>Smoothed Moving Average (SMMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 5; // default = 14
ta.smma(data, length);
// output (array)
// [3.4, 4.92]
```
#### <a id="wma"></a>Weighted Moving Average (WMA)
```javascript
var data = [69, 68, 66, 70, 68];
var length = 4; // default = 14
ta.wma(data, length);
// output (array)
// [68.3, 68.2]
```
#### <a id="ema"></a>Exponential Moving Average (EMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 12
ta.ema(data, length);
// output (array)
// [3.5, 5.357]
```
#### <a id="hull"></a>Hull Moving Average
```javascript
var data = [6, 7, 5, 6, 7, 4, 5, 7];
var length = 6; // default = 14
ta.hull(data, length);
// output (array)
// [4.76, 5.48]
```
#### <a id="lsma"></a>Least Squares Moving Average (LSMA)
```javascript
var data = [5, 6, 6, 3, 4, 6, 7];
var length = 6; // default = 25
ta.lsma(data, length);
// output (array)
// [4.714, 5.761]
```
#### <a id="vwma"></a>Volume Weighted Moving Average (VWMA)
```javascript
var data = [[1, 59], [1.1, 82], [1.21, 27], [1.42, 73], [1.32, 42]]; // [price, volume (quantity)]
var length = 4; // default = 20
ta.vwma(data, length);
// output (array)
// [1.185, 1.259]
```
#### <a id="vwwma"></a>Volume Weighted Weighted Moving Average
```javascript
var data = [[1,59],[1.1,82],[1.21,27],[1.42,73],[1.32,42]]; // [price, volume]
var length = 4;
ta.vwwma(data, length);
// output (array)
// [1.262, 1.316]
```
#### <a id="wsma"></a>Wilder's Smoothing Moving Average
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 14
ta.wsma(data, length);
// output (array)
// [3.5, 4.58]
```
#### <a id="pwma"></a>Parabolic Weighted Moving Average
```javascript
var data = [17, 26, 23, 29, 20];
var length = 4; // default = 14
ta.pwma(data, length);
// output (array)
// [24.09, 25.18]
```
#### <a id="hwma"></a>Hyperbolic Weighted Moving Average
```javascript
var data = [54, 51, 86, 42, 47];
var length = 4; // default = 14
ta.hwma(data, length);
// output (array)
// [56.2, 55.0]
```
#### <a id="kama"></a>Kaufman Adaptive Moving Average (KAMA)
```javascript
var data = [8, 7, 8, 9, 7, 9];
var length1 = 2; // default = 10
var length2 = 4; // default = 2
var length3 = 8; // default = 30
ta.kama(data, length1, length2, length3);
// output (array)
// [8, 8.64, 8.57, 8.57]
```
#### <a id="cwma"></a>Custom Weighted Moving Average
```javascript
var data = [69,68,66,70,68,69];
var weights = [1,2,3,5,8];
ta.cwma(data, weights);
// output (array)
// [68.26315789473684, 68.52631578947368]
```
### Indicators
#### <a id="macd"></a>Moving Average Convergence / Divergence (MACD)
```javascript
var data = [1, 2, 3, 4, 5, 6, 14];
var length1 = 3; // default = 12
var length2 = 6; // default = 26
ta.macd(data, length1, length2);
// output (array)
// [1.5, 3]
```
#### <a id="macd_signal"></a>MACD Signal
```javascript
var data = [1, 2, 3, 4, 5, 6, 14, 8, 10, 11];
var length1 = 3;
var length2 = 6;
var signal_length = 3;
ta.macd_signal(data, length1, length2, signal_length);
// output (array)
// [2.107, 1.838, 1.653]
```
#### <a id="macd_bars"></a>MACD Bars
```javascript
var data = [1, 2, 3, 4, 5, 6, 14, 8, 10, 11];
var length1 = 3;
var length2 = 6;
var signal_length = 3;
ta.macd_bars(data, length1, length2, signal_length);
// output (array)
// [-0.286, -0.269, -0.184]
```
#### <a id="rsi"></a>Relative Strength Index (RSI)
```javascript
var data = [1, 2, 3, 4, 5, 6, 7, 5];
var length = 6; // default = 14
ta.rsi(data, length);
// output (array)
// [100.0, 100.0, 66.667]
```
#### <a id="wrsi"></a>Wilder's Relative Strength Index
```javascript
var data = [1, 2, 3, 4, 5, 6, 7, 5, 6];
var length = 6; // default = 14
ta.wrsi(data, length);
// output (array)
// [100, 71.43, 75.61]
```
#### <a id="tsi"></a>True Strength Index (TSI)
```javascript
var data = [1.32, 1.27, 1.42, 1.47, 1.42, 1.45, 1.59];
var longlength = 3; // default = 25
var shortlength = 2; // default = 13
var signallength = 2; // default = 13
ta.tsi(data, longlength, shortlength, signallength);
// output (array)
// [[0.327, 0.320], [0.579, 0.706]]
// [strength line, signal line]
```
#### <a id="bop"></a>Balance Of Power
```javascript
var data = [[4, 5, 4, 5], [5, 6, 5, 6], [6, 8, 5, 6]]; // [open, high, low, close]
var length = 2; // default = 14
ta.bop(data, length);
// output (array)
// [1, 0.5]
```
#### <a id="fi"></a>Force Index
```javascript
var data = [[1.4, 200], [1.5, 240], [1.1, 300], [1.2, 240], [1.5, 400]]; // [close, volume]
var length = 4; // default = 13
ta.fi(data, length);
// output (array)
// [0.0075]
```
#### <a id="asi"></a>Accumulative Swing Index
```javascript
var data = [[7, 6, 4], [9, 7, 5], [9, 8, 6]]; // [high, close, low]
ta.asi(data);
// output (array)
// [0, -12.5]
```
#### <a id="alli"></a>Alligator Indicator
```javascript
var data = [8,7,8,9,7,8,9,6,7,8,6,8,10,8,7,9,8,7,9,6,7,9];
// defaults shown
var jawlength = 13;
var teethlength = 8;
var liplength = 5;
var jawshift = 8;
var teethshift = 5;
var lipshift = 3;
ta.alligator(data, jawlength, teethlength, liplength, jawshift, teethshift, lipshift);
// output (array)
// [jaw, teeth, lips]
```
#### <a id="pr"></a>Williams %R
```javascript
var data = [2, 1, 3, 1, 2];
var length = 4; // default = 14
ta.pr(data, length);
// output (array)
// [-0, -100, -50]
```
#### <a id="stoch"></a>Stochastics
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]]; // [high, close, low]
var length = 2; // default = 14
var smoothd = 1; // default = 3
var smoothk = 1; // default = 3
ta.stoch(data, length, smoothd, smoothk);
// output (array)
// [[66.667, 66.667], [33.336, 33.336]]
// [kline, dline]
```
#### <a id="fib"></a>Fibonacci Retracement
```javascript
var start = 1;
var end = 2;
ta.fib(start, end);
// output (array)
// [1, 1.236, 1.382, 1.5, 1.618, 1.786, 2, 2.618, 3.618, 4.618, 5.236]
```
#### <a id="bandwidth"></a>Bollinger Bandwidth
```javascript
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bandwidth(data, length, deviations);
// output (array)
// [1.886, 1.344]
```
#### <a id="ichi"></a>Ichimoku Cloud
```javascript
var data = [[6, 3, 2], [5, 4, 2], [5, 4, 3], [6, 4, 3], [7, 6, 4], [6, 5, 3]]; // [high, close, low]
var length1 = 9; // default = 9
var length2 = 26; // default = 26
var length3 = 52; // default = 52
var displacement = 26; // default = 26
ta.ichimoku(data, length1, length2, length3, displacement);
// output (array)
// [conversion line, base line, leading span A, leading span B, lagging span]
```
#### <a id="atr"></a>Average True Range (ATR)
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]]; // [high, close, low]
var length = 3; // default = 14
ta.atr(data, length);
// output (array)
// [2, 1.667, 2.111, 1.741]
```
#### <a id="aroon-up"></a>Aroon Up
```javascript
var data = [5, 4, 5, 2];
var length = 3; // default = 10
ta.aroon.up(data, length);
// output (array)
// [100, 50]
```
#### <a id="aroon-down"></a>Aroon Down
```javascript
var data = [2, 5, 4, 5];
var length = 3; // default = 10
ta.aroon.down(data, length);
// output (array)
// [0, 50]
```
#### <a id="mfi"></a>Money Flow Index
```javascript
var data = [[19, 13], [14, 38], [21, 25], [32, 17]]; // [buy volume, sell volume]
var length = 3; // default = 14
ta.mfi(data, length);
// output (array)
// [41.54, 45.58]
```
#### <a id="roc"></a>Rate Of Change
```javascript
var data = [1, 2, 3, 4];
var length = 3; // default = 14
ta.roc(data, length);
// output (array)
// [2, 1]
```
#### <a id="cop"></a>Coppock Curve
```javascript
var data = [3, 4, 5, 3, 4, 5, 6, 4, 7, 5, 4, 7, 5];
var length1 = 4; // (ROC period 1) default = 11
var length2 = 6; // (ROC period 2) default = 14
var length3 = 5; // (WMA smoothing period) default = 10
ta.cop(data, length1, length2, length3);
// output (array)
// [0.376, 0.237]
```
#### <a id="kst"></a>Know Sure Thing
```javascript
var data = [8, 6, 7, 6, 8, 9, 7, 5, 6, 7, 6, 8, 6, 7, 6, 8, 9, 9, 8, 6, 4, 6, 5, 6, 7, 8, 9];
// roc sma #1
var r1 = 5; // default = 10
var s1 = 5; // default = 10
// roc sma #2
var r2 = 7; // default = 15
var s2 = 5; // default = 10
// roc sma #3
var r3 = 10; // default = 20
var s3 = 5; // default = 10
// roc sma #4
var r4 = 15; // default = 30
var s4 = 7; // default = 15
// signal line
var sig = 4; // default = 9
ta.kst(data, r1, r2, r3, r4, s1, s2, s3, s4, sig);
// output (array)
// [[-0.68, -0.52], [-0.29, -0.58], [0.35, -0.36]]
// [kst line, signal line]
```
#### <a id="obv"></a>On-Balance Volume
```javascript
var data = [[25200, 10], [30000, 10.15], [25600, 10.17], [32000, 10.13]]; // [asset volume, close price]
ta.obv(data);
// output (array)
// [0, 30000, 55600, 23600]
```
#### <a id="vwap"></a>Volume-Weighted Average Price
```javascript
var data = [[127.21, 89329], [127.17, 16137], [127.16, 23945]]; // [average price, volume (quantity)]
var length = 2; // default = data.length
ta.vwap(data, length);
// output (array)
// [127.204, 127.164]
```
#### <a id="fractals"></a>Fractals
```javascript
var data = [[7,6],[8,6],[9,6],[8,5],[7,4],[6,3],[7,4],[8,5]]; // [high, low]
ta.fractals(data);
// output (array, same length as input)
// [[false, false],[false,false],[true,false],[false,false],[false,false],[false,true],[false,false],[false,false]]
// [upper fractal, lower fractal]
```
#### <a id="cross"></a>Crossover (golden cross)
```javascript
var fastdata = [3,4,5,4,3]; // short period gets spliced when longer
var slowdata = [4,3,2,3,4];
ta.cross(fastdata, slowdata);
// output (array)
// [{index: 1, cross true}, {index: 4, cross: false}]
// cross is true when fastdata is greater than the slowdata
```
#### <a id="mom"></a>Momentum
```javascript
var data = [1, 1.1, 1.2, 1.24, 1.34];
var length = 4; // default = 10
var percentage = false; // default = false (true returns percentage)
ta.mom(data, length, percentage);
// output (array)
// [0.24, 0.24]
```
#### <a id="half"></a>HalfTrend
```javascript
// experimental (untested) function (may change in the future), ported from:
// https://www.tradingview.com/script/U1SJ8ubc-HalfTrend/
// data = [high, close, low]
var data = [[100,97,90],[101,98,94],[103,96,92],[106,100,95],[110,101,100],[112,110,105],[110,100,90],[103,100,97],[95,90,85],[94,80,80],[90,82,81],[85,80,70]];
var atrlen = 6;
var amplitude = 3;
var deviation = 2;
ta.halftrend(data, atrlen, amplitude, deviation);
// output (array)
// [[high, halftrend, low, signal]]
```
#### <a id="zigzag"></a>ZigZag
```javascript
// Based on high / low
var data = [[10,9], [12,10], [14,12], [15,13], [16,15], [11,10], [18,15]]; // [high, low]
var percentage = 0.25; // default = 0.05
ta.zigzag(data, percentage);
// output (array)
// [9, 10.75, 12.5, 14.25, 16, 10, 18]
```
```javascript
// Based on close
var data = [6,7,8,9,10,12,9,8,5,3,3,3,5,7,8,9,11];
var percentage = 0.05;
ta.zigzag(data, percentage);
// output (array)
// [6, 7.2, 8.4, 9.6, 10.8, 12.0, 10.5, 9.0, 7.5, 6.0, 4.5, 3.0, 4.6, 6.2, 7.8, 9.4, 11.0]
```
#### <a id="psar"></a>Parabolic SAR
```javascript
var data = [[82.15,81.29],[81.89,80.64],[83.03,81.31],[83.30,82.65],[83.85,83.07],[83.90,83.11],[83.33,82.49],[84.30,82.3],[84.84,84.15],[85,84.11],[75.9,74.03],[76.58,75.39],[76.98,75.76],[78,77.17],[70.87,70.01]];
var step = 0.02;
var max = 0.2;
ta.psar(data, step, max);
// output (array)
// [81.29,82.15,80.64,80.64,80.7464,80.932616,81.17000672,81.3884061824,81.67956556416,82.0588176964608,85,85,84.7806,84.565588,84.35487624000001]
```
#### <a id="supertrend"></a>SuperTrend
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]] // [high, close, low]
var length = 3; // default = 20
var multiplier = 0.5; // default = 3
ta.supertrend(data, length, multiplier);
// output (array)
// [[5.56,1.44],[3.37,0.63]]
// [up, down]
```
#### <a id="elderray"></a>Elder Ray Index
```javascript
var data = [6,5,4,7,8,9,6,8];
var length = 7;
ta.elderray(data, length);
// output (array)
// [[2.57,-2.43],[2.29,-2.71]]
// [bull, bear]
```
#### <a id="hv"></a>Historical Volatility
```javascript
var data = [7,6,5,7,8,9,7,6,5];
var length = 8;
ta.hv(data, length);
// output (array)
// [0.642, 0.682]
```
#### <a id="rvi"></a>Relative Vigor Index
```javascript
// data = [[open,high,low,close]] (requires at least 4 + length values)
var data = [[4,6,3,3], [3,5,2,2], [2,5,2,4], [4,6,4,5], [5,7,4,4], [4,6,3,4], [4,7,3,5], [5,7,5,6], [6,8,6,6], [6,9,5,6], [6,8,6,7], [7,9,5,6],[6,7,4,5],[5,6,5,6],[6,8,5,5],[5,7,2,6]];
var length = 8;
ta.rvi(data, length);
// output (array)
// [0.29,0.21,0.15,0.16,0.09,0.05]
```
#### <a id="rvi_signal"></a>Relative Vigor Index Signal
```javascript
var rvi = [0.29,0.21,0.15,0.16,0.09,0.05]; // requires at least 4 values
ta.rvi_signal(rvi);
// output (array)
// [0.20,0.15,0.12]
```
#### <a id="rsi_divergence"></a>RSI Divergence
Experimental function: https://github.com/Bitvested/ta.js/issues/18
```javascript
var data = [74,83,66,78,69,70,84,73,74,73,83];
var rsi_length = 5;
var rsi_function = ta.wrsi; // default (the tradingview rsi indicator)
ta.rsi_divergence(data, rsi_length, rsi_function);
// output (array)
// 1 = RSI is in divergence
// 0 = RSI is not in divergence
// [0, 0, 1, 0, 1, 0] (better to quantify if needed)
```
#### <a id="divergence"></a>Universal Divergence
```javascript
var data1 = [48,34,43,54,56,64,43];
var data2 = [76,74,43,55,34,32,45,47];
ta.divergence(data1, data2);
// output (array)
// 1 = RSI is in divergence
// 0 = RSI is not in divergence
// [0, 0, 1, 1, 0, 1] (better to quantify if needed)
```
### Oscillators
#### <a id="gator"></a>Alligator Oscillator
```javascript
var data = [8,7,8,9,7,8,9,6,7,8,6,8,10,8,7,9,8,7,9,6,7,9];
// defaults shown
var jawlength = 13;
var teethlength = 8;
var liplength = 5;
var jawshift = 8;
var teethshift = 5;
var lipshift = 3;
ta.gator(data, jawlength, teethlength, liplength, jawshift, teethshift, lipshift);
// output (array)
// [upper gator, lower gator]
```
#### <a id="mom_osc"></a>Chande Momentum Oscillator
```javascript
var data = [1, 1.2, 1.3, 1.3, 1.2, 1.4];
var length = 4; // default = 9
ta.mom_osc(data, length);
// output (array)
// [0, 3.85]
```
#### <a id="chaikin_osc"></a>Chaikin Oscillator
```javascript
var data = [[2,3,4,6],[5,5,5,4],[5,4,3,7],[4,3,3,4],[6,5,4,6],[7,4,3,6]]; // [high, close, low, volume]
var length1 = 2; // default = 3
var length2 = 4; // default = 10
ta.chaikin_osc(data, length1, length2);
// output (array)
// [-1.667, -0.289, -0.736]
```
#### <a id="aroon-osc"></a>Aroon Oscillator
```javascript
var data = [2, 5, 4, 5];
var length = 3; // default = 25
ta.aroon.osc(data, length);
// output (array)
// [50, 50]
```
#### <a id="ao"></a>Awesome Oscillator
```javascript
var data = [[6, 5], [8, 6], [7, 4], [6, 5], [7, 6], [9, 8]]; // [high, low]
var shortlength = 2; // default = 5
var longlength = 5; // default = 35
ta.ao(data, shortlength, longlength);
// output (array)
// [0, 0.9]
```
#### <a id="ac"></a>Accelerator Oscillator
```javascript
var data = [[6, 5], [8, 6], [7, 4], [6, 5], [7, 6], [9, 8]]; // [high, low]
var shortlength = 2; // default = 5
var longlength = 4; // default = 35
ta.ac(data, shortlength, longlength);
// output (array)
// [-5.875, -6.125, -6.5]
```
#### <a id="fish"></a>Fisher Transform
```javascript
var data = [8,6,8,9,7,8,9,8,7,8,6,7]; // high + low / 2
var length = 9;
ta.fisher(data, length);
// output (array)
// [[-0.318, -0.11], [-0.449, -0.318], [-0.616, -0.449]] // [fisher, trigger]
```
### Bands
#### <a id="bands"></a>Bollinger Bands
```javascript
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bands(data, length, deviations);
// output (array)
// [[5.828, 3, 0.172], [6.828, 4, 1.172]]
// [upper band, middle band, lower band]
```
#### <a id="kelt"></a>Keltner Channels
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1], [3,3,1]]; // [high, close, low]
var length = 5; // default = 14
var deviations = 1; // default = 1
ta.keltner(data, length, deviations);
// output (array)
// [[3.93, 2.06, 0.20]]
// [upper band, middle band, lower band]
```
#### <a id="don"></a>Donchian Channels
```javascript
var data = [[6, 2], [5, 2], [5, 3], [6, 3], [7, 4], [6, 3]]; // [high, low]
var length = 5; // default = 20
ta.don(data, length);
// output (array)
// [[7, 4.5, 2], [7, 4.5, 2]]
// [upper band, base line, lower band]
```
#### <a id="fibbands"></a>Fibonacci Bollinger Bands
```javascript
// created from: https://tradingview.com/script/qIKR3tbN-Fibonacci-Bollinger-Bands/
var data = [[1,59],[1.1,82],[1.21,27],[1.42,73],[1.32,42]]; // [price, volume]
var length = 4; // default = 20
var deviations = 3; // default = 3
ta.fibbands(data, length, deviations);
// output (array)
// [[highest band -> fibonacci levels -> lowest band]]
```
#### <a id="env"></a>Envelope
```javascript
var data = [6,7,8,7,6,7,8,7,8,7,8,7,8];
var length = 11, // default = 10
var percentage = 0.05; // default = 0.005
ta.envelope(data, length, percentage);
// output (array)
// [[7.541, 7.182, 6.823], [7.636, 7.273, 6.909]]
// [upper band, base line, lower band]
```
### Statistics
#### <a id="sum"></a>Sum
```javascript
var data = [1,2,3];
ta.sum(data);
// output (float)
// 6
```
#### <a id="std"></a>Standard Deviation
```javascript
var data = [1, 2, 3];
var length = 3; // default = data.length
ta.std(data, length);
// output (float)
// 0.81649658092773
```
#### <a id="variance"></a>Variance
```javascript
var data = [6, 7, 2, 3, 5, 8, 6, 2];
var length = 7; // default = data.length
ta.variance(data, length);
// output (array)
// [3.918, 5.061]
```
#### <a id="ncdf"></a>Normal CDF
```javascript
var sample = 13;
var mean = 10;
var stdv = 2;
ta.ncdf(sample, mean, stdv);
// output (float)
// 0.9331737996110652

var zscore = 1.5;
ta.ncdf(zscore);
// output (float)
// 0.9331737996110652
```
#### <a id="normsinv"></a>Inverse Normal Distribution
```javascript
var data = 0.4732;
ta.normsinv(data);
// output (float)
// -0.06722824471054376
```
#### <a id="sim"></a>Monte Carlo Simulation
```javascript
var data = [6, 4, 7, 8, 5, 6];
var length = 2; // default = 50
var simulations = 100; // default = 1000
var percentile = 0.5; // default = undefined (returns all raw simulations)
ta.sim(data, length, simulations, percentile);
// output (array)
// [6, 4, 7, 8, 5, 6, 5.96, 5.7]
```
Multi threaded ~ not faster in all cases (node version >= 12)
```javascript
await ta.multi.sim(data, length, simulations, percentile);
```
#### <a id="perc"></a>Percentile
```javascript
var data = [[6,4,7], [5,3,6], [7,5,8]];
var percentile = 0.5;
ta.percentile(data, percentile);
// output (array)
// [6, 4, 7]
```
#### <a id="cor"></a>Correlation
```javascript
var data1 = [1, 2, 3, 4, 5, 2];
var data2 = [1, 3, 2, 4, 6, 3];
ta.cor(data1, data2);
// output (float)
// 0.8808929232684737
```
#### <a id="cov"></a>Covariance
```javascript
var data1 = [12,13,25,39];
var data2 = [67,45,32,21];
var length = 4;
ta.covariance(data1, data2, 4);
// output (array)
// [-165.8125]
```
#### <a id="dif"></a>Percentage Difference
```javascript
var newval = 0.75;
var oldval = 0.5;
ta.dif(newval, oldval);
// output (float)
// 0.5
```
#### <a id="er"></a>Expected Return
```javascript
var data = [0.02, -0.01, 0.03, 0.05, -0.03]; // historical return data
ta.er(data);
// output (float)
// 0.0119
```
#### <a id="ar"></a>Abnormal Return
```javascript
var data = [0.02, -0.01, 0.03, 0.05, -0.03]; // historical return data
var length = 3;
ta.ar(data, length);
// output (array)
// [0.037, -0.053]
```
#### <a id="kelly"></a>Kelly Criterion
```javascript
var data = [0.01, 0.02, -0.01, -0.03, -0.015, 0.045, 0.005];
ta.kelly(data);
// output (float)
// 0.1443
```
#### <a id="martin"></a>Martingale
```javascript
var data = [-1,-1,1,1,-1,-1]; // win or loss (> 0 || < 0)
var bet = 5;
var max = 20;
var multiplier = 2; // default = 2
ta.martingale(data, bet, max, multiplier);
// output (float)
// 20
```
#### <a id="amartin"></a>Anti-Martingale
```javascript
var data = [1,1,-1,-1,1,1]; // win or loss (> 0 || < 0)
var bet = 5;
var max = 20;
var multiplier = 2; // default = 2
ta.antimartingale(data, bet, max, multiplier);
// output (float)
// 20
```
#### <a id="permutations"></a>Permutations
```javascript
var data = [10,10,10];
ta.permutations(data);
// output (int)
// 1000
```
#### <a id="expected_trails"></a>Expected Trails
```javascript
var samples = 100;
ta.expected_trails(samples);
// output (int)
// 519
```
#### <a id="winratio"></a>Winratio
```javascript
var data = [0.01, 0.02, -0.01, -0.03, -0.015, 0.005];
ta.winratio(data);
// output (float)
// 0.5
```
#### <a id="avgwin"></a> Average Win
```javascript
var data = [0.01, 0.02, -0.01, -0.03, -0.015, 0.005];
ta.avgwin(data);
// output (float)
// 0.012
```
#### <a id="avgloss"></a> Average Loss
```javascript
var data = [0.01, 0.02, -0.01, -0.03, -0.015, 0.005];
ta.avgloss(data);
// output (float)
// -0.018
```
#### <a id="return_positive"></a>Return Positive
```javascript
var data = [0.02,0.01,-0.03,-0.01,0.005];
ta.return_positive(data);
// output (array)
// [0.02,0.01,0.005]
```
#### <a id="return_negative"></a>Return Negative
```javascript
var data = [0.02,0.01,-0.03,-0.01,0.005];
ta.return_negative(data);
// output (array)
// [-0.03,-0.01]
```
#### <a id="drawdown"></a>Drawdown
```javascript
var data = [1, 2, 3, 4, 2, 3];
ta.drawdown(data);
// output (float)
// -0.5
```
#### <a id="median"></a>Median
```javascript
var data = [4, 6, 3, 1, 2, 5];
var length = 4; // default = data.length
ta.median(data, length);
// output (array)
// [3, 2, 2]
```
#### <a id="rh"></a>Recent High
```javascript
var data = [4,5,6,7,8,9,8,7,8,9,10,3,2,1];
var lookback = 3; // No higher values after 3 periods? resets after each new high
ta.recent_high(data, lookback);
// output (object)
// {index: 10, value: 10}
```
#### <a id="rl"></a>Recent Low
```javascript
var data = [1,4,5,6,4,3,2,3,4,3,5,7,8,8,5];
var lookback = 4; // No lower values after 4 periods? resets after each new low
ta.recent_low(data, lookback);
// output (object)
// {index: 6, value: 2}
```
#### <a id="mad"></a>Median Absolute Deviation
```javascript
var data = [3, 7, 5, 4, 3, 8, 9];
var length = 6; // default = data.length
ta.mad(data, length);
// output (array)
// [1, 2]
```
#### <a id="aad"></a>Average Absolute Deviation
```javascript
var data = [4, 6, 8, 6, 8, 9, 10, 11];
var length = 7; // default = data.length
ta.aad(data, length);
// output (array)
// [1.673, 1.468]
```
#### <a id="stderr"></a>Standard Error
```javascript
var data = [34, 54, 45, 43, 57, 38, 49];
var size = 10; // default = data.length
ta.se(data, size);
// output (float)
// 2.424
```
#### <a id="ssd"></a>Sum Squared Differences
```javascript
var data = [7, 6, 5, 7, 9, 8, 3, 5, 4];
var length = 7; // default = data.length
ta.ssd(data, length);
// output (array)
// [4.87, 4.986, 5.372]
```
#### <a id="log"></a>Logarithm
```javascript
var data = [5, 14, 18, 28, 68, 103];
ta.log(data);
// output (array)
// [1.61, 2.64, 2.89, 3.33, 4.22, 4.63]
```
#### <a id="exp"></a>Exponent
```javascript
var data = [1.6, 2.63, 2.89, 3.33, 4.22, 4.63];
ta.exp(data);
// output (array)
// [4.95, 13.87, 17.99, 27.94, 68.03, 102.51]
```
#### <a id="norm"></a>Normalize
```javascript
var data = [5,4,9,4];
var margin = 0.1; // margin % (default = 0)
ta.normalize(data, margin);
// output (array)
// [0.22, 0.06, 0.86, 0.06]
```
#### <a id="dnorm"></a>Denormalize
```javascript
var data = [5,4,9,4]; // original data || [highest, lowest]
var norm = [0.22, 0.06, 0.86, 0.06, 0.44]; // normalized data
var margin = 0.1; // margin % (default = 0)
ta.denormalize(data, norm, margin);
// output (array)
// [5 ,4, 9, 4, 6.4]
```
#### <a id="normp"></a>Normalize Pair
```javascript
var pair1 = [10,12,11,13];
var pair2 = [100,130,100,140];
ta.normalize_pair(pair1, pair2);
// output (array)
// [[55, 55], [66, 71.5], [60.5, 54.99], [71.5, 76.99]]
```
#### <a id="normf"></a>Normalize From
```javascript
var data = [8, 12, 10, 11];
var baseline = 100;
ta.normalize_from(data, baseline);
// output (array)
// [100, 150, 125, 137.5]
```
#### <a id="standard"></a>Standardize
```javascript
var data = [6,4,6,8,6];
ta.standardize(data);
// output (array)
// [0, -1.581, 0, 1.581, 0]
```
#### <a id="zscore"></a>Z-Score
```javascript
var data = [34,54,45,43,57,38,49];
var length = 5;
ta.zscore(data, length);
// output (array)
// [1.266, -1.331, 0.408]
```
#### <a id="pvalue"></a>P-Value
```javascript
var t_stat = 2;
var df = 4;
ta.pvalue(t_stat, df);
// output (float)
// 0.075
```
#### <a id="kmeans"></a>K-means Clustering
```javascript
var data = [2, 3, 4, 5, 3, 5, 7, 8, 6, 8, 6, 4, 2, 6];
var length = 4;
ta.kmeans(data, length);
// output (array)
// [[ 4, 5, 5, 4 ], [ 7, 6, 6, 6 ], [ 8, 8 ], [ 2, 3, 3, 2 ]]
```
#### <a id="mse"></a>Mean Squared Error
```javascript
var data1 = [7,8,7,8,6,9];
var data2 = [6,8,8,9,6,8];
ta.mse(data1, data2);
// output (float)
// 0.6666666666666666
```
#### <a id="cum"></a>Cumulative
```javascript
var data = [3,5,7,5,10];
var length = 4;
ta.cum(data, length);
// output (array)
// [20, 27]
```
### Random Functions
#### <a id="prng"></a>Pseudo Random Number Generator
```javascript
var seed = "abcdefg"; // string || number
var prng = ta.random.prng(seed);
console.log(prng());
// output (float)
// 0.9100735441315919
```
#### <a id="pick"></a>Pick Random
```javascript
var data = ['a', 'b', 'c'];
var prng = ta.random.prng('abcdefg');
ta.random.pick(data, prng); // default number generator = Math.random
// output (array element)
// 'c'
```
#### <a id="range"></a>Random Range
```javascript
var min = 10;
var max = 50;
var prng = ta.random.prng('abcdefg');
ta.random.range(min, max, prng); // default number generator = Math.random
// output (int)
// 46
```
#### <a id="float"></a>Random Float
```javascript
var min = 1.4;
var max = 2.8;
var prng = ta.random.prng('abcdefg');
ta.random.float(min, max, prng); // default number generator = Math.random
// output (float)
// 2.6741029617842287
```
#### <a id="order"></a>Random Order
```javascript
var data = ['a','b','c','d','e'];
var prng = ta.random.prng('abcdefg');
ta.random.order(data, prng); // default number generator = Math.random
// output (array)
// ['e', 'c', 'b', 'd', 'a'];
```
### Chart Types
#### <a id="ha"></a>Heikin Ashi
```javascript
var data = [[3, 4, 2, 3], [3, 6, 3, 5], [5, 5, 2, 3]]; // [open, high, low, close]
ta.ha(data);
// output (array)
// [open, high, low, close]
// first 7-10 candles are unreliable
```
#### <a id="ren"></a>Renko
```javascript
var data = [[8, 6], [9, 7], [9, 8]]; // [high, low]
var bricksize = 3;
ta.ren(data, bricksize);
// output (array)
// [open, high, low, close]
```
### Miscellaneous
#### <a id="fibnumbers"></a>Fibonacci Sequence
```javascript
ta.fibnumbers;
// output (array)
// [0, 1, 1, 2, 3, 5, 8...];
```
#### <a id="times_up"></a>Times Up
```javascript
var data = [5,6,7,8,7,6,5];
var length = 3;
ta.times_up(data, length);
// output (array)
// [1, 0, 0, 0]
```
#### <a id="times_dn"></a>Times Down
```javascript
var data = [5,6,7,8,7,6,5];
var length = 3;
ta.times_down(data, length);
// output (array)
// [0, 0, 0, 1]
```
### Experimental Functions
#### <a id="sup"></a>Support Line
```javascript
var data = [4,3,2,5,7,6,5,4,7,8,5,4,6,7,5];
var start = {index: 2, value: 2}; // default = recent_low(data, 25);
var support = ta.support(data, start);
// output (object)
// support.calculate = function(x) // calculates line at position x from start.index (= 0)
// support.slope = delta y per x
// support.lowest = lowest (start) value at x = 0
// support.index = (start) index of the lowest value
// to get the line at the current candle / chart period
var current = support.calculate(data.length-support.index);
```
#### <a id="res"></a>Resistance Line
```javascript
var data = [5,7,5,5,4,6,5,4,6,5,4,3,2,4,3,2,1];
var start = {index: 1, value: 7}; // default = recent_high(data, 25);
var resistance = ta.resistance(data, start);
// output (object)
// resistance.calculate = function(x) // calculates line at position x from start.index (= 0)
// resistance.slope = delta y per x
// resistance.highest = highest (start) value
// resistance.index = (start) index of highest value
// to get the line at the current candle / chart period
var current = resistance.calculate(data.length-resistance.index);
```
#### <a id="divergence_state"></a>Divergence State
Beware as more data becomes available values returned by the function could change!
https://github.com/Bitvested/ta.js/issues/18
```javascript
var data1 = [48,34,43,54,56,64,43,51,52,53,55,51,48,45,40,42,44,45];
var data2 = [76,74,43,55,34,32,45,47,48,53,54,54,50,52,49,47,48,46];
var length = 12; // array length to check
var lookback = 3; // lookback length to check for recent_low / recent_high (please check function code for more info)
var smoother = 1; // smooth divergence lookback period
var threshold_exaggerated = 0.03; // percentual change threshold for 'exaggerated' divergence
var threshold_normal = 0.01; // percentual change threshold for 'normal' and 'hidden' divergence
ta.divergence_state(data1, data2, length, lookback, smoother, threshold_exaggerated, threshold_normal);
// output (array of arrays)
// [['convergence'],['divergence'],['convergence'],['divergence'],['convergence'],['exaggerated_bearish']]
// it is possible for multiple states to exist at once
// possible states are: exaggerated_bearish, exaggerated_bullish, hidden_bearish, hidden_bullish, regular_bearish, regular_bullish and convergence
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
