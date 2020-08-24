# Technical Analysis (ta.js)

ta.js is a JavaScript module for dealing with financial technical analysis.

## Installation

Use the package manager npm to install ta.js.

```bash
npm install ta.js
```

## Usage

```javascript
const ta = require('ta.js');
```
Simple Moving Average (SMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 14
ta.sma(data, length);
// Output (Array)
// [3.5, 5]
```
Weighted Moving Average (WMA)
```javascript
var data = [69, 68, 66, 70, 68];
var length = 4; // default = 14
ta.wma(data, length);
// Output (Array)
// [68.3, 68.2]
```
Exponential Moving Average (EMA)
```javascript
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 12
ta.ema(data, length);
// Output (Array)
// [3.5, 5.357]
```
Moving Average Convergence / Divergence (MACD)
```javascript
var data = [1, 2, 3, 4, 5, 6, 14];
var length1 = 3; // default = 12
var length2 = 6; // default = 26
ta.macd(data, length1, length2);
// Output (Array)
// [1.5, 3]
```
Relative Strength Index (RSI)
```javascript
var data = [1, 2, 3, 4, 5, 6, 7, 5];
var length = 6; // default = 14
ta.rsi(data, length);
// Output (Array)
// [100, 75.55]
```
Standard Deviation
```javascript
var data = [1, 2, 3];
var length = 3; // default = data.length
ta.std(data, length);
// Output (Float)
// 0.81649658092773
```
Bollinger Bands
```javascript
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bands(data, length, deviations);
// Output (Array)
// [[5.828, 3, 0.172], [6.828, 4, 1.172]]
// [upper band, middle band, lower band]
```
Bollinger Bandwidth
```javascript
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bandwidth(data, length, deviations);
// Output (Array)
// [1.886, 1.344]
```
Average True Range (ATR)
```javascript
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]]; // [high, close, low]
var length = 3; // default = 14
ta.atr(data, length);
// Output (Array)
// [2, 1.667, 2.111, 1.741]
```
Aroon Up

```javascript
var data = [5, 4, 5, 2];
var length = 3; // default = 10
ta.aroon.up(data, length);
// Output (Array)
// [66.67, 33.36]
```
Aroon Down
```javascript
var data = [2, 5, 4, 5];
var length = 3; // default = 10
ta.aroon.down(data, length);
// Output (Array)
// [66.67, 33.36]
```
Aroon Oscillator
```javascript
var data = [2, 5, 4, 5];
var length = 3; // default = 25
ta.aroon.osc(data, length);
// Output (Array)
// [-33.36, 33.36]
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
