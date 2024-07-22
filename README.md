# Technical Analysis (ta.js)

ta.js is a JavaScript module for dealing with financial technical analysis.

#### NOTE
**A react compatible version of this package is available here:**
https://github.com/Bitvested/ta.web

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
https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md

#### Moving Averages
- [Simple Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sma)
- [Smoothed Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#smma)
- [Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#wma)
- [Exponential Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ema)
- [Hull Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#hull)
- [Least Squares Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#lsma)
- [Volume Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vwma)
- [Volume Weighted Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vwwma)
- [Wilder's Smoothing Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#wsma)
- [Parabolic Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pwma)
- [Hyperbolic Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#hwma)
- [Kaufman Adaptive Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kama)
- [Custom Weighted Moving Average](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cwma)
#### Indicators
- [Moving Average Convergence / Divergence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#macd)
- [MACD Signal](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#macd_signal)
- [MACD Bars](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#macd_bars)
- [Relative Strength Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rsi)
- [Wilder's Relative Strength Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#wrsi)
- [True Strength Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#tsi)
- [Balance Of Power](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#bop)
- [Force Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fi)
- [Accumulative Swing Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#asi)
- [Alligator Indicator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#alli)
- [Williams %R](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pr)
- [Stochastics](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#stoch)
- [Fibonacci Retracement](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fib)
- [Bollinger Bandwidth](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#bandwidth)
- [Ichimoku Cloud](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ichi)
- [Average True Range](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#atr)
- [Aroon Up](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aroon-up)
- [Aroon Down](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aroon-down)
- [Money Flow Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mfi)
- [Rate Of Change](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#roc)
- [Coppock Curve](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cop)
- [Know Sure Thing](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kst)
- [On-Balance Volume](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#obv)
- [Volume-Weighted Average Price](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#vwap)
- [Fractals](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fractals)
- [Crossover](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cross)
- [Momentum](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mom)
- [HalfTrend](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#half)
- [ZigZag](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#zigzag)
- [Parabolic SAR](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#psar)
- [SuperTrend](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#supertrend)
- [Elder Ray Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#elderray)
- [Historical Volatility](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#hv)
- [Relative Vigor Index](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rvi)
- [Relative Vigor Index Signal](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rvi_signal)
- [RSI Divergence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rsi_divergence)
- [Divergence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#divergence)
#### Oscillators
- [Alligator Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#gator)
- [Chande Momentum Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mom_osc)
- [Chaikin Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#chaikin_osc)
- [Aroon Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aroon-osc)
- [Awesome Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ao)
- [Accelerator Oscillator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ac)
- [Fisher Transform](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fish)
#### Bands
- [Bollinger Bands](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#bands)
- [Keltner Channels](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kelt)
- [Donchian Channels](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#don)
- [Fibonacci Bollinger Bands](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fibbands)
- [Envelope](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#env)
#### Statistics
- [Sum](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sum)
- [Standard Deviation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#std)
- [Variance](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#variance)
- [Normal CDF](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ncdf)
- [Inverse Normal Distribution](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#normsinv)
- [Monte Carlo Simulation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sim)
- [Percentile](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#perc)
- [Correlation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cor)
- [Covariance](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cov)
- [Percentage Difference](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dif)
- [Expected Return](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#er)
- [Abnormal Return](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ar)
- [Kelly Criterion](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kelly)
- [Martingale](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#martin)
- [Anti-Martingale](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#amartin)
- [Permutations](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#perm)
- [Expected Trails](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#expected_trails)
- [Winratio](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#winratio)
- [Average Win](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#avgwin)
- [Average Loss](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#avgloss)
- [Return Positive](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#return_positive)
- [Return Negative](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#return_negative)
- [Drawdown](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#drawdown)
- [Median](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#median)
- [Recent High](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rh)
- [Recent Low](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#rl)
- [Median Absolute Deviation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mad)
- [Average Absolute Deviation](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#aad)
- [Standard Error](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#stderr)
- [Sum Squared Differences](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ssd)
- [Logarithm](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#log)
- [Exponent](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#exp)
- [Normalize](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#norm)
- [Denormalize](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#dnorm)
- [Normalize Pair](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#normp)
- [Normalize From](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#normf)
- [Standardize](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#standard)
- [Z-Score](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#zscore)
- [P-Value](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pvalue)
- [K-means Clustering](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#kmeans)
- [Mean Squared Error](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#mse)
- [Cumulative](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#cum)
#### Random functions
- [Pseudo Random Number Generator](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#prng)
- [Pick Random](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#pick)
- [Random Range](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#range)
- [Random Float](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#float)
- [Random Order](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#order)
#### Chart Types
- [Heikin Ashi](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ha)
- [Renko](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#ren)
#### Miscellaneous
- [Fibonacci Sequence](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#fibnumbers)
- [Times Up](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#times_up)
- [Times Down](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#times_dn)
#### Experimental
- [Support Line](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#sup)
- [Resistance Line](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#res)
- [Divergence State](https://github.com/Bitvested/ta.js/blob/main/EXAMPLES.md#divergence_state)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
