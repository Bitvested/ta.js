# Technical Analysis (ta.js)

ta.js is a JavaScript module for dealing with financial technical analysis.

## Installation

#### NPM
Use the package manager npm to install ta.js.

```bash
npm install ta.js
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
- [Simple Moving Average](#sma)
- [Smoothed Moving Average](#smma)
- [Weighted Moving Average](#wma)
- [Hull Moving Average](#hull)
- [Kaufman Adaptive Moving Average](#kama)
- [Volume Weighted Moving Average](#vwma)
- [Exponential Moving Average](#ema)
- [Least Squares Moving Average](#lsma)
- [Moving Average Convergence / Divergence](#macd)
- [Relative Strength Index](#rsi)
- [True Strength Index](#tsi)
- [Balance Of Power](#bop)
- [Force Index](#fi)
- [Accumulative Swing Index](#asi)
- [Awesome Oscillator](#ao)
- [Williams %R](#pr)
- [Stochastics](#stoch)
- [Standard Deviation](#std)
- [Correlation](#cor)
- [Percentage Difference](#dif)
- [Median](#median)
- [Bollinger Bands](#bands)
- [Bollinger Bandwidth](#bandwidth)
- [Keltner Channels](#kelt)
- [Donchian Channels](#don)
- [Ichimoku Cloud](#ichi)
- [Average True Range](#atr)
- [Aroon Up](#aroon-up)
- [Aroon Down](#aroon-down)
- [Aroon Oscillator](#aroon-osc)
- [Money Flow Index](#mfi)
- [Rate Of Change](#roc)
- [Coppock Curve](#cop)
- [Know Sure Thing](#kst)
- [On-Balance Volume](#obv)
- [Volume-Weighted Average Price](#vwap)
- [Chande Momentum Oscillator](#mom_osc)
- [Momentum](#mom)
- [Heikin Ashi](#ha)
- [Renko](#ren)
#### <a name="sma"></a>Simple Moving Average (SMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 14
ta.sma(data, length);
// output (array)
// [3.5, 5]
```
#### <a name="smma"></a>Smoothed Moving Average (SMMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 5; // default = 14
ta.smma(data, length);
// output (array)
// [3.4, 4.92]
```
#### <a name="wma"></a>Weighted Moving Average (WMA)
```javascript
var data = [69, 68, 66, 70, 68];
var length = 4; // default = 14
ta.wma(data, length);
// output (array)
// [68.3, 68.2]
```
#### <a name="hull"></a>Hull Moving Average
```javascript
var data = [6, 7, 5, 6, 7, 4, 5, 7];
var length = 6; // default = 14
ta.hull(data, length);
// output (array)
// [4.76, 5.48]
```
#### <a name="kama"></a>Kaufman Adaptive Moving Average (KAMA)
```javascript
var data = [8, 7, 8, 9, 7, 9];
var length1 = 2; // default = 10
var length2 = 4; // default = 2
var length3 = 8; // default = 30
ta.kama(data, length1, length2, length3);
// output (array)
// [8, 8.64, 8.57, 8.57]
```
#### <a name="vwma"></a>Volume Weighted Moving Average (VWMA)
```javascript
var data = [[1, 59], [1.1, 82], [1.21, 27], [1.42, 73], [1.32, 42]]; // [price, volume (quantity)]
var length = 4; // default = 20
ta.vwma(data, length);
// output (array)
// [1.185, 1.259]
```
#### <a name="ema"></a>Exponential Moving Average (EMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 12
ta.ema(data, length);
// output (array)
// [3.5, 5.357]
```
#### <a name="lsma"></a>Least Squares Moving Average (LSMA)
```javascript
var data = [5, 6, 6, 3, 4, 6, 7];
var length = 6; // default = 25
ta.lsma(data, length);
// output (array)
// [4.714, 5.761]
```
#### <a name="macd"></a>Moving Average Convergence / Divergence (MACD)
```javascript
var data = [1, 2, 3, 4, 5, 6, 14];
var length1 = 3; // default = 12
var length2 = 6; // default = 26
ta.macd(data, length1, length2);
// output (array)
// [1.5, 3]
```
#### <a name="rsi"></a>Relative Strength Index (RSI)
```javascript
var data = [1, 2, 3, 4, 5, 6, 7, 5];
var length = 6; // default = 14
ta.rsi(data, length);
// output (array)
// [100, 100, 72.77]
```
#### <a name="tsi"></a>True Strength Index (TSI)
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
#### <a name="bop"></a>Balance Of Power
```javascript
var data = [[4, 5, 4, 5], [5, 6, 5, 6], [6, 8, 5, 6]]; // [open, high, low, close]
var length = 2; // default = 14
ta.bop(data, length);
// output (array)
// [1, 0.5]
```
#### <a name="fi"></a>Force Index
```javascript
var data = [[1.4, 200], [1.5, 240], [1.1, 300], [1.2, 240], [1.5, 400]]; // [close, volume]
var length = 4; // default = 13
ta.fi(data, length);
// output (array)
// [0.0075]
```
#### <a name="asi"></a>Accumulative Swing Index
```javascript
var data = [[7, 6, 4], [9, 7, 5], [9, 8, 6]]; // [high, close, low]
ta.asi(data);
// output (array)
// [0, -12.5]
```
#### <a name="ao"></a>Awesome Oscillator
```javascript
var data = [[6, 5], [8, 6], [7, 4], [6, 5], [7, 6], [9, 8]]; // [high, low]
var shortlength = 2;
var longlength = 5;
ta.ao(data, shortlength, longlength);
// output (array)
// [0, 0.9]
```
#### <a name="pr"></a>Williams %R
```javascript
var data = [2, 1, 3, 1, 2];
var length = 4; // default = 14
ta.pr(data, length);
// output (array)
// [-0, -100, -50]
```
#### <a name="stoch"></a>Stochastics
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
#### <a name="std"></a>Standard Deviation
```javascript
var data = [1, 2, 3];
var length = 3; // default = data.length
ta.std(data, length);
// output (float)
// 0.81649658092773
```
#### <a name="cor"></a>Correlation
```javascript
var data1 = [1, 2, 3, 4, 5, 2];
var data2 = [1, 3, 2, 4, 6, 3];
ta.cor(data1, data2);
// output (float)
// 0.8808929232684737
```
#### <a name="dif"></a>Percentage Difference
```javascript
var newval = 0.75;
var oldval = 0.5;
ta.dif(newval, oldval);
// output (float)
// 0.5
```
#### <a name="median"></a>Median
```javascript
var data = [4, 6, 3, 1, 2, 5];
var length = 4; // default = data.length
ta.median(data, length);
// output (array)
// [3, 2, 2]
```
#### <a name="bands"></a>Bollinger Bands
```javascript
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bands(data, length, deviations);
// output (array)
// [[5.828, 3, 0.172], [6.828, 4, 1.172]]
// [upper band, middle band, lower band]
```
#### <a name="bandwidth"></a>Bollinger Bandwidth
```javascript
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bandwidth(data, length, deviations);
// output (array)
// [1.886, 1.344]
```
#### <a name="kelt"></a>Keltner Channels
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1], [3,3,1]]; // [high, close, low]
var length = 5; // default = 14
var deviations = 1; // default = 1
ta.keltner(data, length, deviations);
// output (array)
// [[3.93, 2.06, 0.20]]
// [upper band, middle band, lower band]
```
#### <a name="don"></a>Donchian Channels
```javascript
var data = [[6, 2], [5, 2], [5, 3], [6, 3], [7, 4], [6, 3]]; // [high, low]
var length = 5; // default = 20
ta.don(data, length);
// output (array)
// [[7, 4.5, 2], [7, 4.5, 2]]
// [upper band, base line, lower band]
```
#### <a name="ichi"></a>Ichimoku Cloud
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
#### <a name="atr"></a>Average True Range (ATR)
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]]; // [high, close, low]
var length = 3; // default = 14
ta.atr(data, length);
// output (array)
// [2, 1.667, 2.111, 1.741]
```
#### <a name="aroon-up"></a>Aroon Up
```javascript
var data = [5, 4, 5, 2];
var length = 3; // default = 10
ta.aroon.up(data, length);
// output (array)
// [66.67, 33.36]
```
#### <a name="aroon-down"></a>Aroon Down
```javascript
var data = [2, 5, 4, 5];
var length = 3; // default = 10
ta.aroon.down(data, length);
// output (array)
// [66.67, 33.36]
```
#### <a name="aroon-osc"></a>Aroon Oscillator
```javascript
var data = [2, 5, 4, 5];
var length = 3; // default = 25
ta.aroon.osc(data, length);
// output (array)
// [-33.36, 33.36]
```
#### <a name="mfi"></a>Money Flow Index
```javascript
var data = [[19, 13], [14, 38], [21, 25], [32, 17]]; // [buy volume, sell volume]
var length = 3; // default = 14
ta.mfi(data, length);
// output (array)
// [41.54, 45.58]
```
#### <a name="roc"></a>Rate Of Change
```javascript
var data = [1, 2, 3, 4];
var length = 3; // default = 14
ta.roc(data, length);
// output (array)
// [2, 1]
```
#### <a name="cop"></a>Coppock Curve
```javascript
var data = [3, 4, 5, 3, 4, 5, 6, 4, 7, 5, 3, 5, 4];
var length1 = 4; // (ROC period 1) default = 11
var length2 = 6; // (ROC period 2) default = 14
var length3 = 5; // (WMA smoothing period) default = 10
ta.cop(data, length1, length2, length3);
// output (array)
// [0.376, 0.237]
```
#### <a name="kst"></a>Know Sure Thing
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
// [[-0.68, -0.52], [-0.29, -0.58]]
// [kst line, signal line]
```
#### <a name="obv"></a>On-Balance Volume
```javascript
var data = [[25200, 10], [30000, 10.15], [25600, 10.17], [32000, 10.13]]; // [asset volume, close price]
ta.obv(data);
// output (array)
// [0, 30000, 55600, 23600]
```
#### <a name="vwap"></a>Volume-Weighted Average Price
```javascript
var data = [[127.21, 89329], [127.17, 16137], [127.16, 23945]]; // [average price, volume (quantity)]
var length = 2; // default = data.length
ta.vwap(data, length);
// output (array)
// [127.204, 127.164]
```
#### <a name="mom_osc"></a>Chande Momentum Oscillator
```javascript
var data = [1, 1.2, 1.3, 1.3, 1.2, 1.4];
var length = 4; // default = 9
ta.mom_osc(data, length);
// output (array)
// [31.6, -31.6]
```
#### <a name="mom"></a>Momentum
```javascript
var data = [1, 1.1, 1.2, 1.24, 1.34];
var length = 4; // default = 10
var percentage = false; // default = false (true returns percentage)
ta.mom(data, length, percentage);
// output (array)
// [0.24, 0.24]
```
#### <a name="ha"></a>Heikin Ashi
```javascript
var data = [[3, 4, 2, 3], [3, 6, 3, 5], [5, 5, 2, 3]]; // [open, high, low, close]
ta.ha(data);
// output (array)
// [open, high, low, close]
// first 7-10 candles are unreliable
```
#### <a name="ren"></a>Renko
```javascript
var data = [[8, 6], [9, 7], [9, 8]]; // [high, low]
var bricksize = 3;
ta.ren(data, bricksize);
// output (array)
// [open, high, low, close]
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
