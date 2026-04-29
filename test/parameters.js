module.exports = {
  'sma': {in: [[1,2,3,4,5,6,10],6], out: [3.5, 5]},
  // reference: Wilder SMMA recurrence by hand. Seed = SMA(first 5) = 3.
  // Step: prev + (price - prev)/5. [1..5,6,10] → [3, 3.6, 4.88]. Output length = N - length + 1.
  'smma': {in: [[1,2,3,4,5,6,10],5], out: [3, 3.6, 4.88]},
  'wma': {in: [[69,68,66,70,68],4], out: [68.3, 68.2]},
  'cwma': {in: [[69,68,66,70,68,69], [1,2,3,5,8]], out: [68.26315789473684, 68.52631578947368]},
  'pwma': {in: [[17,26,23,29,20],4], out: [24.090909090909093, 25.18181818181818]},
  'hwma': {in: [[54,51,86,42,47],4], out: [56.2, 55]},
  'hull': {in: [[6,7,5,6,7,4,5,7],6], out: [4.761904761904762, 5.476190476190476]},
  'kama': {in: [[8,7,8,9,7,9],2,4,8], out: [8, 8.64, 8.377600000000001, 8.377600000000001]},
  'vwma': {in: [[[1,59],[1.1,82],[1.21,27],[1.42,73],[1.32,42]],4], out: [1.184771784232365, 1.258794642857143]},
  'ema': {in: [[1,2,3,4,5,6,10],6], out: [3.5, 5.357142857142857]},
  'wsma': {in: [[1,2,3,4,5,6,10],6], out: [3.5, 4.583333333333333]},
  'lsma': {in: [[5,6,6,3,4,6,7],6], out: [4.714285714285714, 5.761904761904762]},
  'macd': {in: [[1, 2, 3, 4, 5, 6, 14], 3, 6], out: [1.5, 3]},
  // reference: Wilder's recurrence (TA-Lib RSI). Seed = simple avg of first `length` deltas.
  // Step: avg' = (avg*(length-1) + new) / length. RSI = 100 - 100/(1 + avgG/avgL).
  'rsi': {in: [[1, 2, 3, 4, 5, 6, 7, 5, 6, 4], 6], out: [100, 71.42857142857143, 75.60975609756098, 55.95667870036102]},
  'wrsi': {in: [[1, 2, 3, 4, 5, 6, 7, 5, 6], 6], out: [100, 71.42857142857143, 75.60975609756098]},
  'tsi': {in: [[1.32, 1.27, 1.42, 1.47, 1.42, 1.45, 1.59], 3, 2, 2], out: [[0.3268608414239478, 0.32038834951456274], [0.5795418491021003, 0.7058823529411765]]},
  'bop': {in: [[[4, 5, 4, 5], [5, 6, 5, 6], [6, 8, 5, 6]], 2], out: [1, 0.5]},
  'fi': {in: [[[1.4, 200], [1.5, 240], [1.1, 300], [1.2, 240], [1.5, 400]], 4], out: [12.00000000000001]},
  'asi': {in: [[[7, 6, 4], [9, 7, 5], [9, 8, 6]]], out: [0, -12.5]},
  'ao': {in: [[[6, 5], [8, 6], [7, 4], [6, 5], [7, 6], [9, 8]], 2, 5], out: [0.0, 0.9000000000000004]},
  'pr': {in: [[2, 1, 3, 1, 2], 4], out: [-100, -50]},
  // reference: canonical TA-Lib stoch. Raw %K = 100*(C - rollingMin(L)) / (rollingMax(H) - rollingMin(L)).
  // Smoothed %K = SMA(rawK, smoothk); %D = SMA(smoothedK, smoothd). Output starts at i = length-1
  // (v1.x had an off-by-one that dropped the first valid bar). length=2, smoothk=smoothd=1 →
  // smoothing is identity, so each row is [rawK, rawK]. Bar 1: 100*(2-1)/(3-1)=50.
  // Bar 2: 100*(3-1)/(4-1)=66.67. Bar 3: 100*(2-1)/(4-1)=33.33.
  'stoch': {in: [[[3,2,1], [2,2,1], [4,3,1], [2,2,1]], 2, 1, 1], out: [[50, 50], [66.66666666666667, 66.66666666666667], [33.333333333333336, 33.333333333333336]]},
  'variance': {in: [[6, 7, 2, 3, 5, 8, 6, 2], 7], out: [3.918367346938776, 5.061224489795919]},
  'std': {in: [[1, 2, 3], 3], out: 0.816496580927726},
  // reference: rolling population std-dev via running Σx + Σx². Three windows of an
  // arithmetic-progression input all yield the same pop-std (window step is 1 and
  // length is fixed). std([1,2,3]) = std([2,3,4]) = std([3,4,5]) = sqrt(2/3).
  'std_series': {in: [[1,2,3,4,5], 3], out: [0.816496580927726, 0.816496580927726, 0.816496580927726]},
  'normsinv': {in: [0.4732], out: -0.06722824471054376},
  'cor': {in: [[1, 2, 3, 4, 5, 2], [1, 3, 2, 4, 6, 3]], out: 0.8808929232684737},
  'dif': {in: [0.75, 0.5], out: 0.5},
  'drawdown': {in: [[1,2,3,4,2,3]], out: -0.5},
  // reference: standard median definition. Even window length → average of the two middle
  // sorted values. Window 1 [1,3,4,6] → (3+4)/2 = 3.5; window 2 [1,2,3,6] → 2.5; window 3 [1,2,3,5] → 2.5.
  'median': {in: [[4, 6, 3, 1, 2, 5], 4], out: [3.5, 2.5, 2.5]},
  'percentile': {in: [[[6,4,7], [5,3,6], [7,5,8]], 0.5], out: [6, 4, 7]},
  'kmeans': {in: [[2, 3, 4, 5, 3, 5, 7, 8, 6, 8, 6, 4, 2, 6], 4], out: [[ 4, 5, 5, 4 ], [ 7, 6, 6, 6 ], [ 8, 8 ], [ 2, 3, 3, 2 ]]},
  'normalize': {in: [[5,4,9,4], 0.1], out: [0.2222222222222222, 0.06349206349206349, 0.8571428571428571, 0.06349206349206349]},
  'denormalize': {in: [[5,4,9,4], [0.2222222222222222, 0.06349206349206349, 0.8571428571428571, 0.06349206349206349, 0.4444444444444444], 0.1], out: [5,4,9,4,6.4]},
  'normalize_pair': {in: [[10,12,11,13],[100,130,100,140]], out: [[55,55],[66,71.5],[60.5,54.99999999999999],[71.5,76.99999999999999]]},
  'normalize_from': {in: [[8,12,10,11], 100], out: [100,150,125,137.5]},
  // mad calls ta.median; cascades from the median convention change. Window 1 sorted [3,3,4,5,7,8]
  // → median 4.5 → adev sorted [0.5,0.5,1.5,1.5,2.5,3.5] → mad 1.5. Window 2 → mad 2.
  'mad': {in: [[3, 7, 5, 4, 3, 8, 9], 6], out: [1.5, 2]},
  'aad': {in: [[4, 6, 8, 6, 8, 9, 10, 11], 7], out: [1.6734693877551021, 1.469387755102041]},
  'ssd': {in: [[7, 6, 5, 7, 9, 8, 3, 5, 4], 7], out: [4.869731585445518, 4.9856938190329, 5.3718844791323335]},
  'bands': {in: [[1, 2, 3, 4, 5, 6], 5, 2], out: [[5.82842712474619, 3.0, 0.1715728752538097], [6.82842712474619, 4.0, 1.1715728752538097]]},
  'fibbands': {in: [[[1,59],[1.1,82],[1.21,27],[1.42,73],[1.32,42]], 4, 3], out: [[1.6526058894448858,1.542197040614731,1.4738932612537028,1.4186888368386255,1.363484412423548,1.29518063306252,1.184771784232365,1.0743629354022102,1.0060591560411822,0.9508547316261047,0.8956503072110273,0.8273465278499992,0.7169376790198443],[1.6177775811703725,1.5330576077284503,1.4806460987347188,1.4382861120137578,1.3959261252927968,1.3435146162990652,1.258794642857143,1.1740746694152209,1.1216631604214893,1.0793031737005283,1.0369431869795673,0.9845316779858357,0.8998117045439136]]},
  'bandwidth': {in: [[1, 2, 3, 4, 5, 6], 5, 2], out: [1.8856180831641265, 1.414213562373095]},
  // Keltner inherits ATR's shape change (now data.length-length+1 values, no compensating splice)
  // and ATR's true-range fix (|H-Cprev|, |L-Cprev| use abs). Center band unchanged.
  'keltner': {in: [[[3,2,1], [2,2,1], [4,3,1], [2,2,1], [3,3,1]], 5, 1], out: [[4.092266666666667, 2.066666666666667, 0.04106666666666703]]},
  'don': {in: [[[6, 2], [5, 2], [5, 3], [6, 3], [7, 4], [6, 3]], 5], out: [[7, 4.5, 2], [7, 4.5, 2]]},
  'ichimoku': {in: [[[6,3,2], [5,4,2], [5,4,3], [6,4,3], [7,6,4], [6,5,3], [7,6,5], [7,5,3], [8,6,5], [9,7,6], [8,7,6], [7,5,5],[6,5,4],[6,5,3],[6,3,2], [5,4,2]], 2, 4, 6, 4], out: [[7, 6, 10.5, 6, 5], [7.5, 6, 7.5, 5.5, 6], [6.5, 7, 8, 5, 5]]},
  // reference: TA-Lib true-range with absolute values, Wilder smoothing seeded by TR[0].
  // Output length = data.length - length + 1 (matches sibling MAs). For length=3 / 4 bars
  // → 2 values. Old fixture last value wrong: TR[3] should be max(H-L, |H-Cprev|, |L-Cprev|) = 2 (not 1).
  'atr': {in: [[[3,2,1], [2,2,1], [4,3,1], [2,2,1]], 3], out: [2.111111111111111, 2.074074074074074]},
  // Supertrend inherits ATR's true-range fix; bar 3 ATR shifts from 1.741 to 2.074 because
  // |L-Cprev|=2 is the new max for that bar. Center band unchanged.
  'supertrend': {in: [[[3,2,1], [2,2,1], [4,3,1], [2,2,1]], 3, 0.5], out: [[3.5555555555555554, 1.4444444444444444],[2.537037037037037, 0.462962962962963]]},
  'aroon_up': {in: [[5, 4, 5, 2], 3], out: [100, 50]},
  'aroon_down': {in: [[2, 5, 4, 5], 3], out: [0, 50]},
  'aroon_osc': {in: [[2, 5, 4, 5], 3], out: [50,50]},
  // reference: TA-Lib MFI on [[H,L,C,V], …]. Typical price = (H+L+C)/3.
  // Money flow = TP × V, signed by Δ TP. MFI = 100 × ΣposFlow / (Σpos + Σneg) over `length` deltas.
  // For this 5-bar input (length=3), tp = [9,11,10,12,11]; window 1 deltas {+, -, +} → pos=3090,neg=2000;
  // window 2 deltas {-, +, -} → pos=1440, neg=2880. Hand-computed.
  'mfi': {in: [[[10,8,9,100],[12,10,11,150],[11,9,10,200],[13,11,12,120],[12,10,11,80]], 3], out: [60.70726915520628, 33.333333333333336]},
  // reference: rate-of-change as percent (TA-Lib convention). Multiplied old fraction by 100.
  'roc': {in: [[1, 2, 3, 4], 3], out: [200, 100]},
  // cop and kst aggregate ROC outputs; both scale linearly by 100 with the ROC convention change.
  'cop': {in: [[3, 4, 5, 3, 4, 5, 6, 4, 7, 5, 4, 7, 5], 4, 6, 5], out: [37.55555555555556, 23.666666666666664]},
  'kst': {in: [[8, 6, 7, 6, 8, 9, 7, 5, 6, 7, 6, 8, 6, 7, 6, 8, 9, 9, 8, 6, 4, 6, 5, 6, 7, 8, 9], 5, 7, 10, 15, 5, 5, 5, 7, 4], out: [[-68.28231292517006, -51.74886621315193], [-29.393424036281182, -57.86281179138322], [35.17800453514739, -35.96882086167801]]},
  'obv': {in: [[[25200, 10], [30000, 10.15], [25600, 10.17], [32000, 10.13]]], out: [0, 30000, 55600, 23600]},
  'vwap': {in: [[[127.21, 89329], [127.17, 16137], [127.16, 23945]], 2], out: [127.20387973375304, 127.16402599670675]},
  // reference: Chande Momentum Oscillator (CMO). For length deltas: sumh = sum of positive
  // deltas, suml = sum of |negative| deltas. CMO = (sumh - suml) / (sumh + suml) * 100.
  // Window 1 deltas [+0.2, +0.1, 0, -0.1] → (0.3-0.1)/0.4*100 = 50. Window 2 deltas
  // [+0.1, 0, -0.1, +0.2] → (0.3-0.1)/0.4*100 = 50.
  'mom_osc': {in: [[1, 1.2, 1.3, 1.3, 1.2, 1.4], 4], out: [50, 50]},
  'mom': {in: [[1, 1.1, 1.2, 1.24, 1.34], 4], out: [0.24, 0.24]},
  'ha': {in: [[[3, 4, 2, 3], [3, 6, 3, 5], [5, 5, 2, 3]]], out: [[3, 4, 2, 3], [3, 6, 3, 4.25], [3.625, 5, 2, 3.75]]},
  'ren': {in: [[[8, 6], [9, 7], [9, 8], [13, 10]], 2], out: [[8, 10, 8, 10], [10, 12, 10, 12]]},
  // Replaced fixture: original input had OHLC tuples with L>H or H==L (range invalid),
  // which the old isNaN→0 guard silently swallowed. Per v2.0 NaN policy NaN propagates,
  // so the fixture now uses well-formed [H,C,L,V] tuples. Math (mfm = ((C-L)-(H-C))/(H-L); adl=mfm*V; chaikin = ema(adl,3) − ema(adl,10)) is unchanged.
  'chaikin_osc': {in: [[[6,3,2,100],[7,5,4,200],[8,6,5,150],[7,5,4,180],[9,8,7,120],[8,6,5,90]],2,4], out: [-0.9259259259259309, 14.802469135802468, 6.000823045267488]},
  'envelope': {in: [[6,7,8,7,6,7,8,7,8,7,8,7,8], 11, 0.05], out: [[7.540909090909091, 7.181818181818182, 6.822727272727272], [7.636363636363637, 7.2727272727272725, 6.909090909090908]]},
  'fractals': {in: [[[7,6],[8,6],[9,6],[8,5],[7,4],[6,3],[7,4],[8,5]]], out: [[false, false],[false,false],[true,false],[false,false],[false,false],[false,true],[false,false],[false,false]]},
  // reference: hand-traced on the bool fractal locations. Same fractal positions, but
  // up-bar emits high (data[i][0]); down-bar emits low (data[i][1]); else -1.
  // i=2 up at high=9; i=5 down at low=3. Two leading + two trailing pad rows of [-1,-1].
  'fractals_price': {in: [[[7,6],[8,6],[9,6],[8,5],[7,4],[6,3],[7,4],[8,5]], true], out: [[-1,-1],[-1,-1],[9,-1],[-1,-1],[-1,-1],[-1,3],[-1,-1],[-1,-1]]},
  'recent_high': {in: [[4,5,6,7,8,9,8,7,8,9,10,3,2,1], 3], out: {index: 10, value: 10}},
  'recent_low': {in: [[1,4,5,6,4,3,2,3,4,3,5,7,8,8,5], 4], out: {index: 6, value: 2}},
  'support': {in: [[4,3,2,5,7,6,5,4,7,8,5,4,6,7,5]], out: 4},
  'resistance': {in: [[5,7,5,5,4,6,5,4,6,5,4,3,2,4,3,2,1]], out: 6.428571428571429},
  'ac': {in: [[[6, 5], [8, 6], [7, 4], [6, 5], [7, 6], [9, 8]], 2, 4], out: [0.125, 0.5625]},
  'fib': {in: [1,2], out: [1,1.236,1.3820000000000001,1.5,1.6179999999999999,1.786,2,2.6180000000000003,3.618,4.618,5.236]},
  // reference: Williams Alligator/Gator on Wilder-SMMA jaw/teeth/lips
  // (jaw: SMMA(13), teeth: SMMA(8), lips: SMMA(5); shifts 8/5/3 bars). Spot-checked
  // jaw[2] = 7.72645 by hand from seed = 101/13 and two Wilder steps. Output is in
  // chronological order; length cascades from the corrected SMMA shape (N - length + 1).
  'alligator': {in: [[8,7,8,9,7,8,9,6,7,8,6,8,10,8,7,9,8,7,9,6,7,9]], out: [[7.726445152480656,7.813665029359981,7.6378735707815935],[7.78698224852071,7.929902890697122,8.047341963476992],[7.769230769230769,7.919889017939568,7.809177454346241]]},
  'gator': {in: [[8,7,8,9,7,8,9,6,7,8,6,8,10,8,7,9,8,7,9,6,7,9]], out: [[-0.08721987687932575,-0.17579145857838796],[-0.14292064217641176,-0.1174390727798702],[-0.1506582487087984,-0.1107115635933269]]},
  'standardize': {in: [[6,4,6,8,6]], out: [0, -1.5811388300841895, 0, 1.5811388300841895, 0]},
  'er': {in: [[0.02, -0.01, 0.03, 0.05, -0.03]], out: 0.011934565489708282},
  'ar': {in: [[0.02, -0.01, 0.03, 0.05, -0.03], 3], out: [0.03667479679633267, -0.053301281310417566]},
  'winratio': {in: [[0.01,0.02,-0.01,-0.03,-0.015,0.005]], out: 0.5},
  'avgwin': {in: [[0.01,0.02,-0.01,-0.03,-0.015,0.005]], out: 0.011666666666666665},
  'avgloss': {in: [[0.01,0.02,-0.01,-0.03,-0.015,0.005]], out: -0.018333333333333333},
  // shape: now data.length-len+1 (was data.length-len). Re-included the first window value.
  // Per Ehlers Fisher Transform; rolling-extremum loop replaces Math.min/max.apply.
  'fisher': {in: [[8,6,8,9,7,8,9,8,7,8,6,7], 9], out: [[-0.1104469157900972,0],[-0.018907501228583555, -0.1104469157900972], [-0.32522580129662043, -0.018907501228583555],[-0.4884829106274281, -0.32522580129662043]]},
  'cross': {in: [[3,4,5,4,3], [4,3,2,3,4]], out: [{index: 1, cross: true}, {index: 4, cross: false}]},
  'se': {in: [[34,54,45,43,57,38,49], 10], out: 2.4243661069253055},
  'kelly': {in: [[0.01,0.02,-0.01,-0.03,-0.015,0.045,0.005]], out: 0.14434748152632182},
  'zscore': {in: [[34,54,45,43,57,38,49], 5], out: [1.2664106627730554, -1.3314928442246727, 0.4078462733398033]},
  'log': {in: [[5, 14, 18, 28, 68, 103]], out: [1.6094379124341003, 2.6390573296152584, 2.8903717578961645, 3.332204510175204, 4.219507705176107, 4.634728988229636]},
  'exp': {in: [[1.6, 2.63, 2.89, 3.33, 4.22, 4.63]], out: [4.953032424395115, 13.873769902129904,17.993309601550315, 27.938341703236507, 68.03348428941965, 102.51406411049345]},
  // halftrend cascades through ta.atr (TR true-range fix); deviation arms shift accordingly.
  'halftrend': {in: [[[100,97,90],[101,98,94],[103,96,92],[106,100,95],[110,101,100],[112,110,105],[110,100,90],[103,100,97],[95,90,85],[94,80,80],[90,82,81],[85,80,70]], 6, 3, 2], out: [[110.13773148148148,100,89.86226851851852,'long'],[115.77674897119341,105,94.22325102880659,'long'],[111.32021604938272,100,88.67978395061728,'long'],[116.9335133744856,105,93.0664866255144,'long'],[111.94302983539094,100,88.05697016460906,'long'],[115.346579218107,105,94.653420781893,'long']]},
  'sum': {in: [[1,2,3,4,5]], out: 15},
  'covariance': {in: [[12,13,25,39],[67,45,32,21],4], out: [-165.8125]},
  'ncdf': {in: [13,10,2], out:0.9331737996110652},
  'zigzag': {in: [[[10,9], [12,10], [14,12], [15,13], [16,15], [11,10], [18,15]], 0.25], out:[9, 10.75, 12.5, 14.25, 16, 10, 18]},
  'zigzag_close': {in: [[6,7,8,9,10,12,9,8,5,3,3,3,5,7,8,9,11]], out: [6, 7.2, 8.4, 9.6, 10.8, 12, 10.5, 9, 7.5, 6, 4.5, 3, 4.6, 6.2, 7.800000000000001, 9.4, 11]},
  // reference: standard Wilder Parabolic SAR recurrence, hand-traced.
  // Downtrend extreme tracks the LOW (data[i][1]); fix extends fixture beyond the
  // last bug-quiet bar so the corrected branch is actually exercised.
  'psar': {in: [[[82.15,81.29],[81.89,80.64],[83.03,81.31],[83.30,82.65],[83.85,83.07],[83.90,83.11],[83.33,82.49],[84.30,82.3],[84.84,84.15],[85,84.11],[75.9,74.03],[76.58,75.39],[76.98,75.76],[78,77.17],[70.87,70.01],[70.50,69.50],[69.00,68.00],[68.50,67.50]], 0.02, 0.2], out: [81.29,82.15,80.64,80.64,80.7464,80.932616,81.17000672,81.3884061824,81.67956556416,82.0588176964608,85,85,84.7806,84.565588,84.35487624000001,83.78108119040002,82.92421631897602,81.73027901345795]},
  'macd_signal': {in: [[1, 2, 3, 4, 5, 6, 14, 8, 10, 11], 3, 6, 3], out: [2.107142857142857, 1.8380102040816328, 1.6534256559766765]},
  'macd_bars': {in: [[1, 2, 3, 4, 5, 6, 14, 8, 10, 11], 3, 6, 3], out: [-0.28571428571428603, -0.26913265306122436, -0.18458454810495661]},
  'permutations': {in: [[10,10,10]], out: 1000},
  'martingale': {in: [[-1,-1,1,1,-1,-1], 5], out: 20},
  'antimartingale': {in: [[1,1,-1,-1,1,1], 5], out: 20},
  'mse': {in: [[7,8,7,8,6,9],[6,8,8,9,6,8]], out: 0.6666666666666666},
  'cum': {in: [[3,5,7,5,10], 4], out: [20,27]},
  'vwwma': {in: [[[1,59],[1.1,82],[1.21,27],[1.42,73],[1.32,42]],4], out: [1.2618288590604028, 1.3160229445506693]},
  'elderray': {in: [[6,5,4,7,8,9,6,8], 7], out: [[2.571428571428571,-2.428571428571429],[2.2857142857142856,-2.7142857142857144]]},
  // reference: canonical Historical Volatility = population std-dev = sqrt(Σ(x-mean)²/N)
  // per window. v1.x had a double-sqrt bug (sqrt(ssd-result/N) where ssd already returned
  // sqrt(Σdev²)); v2.0 matches tulind.volatility. Window 1 [7,6,5,7,8,9,7,6] mean 6.875,
  // Σdev² 10.875, popStd ≈ 1.16592. Window 2 [6,5,7,8,9,7,6,5] mean 6.625, Σdev² 13.875, popStd ≈ 1.31696.
  'hv': {in: [[7,6,5,7,8,9,7,6,5], 8], out: [1.165922381636102,1.3169567191065923]},
  'pvalue': {in: [2,4], out: 0.061018363939899845},
  'rvi': {in: [[[4,6,3,3], [3,5,2,2], [2,5,2,4], [4,6,4,5], [5,7,4,4], [4,6,3,4], [4,7,3,5], [5,7,5,6], [6,8,6,6], [6,9,5,6], [6,8,6,7], [7,9,5,6],[6,7,4,5],[5,6,5,6],[6,8,5,5],[5,7,2,6]],8],out:[0.29878048780487804,0.21951219512195122,0.1589403973509934,0.16083916083916086,0.09859154929577463,0.05109489051094891]},
  'rvi_signal': {in:[[0.29878048780487804,0.21951219512195122,0.1589403973509934,0.16083916083916086,0.09859154929577463,0.05109489051094891]],out:[0.2027541389316547,0.1596104767996724,0.12148278468863555]},
  'rsi_divergence': {in:[[74,83,66,78,69,70,84,73,74,73,83],5], out: [0,0,1,0,1,0]},
  'divergence': {in:[[48,34,43,54,56,64,43],[76,74,43,55,34,32,45,47]], out: [0, 0, 1, 1, 0, 1]},
  'times_up': {in:[[5,6,7,8,7,6,5],3], out: [1, 0, 0, 0]},
  'times_down': {in: [[5,6,7,8,7,6,5],3], out: [0, 0, 0, 1]},
  'divergence_state': {in: [[48,34,43,54,56,64,43,51,52,53,55,51,48,45,40,42,44,45],[76,74,43,55,34,32,45,47,48,53,54,54,50,52,49,47,48,46],12,3], out:[['convergence'],['divergence'],['convergence'],['divergence'],['convergence'],['exaggerated_bearish']]},
  'return_negative': {in: [[0.02,0.01,-0.03,-0.01,0.005]], out: [-0.03,-0.01]},
  'return_positive': {in: [[0.02,0.01,-0.03,-0.01,0.005]], out: [0.02,0.01,0.005]},
  'expected_trails': {in: [100], out: 519},
  // reference: DEMA = 2·EMA − EMA(EMA). Hand-traced with ema(L=3) on [1,2,3,4,5,6,10]:
  // EMA = [2, 3, 4, 5, 7.5]; EMA(EMA) = [3, 4, 5.75]. DEMA aligns at the tail (drop first 2 of EMA):
  // [2·4−3, 2·5−4, 2·7.5−5.75] = [5, 6, 9.25].
  'dema': {in: [[1,2,3,4,5,6,10], 3], out: [5, 6, 9.25]},
  // reference: TEMA = 3·EMA − 3·EMA(EMA) + EMA(EMA(EMA)). Hand-traced with L=3 on
  // [1,2,3,4,5,6,10,8,11]: EMA=[2,3,4,5,7.5,7.75,9.375]; EMA²=[3,4,5.75,6.75,8.0625];
  // EMA³=[4.25,5.5,6.78125]. Tail-aligned: [3·7.5−3·5.75+4.25, 3·7.75−3·6.75+5.5, 3·9.375−3·8.0625+6.78125]
  // = [9.5, 8.5, 10.71875].
  'tema': {in: [[1,2,3,4,5,6,10,8,11], 3], out: [9.5, 8.5, 10.71875]},
  // reference: TRIX = 100 · (EMA³[i] − EMA³[i−1]) / EMA³[i−1] (TA-Lib percent units).
  // Same EMA³=[4.25, 5.5, 6.78125] as TEMA fixture above; ROC pairs:
  // 100·(5.5−4.25)/4.25 = 29.41176…; 100·(6.78125−5.5)/5.5 = 23.29545…
  'trix': {in: [[1,2,3,4,5,6,10,8,11], 3], out: [29.41176470588235, 23.295454545454547]},
  // reference: Chaikin Accumulation/Distribution Line. mfm = ((C−L)−(H−C))/(H−L); adl
  // is the cumulative sum of mfm·V. Bars taken as [H,C,L,V] (matches existing chaikin_osc
  // fixture). Bar 0 mfm = ((3−2)−(6−3))/(6−2) = −0.5 → mfv = −50. Bar 1 mfm = −1/3 →
  // mfv = −200/3. Bar 2 mfm = −1/3 → mfv = −50. Bar 3 mfm = −1/3 → mfv = −60. Cumulative.
  'adl': {in: [[[6,3,2,100],[7,5,4,200],[8,6,5,150],[7,5,4,180]]], out: [-50, -116.66666666666666, -166.66666666666666, -226.66666666666666]},
  // reference: Lambert CCI. TP = (H+L+C)/3; CCI = (TP−SMA(TP)) / (0.015·MAD). HCL bars.
  // tp = [9, 11, 10, 12, 11]. Window 1 mean=10, MAD=2/3 → CCI=(10−10)/(0.01)=0. Window 2
  // mean=11, MAD=2/3 → CCI=(12−11)/(0.01)=100. Window 3 mean=11, MAD=2/3 → 0.
  'cci': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10]], 3], out: [0, 100.00000000000001, 0]},
  // reference: Williams Ultimate Oscillator. For each bar i≥1, BP = C−min(L,Cprev),
  // TR = max(H,Cprev)−min(L,Cprev). Avg_n = ΣBP / ΣTR over last n bars; ULT = 100·(4·A1 +
  // 2·A2 + A3) / 7 with periods (2,3,4). HCL bars. BP=[2,1,2,1,2], TR=[3,2,3,2,3].
  // i=4: A2=4/7, A3=0.6, A4=0.6 → ULT≈59.184. i=5: A2=0.6, A3=0.625, A4=0.6 → ULT≈60.714.
  'ult': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2, 3, 4], out: [59.18367346938775, 60.714285714285715]},
  // reference: Wilder +DM in average form (sum of +DM[1..length] / length, then Wilder
  // smoothing). HCL bars; +DM bar k = max(H[k]−H[k−1], 0) when up-move > down-move else 0.
  // Raw +DM[1..5] = [2, 0, 2, 0, 2]. Length 2: seed = (2+0)/2 = 1; then (1·1 + 2)/2 = 1.5;
  // (1.5·1 + 0)/2 = 0.75; (0.75·1 + 2)/2 = 1.375.
  'pdm': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [1, 1.5, 0.75, 1.375]},
  // reference: Wilder −DM same as pdm but using max(L[k−1]−L[k], 0) when down-move > up-move.
  // Raw −DM[1..5] = [0, 1, 0, 1, 0]. Length 2: seed = 0.5; then 0.25; 0.625; 0.3125.
  'mdm': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [0.5, 0.25, 0.625, 0.3125]},
  // reference: TA-Lib +DI = 100 · smoothed(+DM) / smoothed(TR). Internal TR seed is
  // sum(TR[1..length])/length (TA-Lib convention, NOT ta.atr's TR[0]+Wilder convention).
  // Length 2: seed TR = (3+2)/2 = 2.5 → +DI[0] = 100·1/2.5 = 40. Matches ti.ADX.pdi /
  // debut.ADX.pdi exactly. Diverges from tulind which uses an early-output seeding.
  'pdi': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [40, 54.54545454545455, 31.57894736842105, 51.16279069767442]},
  // reference: TA-Lib −DI same construction with −DM. −DI[0] = 100·0.5/2.5 = 20. Matches
  // ti/debut.
  'mdi': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [20, 9.090909090909092, 26.31578947368421, 11.627906976744185]},
  // reference: DX = 100 · |+DI − −DI| / (+DI + −DI). Bar 1: 100·|40−20|/60 = 33.33….
  'dx': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [33.333333333333336, 71.42857142857142, 9.090909090909092, 62.96296296296297]},
  // reference: ADX = Wilder average of DX. Length 2: seed = (DX[0] + DX[1])/2 = 52.381…;
  // step (52.381·1 + 9.091)/2 = 30.736…; (30.736·1 + 62.963)/2 = 46.849…. Matches
  // ti.ADX.adx and debut.ADX.adx bit-for-bit.
  'adx': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [52.38095238095238, 30.735930735930737, 46.84944684944685]},
  // reference: ADXR = (ADX[i] + ADX[i − length + 1]) / 2. Length 2: pairs (ADX[1]+ADX[0])/2
  // and (ADX[2]+ADX[1])/2.
  'adxr': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [41.55844155844156, 38.79268879268879]},
  // reference: TA-Lib STOCHRSI = SMA-smoothed Stochastic of an RSI series. Hand-traced
  // with rsiL=2, stochL=2, smoothK=2, smoothD=2 on [10,11,12,11,10,11,12]:
  // RSI = [100, 50, 25, 62.5, 81.25]. rawK windows: [100,50]→0, [50,25]→0, [25,62.5]→100,
  // [62.5,81.25]→100. smoothK=2 SMA → fastK = [0, 50, 100]. smoothD=2 SMA → fastD = [25, 75].
  // Output pairs aligned at the tail: [[50, 25], [100, 75]].
  'stoch_rsi': {in: [[10,11,12,11,10,11,12], 2, 2, 2, 2], out: [[50, 25], [100, 75]]},
  // reference: TA-Lib TRIMA. Odd N: TRIMA = SMA(SMA(data, (N+1)/2), (N+1)/2). For
  // L=5 on [1..7]: SMA(d,3)=[2,3,4,5,6]; SMA([2,3,4,5,6],3)=[3,4,5]. Matches tulind.trima.
  'trima': {in: [[1,2,3,4,5,6,7], 5], out: [3, 4, 5]},
  // reference: tulind ZLEMA (streaming form). lag=floor((L−1)/2); alpha=2/(L+1);
  // prev=data[0]; per bar adj = 2·data[i] − data[i−lag] (or data[i] in warmup); prev =
  // α·adj + (1−α)·prev. Matches tulind.zlema bit-for-bit on this fixture.
  'zlema': {in: [[10,11,9,12,8,13,7], 4], out: [10, 10.8, 9.280000000000001, 11.568000000000001, 8.5408, 12.324480000000001, 7.794688000000001]},
  // reference: T3 (Tilson). T3 = c1·EMA⁶ + c2·EMA⁵ + c3·EMA⁴ + c4·EMA³ where
  // c1=−v³, c2=3v²+3v³, c3=−6v²−3v−3v³, c4=1+3v+v³+3v². For constant input T3=input
  // because c1+c2+c3+c4=1. Spot-checked output values for L=2, v=0.7 on linear input.
  't3': {in: [[1,2,3,4,5,6,7,8,9,10,11,12], 2, 0.7], out: [6.549999999999997, 7.550000000000001, 8.550000000000004, 9.549999999999997, 10.550000000000004, 11.550000000000004]},
  // reference: tulind VIDYA (Chande adaptive MA via std-dev ratio). lookback=longLength−2;
  // seed prev = data[longLength−2]; per bar k = std(short)/std(long); prev = α·k·data[i] +
  // (1−α·k)·prev. Matches tulind.vidya bit-for-bit on this fixture.
  'vidya': {in: [[2, 4, 3, 6, 5, 7, 8, 6, 9, 10], 2, 5, 0.2], out: [6, 5.929289321881345, 6.080710678118655, 6.192267103986121, 6.154560422638152, 6.758169308820896, 6.987401355340037]},
  // reference: PPO = 100 · MACD / EMA_slow. With same input as macd fixture
  // ([1..6, 14], 3, 6): MACD = [1.5, 3], EMA_slow = [3.5, 6.5] → PPO = [100·1.5/3.5,
  // 100·3/6.5] = [42.857…, 46.154…]. Tulind diverges in early bars (streaming EMA seed).
  'ppo': {in: [[1, 2, 3, 4, 5, 6, 14], 3, 6], out: [42.857142857142854, 46.15384615384615]},
  // reference: APO = MACD line (TA-Lib's APO == MACD with default EMA MA-type). Same
  // result as ta.macd on the macd fixture input.
  'apo': {in: [[1, 2, 3, 4, 5, 6, 14], 3, 6], out: [1.5, 3]},
  // reference: Chaikin Money Flow = ΣMFV / ΣV over `length` bars. Reuses chaikin_osc HCLV
  // fixture input ([H,C,L,V] tuples). MFV[i] = ((C−L)−(H−C))/(H−L) · V. With length=3,
  // window 1 (bars 0-2): ΣMFV/(100+200+150). Window 2 (bars 1-3): etc.
  'cmf': {in: [[[6,3,2,100],[7,5,4,200],[8,6,5,150],[7,5,4,180],[9,8,7,120],[8,6,5,90]], 3], out: [-0.37037037037037035, -0.3333333333333333, -0.24444444444444444, -0.23076923076923078]},
  // reference: NVI[0] = 1000. For each bar where V[i] < V[i−1]: NVI[i] = NVI[i−1]·C[i]/C[i−1].
  // Else NVI[i] = NVI[i−1]. Bars [C,V] = [9,100][10,150][11,200][12,180][11,120][13,90].
  // Bar 1,2: V up → no change. Bar 3: V down → 1000·12/11. Bar 4: V down → ·11/12 ≈ 1000.
  // Bar 5: V down → 1090.91·13/11 ≈ 1181.82. Matches tulind.nvi bit-for-bit.
  'nvi': {in: [[[9,100],[10,150],[11,200],[12,180],[11,120],[13,90]]], out: [1000, 1000, 1000, 1090.909090909091, 1000, 1181.8181818181818]},
  // reference: PVI mirror of NVI — increment when V[i] > V[i−1]. Bars 1,2 V up:
  // 1000·10/9 = 1111.11; 1111.11·11/10 = 1222.22. Bars 3-5 V down → no change.
  'pvi': {in: [[[9,100],[10,150],[11,200],[12,180],[11,120],[13,90]]], out: [1000, 1111.111111111111, 1222.2222222222222, 1222.2222222222222, 1222.2222222222222, 1222.2222222222222]},
  // reference: tulind KVO algorithm (streaming EMA from prev=0). HCLV bars. trend = sign(HLC
  // − HLCprev); cm carries on trend continuation, else cm = range[i] + range[i−1]; vf =
  // V·|2·range/cm − 1|·trend·100. KVO = streamingEMA(vf, fast) − streamingEMA(vf, slow)
  // with seeds = 0. Matches tulind.kvo exactly on this 6-bar HCLV fixture.
  'kvo': {in: [[[10,9,8,100],[11,10,9,150],[12,11,10,200],[13,12,11,180],[12,11,10,120],[14,13,12,90]], 3, 5], out: [0, 1111.1111111111113, 1685.1851851851852, 95.67901234567853, -450.1028806584368]},
  // reference: tulind EMV (no parameter, scale=10000). Inputs [H,L,V] tuples. Per bar i≥1:
  // emv = ((H+L)/2 − (Hprev+Lprev)/2) · (H−L) · 10000 / V. Matches tulind.emv exactly.
  'emv': {in: [[[10,8,100],[11,9,150],[12,10,200],[13,11,180],[12,10,120],[14,12,90]]], out: [133.33333333333334, 100, 111.11111111111111, -166.66666666666666, 444.44444444444446]},
  // reference: NATR = 100 · ATR / Close. HCL bars (atr ordering, [H,C,L]). Length 2 reuses
  // the ADX-family fixture (atr matches tulind on this input). For each ATR output, divide
  // by close at bar i + length − 1. Matches tulind.natr exactly.
  'natr': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[12,11,10],[14,13,12]], 2], out: [22.727272727272727, 22.5, 21.875, 21.022727272727273, 20.432692307692307]},
  // reference: TA-Lib DPO. shift = floor(length/2) + 1; DPO[k] = data[k + length − 1 −
  // shift] − SMA(data, length)[k]. For length=4 on [9,10,11,12,11,13,12,14,13,15], shift=3
  // so DPO[k] = data[k] − SMA[k]. SMA windows mean = 10.5, 11, 11.75, 12, 11.5, 13, 12.5
  // → DPO = [9−10.5, 10−11, 11−11.75, 12−12, 10−11.5, 13−13, 12−13.5] (with shift fix).
  'dpo': {in: [[9,10,11,12,11,13,12,14,13,15], 4], out: [-1.5, -1, -0.75, 0, -1.5, 0, -1.5]},
  // reference: Mass Index = sum over `length` bars of EMA(range, 9) / EMA(EMA(range, 9), 9).
  // For constant range = 2 (linear H,L), both EMAs reduce to 2 → ratio = 1 → sum over
  // length=4 bars = 4. Matches tulind.mass exactly on this 21-bar fixture.
  'mass': {in: [[[10,8],[12,10],[14,12],[13,11],[15,13],[17,15],[16,14],[18,16],[20,18],[19,17],[21,19],[23,21],[22,20],[24,22],[26,24],[25,23],[27,25],[29,27],[28,26],[30,28],[32,30]], 4], out: [4, 4]},
  // reference: Ulcer Index. drawdown_pct[i] = 100 · (data[i] − max(data, last `length` bars))
  // / max. Ulcer[k] = sqrt(mean(drawdown_pct² over `length` bars)). Hand-computed for
  // [10,12,11,8,9,7,11,13] L=3.
  'ulcer': {in: [[10, 12, 11, 8, 9, 7, 11, 13], 3], out: [4.811252243246882, 19.837301190396804, 22.443514786772667, 25.40024136369333, 16.577149663422453, 12.830005981991683]},
  // reference: Vortex Indicator. HCL bars. Per bar i≥1: VM+ = |H[i] − L[i−1]|, VM− =
  // |L[i] − H[i−1]|, TR = standard true range. Rolling sums over `length` bars; VI± =
  // ΣVM± / ΣTR. Output array of [VI+, VI−] pairs. Hand-traced for length=2.
  'vortex': {in: [[[10,9,8],[12,11,10],[11,10,9],[13,12,11],[15,14,13]], 2], out: [[1, 0.6], [1, 0.6], [1.3333333333333333, 0]]},
  // reference: KDJ = Stochastic + J-line where J = 3K − 2D. Reuses ta.stoch via the
  // registry (smoothK/smoothD == SMA periods on rawK and on K). Output triples [K, D, J].
  // For length=2/sK=1/sD=1 on the existing stoch fixture: K==D==rawK so J==K.
  'kdj': {in: [[[3,2,1], [2,2,1], [4,3,1], [2,2,1]], 2, 1, 1], out: [[50, 50, 50], [66.66666666666667, 66.66666666666667, 66.66666666666666], [33.333333333333336, 33.333333333333336, 33.33333333333333]]},
  // reference: TA-Lib LINEARREG_SLOPE. Reuses the existing lsma fixture data
  // ([5,6,6,3,4,6,7], length=6). x = 0..length−1. Slope = (N·ΣxY − Σx·ΣY) / (N·Σx² − (Σx)²).
  // Window 1: m = (6·73 − 15·30) / (6·55 − 225) = −12/105 = −0.11428…. Matches tulind exactly.
  'lr_slope': {in: [[5, 6, 6, 3, 4, 6, 7], 6], out: [-0.11428571428571428, 0.17142857142857143]},
  // reference: TA-Lib LINEARREG_INTERCEPT (b at x=0). b = (ΣY − m·Σx) / N. Matches tulind.
  'lr_intercept': {in: [[5, 6, 6, 3, 4, 6, 7], 6], out: [5.285714285714286, 4.904761904761904]},
  // reference: angle = atan(slope) · 180/π. Solo (tulind has no linregangle export).
  'lr_angle': {in: [[5, 6, 6, 3, 4, 6, 7], 6], out: [-6.519801751656986, 9.727578551401603]},
  // reference: TA-Lib TSF (Time Series Forecast) = m·length + b (one bar past the window).
  // Equivalent to lsma + slope. Matches tulind exactly.
  'tsf': {in: [[5, 6, 6, 3, 4, 6, 7], 6], out: [4.6, 5.933333333333333]}
}
