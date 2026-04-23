/* ta.js (c) Nino Kroesen. MIT License. */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/_registry.js
var require_registry = __commonJS({
  "src/_registry.js"(exports, module) {
    module.exports = {};
  }
});

// src/moving-averages/sma.js
var require_sma = __commonJS({
  "src/moving-averages/sma.js"(exports, module) {
    var ta = require_registry();
    function sma2(data, length = 14) {
      for (var i = length, sma3 = []; i <= data.length; i++) {
        var avg = ta.sum(data.slice(i - length, i));
        sma3.push(avg / length);
      }
      return sma3;
    }
    module.exports = sma2;
  }
});

// src/moving-averages/smma.js
var require_smma = __commonJS({
  "src/moving-averages/smma.js"(exports, module) {
    var ta = require_registry();
    function smma2(data, length = 14) {
      for (var i = length, smma3 = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), average = 0;
        for (var q in pl) average += pl[q];
        if (smma3.length <= 0) {
          smma3.push(average / length);
        } else {
          smma3.push((average - smma3[smma3.length - 1]) / length);
        }
      }
      smma3.splice(0, 1);
      return smma3;
    }
    module.exports = smma2;
  }
});

// src/moving-averages/wma.js
var require_wma = __commonJS({
  "src/moving-averages/wma.js"(exports, module) {
    var ta = require_registry();
    function wma2(data, length = 14) {
      for (var i = 1, weight = 0, wma3 = []; i <= length; i++) weight += i;
      for (var i = length; i <= data.length; i++) {
        var pl = data.slice(i - length, i), average = 0;
        for (var q in pl) average += pl[q] * (Number(q) + 1) / weight;
        wma3.push(average);
      }
      return wma3;
    }
    module.exports = wma2;
  }
});

// src/moving-averages/ema.js
var require_ema = __commonJS({
  "src/moving-averages/ema.js"(exports, module) {
    var ta = require_registry();
    function ema2(data, length = 12) {
      for (var i = length, ema3 = [], weight = 2 / (length + 1); i <= data.length; i++) {
        if (ema3.length > 0) {
          ema3.push((data[i - 1] - ema3[ema3.length - 1]) * weight + ema3[ema3.length - 1]);
          continue;
        }
        var pl = data.slice(i - length, i), average = 0;
        for (var q in pl) average += pl[q];
        ema3.push(average / length);
      }
      return ema3;
    }
    module.exports = ema2;
  }
});

// src/moving-averages/hull.js
var require_hull = __commonJS({
  "src/moving-averages/hull.js"(exports, module) {
    var ta = require_registry();
    function hull2(data, length = 14) {
      var pl = [], hma = [], ewma = ta.wma(data, length), sqn = Math.round(Math.sqrt(length)), first = ta.wma(data, Math.round(length / 2));
      first.splice(0, first.length - ewma.length);
      for (var i in ewma) {
        pl.push(first[i] * 2 - ewma[i]);
        if (pl.length >= sqn) {
          var h = ta.wma(pl, sqn);
          hma.push(h[0]);
          pl.splice(0, 1);
        }
      }
      return hma;
    }
    module.exports = hull2;
  }
});

// src/moving-averages/lsma.js
var require_lsma = __commonJS({
  "src/moving-averages/lsma.js"(exports, module) {
    var ta = require_registry();
    function lsma2(data, length = 25) {
      for (var i = length, lr = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0, sum_yy = 0, m, b;
        for (var q = 1; q <= length; q++) sum_x += q, sum_y += pl[q - 1], sum_xy += pl[q - 1] * q, sum_xx += q * q, sum_yy += pl[q - 1] * pl[q - 1];
        m = (sum_xy - sum_x * sum_y / length) / (sum_xx - sum_x * sum_x / length);
        b = sum_y / length - m * sum_x / length;
        lr.push(m * length + b);
      }
      return lr;
    }
    module.exports = lsma2;
  }
});

// src/moving-averages/vwma.js
var require_vwma = __commonJS({
  "src/moving-averages/vwma.js"(exports, module) {
    var ta = require_registry();
    function vwma2(data, length = 20) {
      data = data.map((x) => [x[0] * x[1], x[1]]);
      for (var i = length, vwma3 = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i);
        var totalv = 0, totalp = 0;
        for (var o = 0; o < pl.length; o++) {
          totalv += pl[o][1];
          totalp += pl[o][0];
        }
        vwma3.push(totalp / totalv);
      }
      return vwma3;
    }
    module.exports = vwma2;
  }
});

// src/moving-averages/vwwma.js
var require_vwwma = __commonJS({
  "src/moving-averages/vwwma.js"(exports, module) {
    var ta = require_registry();
    function vwwma2(data, length = 20) {
      data = data.map((x) => [x[0] * x[1], x[1]]);
      for (var i = 1, weight = 0; i <= length; i++) weight += i;
      for (var i = length, vwma2 = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i);
        var totalv = 0, totalp = 0;
        for (var q in pl) {
          totalv += pl[q][1] * (Number(q) + 1) / weight;
          totalp += pl[q][0] * (Number(q) + 1) / weight;
        }
        vwma2.push(totalp / totalv);
      }
      return vwma2;
    }
    module.exports = vwwma2;
  }
});

// src/moving-averages/wsma.js
var require_wsma = __commonJS({
  "src/moving-averages/wsma.js"(exports, module) {
    var ta = require_registry();
    function wsma2(data, length = 14) {
      for (var i = length, wsm = [], weight = 1 / length; i <= data.length; i++) {
        if (wsm.length > 0) {
          wsm.push((data[i - 1] - wsm[wsm.length - 1]) * weight + wsm[wsm.length - 1]);
          continue;
        }
        var pl = data.slice(i - length, i), average = 0;
        for (var q in pl) average += pl[q];
        wsm.push(average / length);
      }
      return wsm;
    }
    module.exports = wsma2;
  }
});

// src/moving-averages/pwma.js
var require_pwma = __commonJS({
  "src/moving-averages/pwma.js"(exports, module) {
    var ta = require_registry();
    function pwma2(data, length = 14) {
      for (var i = length / 2, b = length, weight = 0, wmaa = [], weights = []; i >= 1; i--, b--) {
        if (i % 1 !== 0) {
          i = Math.round(i);
          weight += i * b;
        } else {
          weights.push(i * b);
          weight += i * b * 2;
        }
        weights.unshift(i * b);
      }
      for (var i = length; i <= data.length; i++) {
        var average = 0, pl = data.slice(i - length, i);
        for (var a = length - 1; a >= 0; a--) average += pl[a] * weights[a] / weight;
        wmaa.push(average);
      }
      return wmaa;
    }
    module.exports = pwma2;
  }
});

// src/moving-averages/hwma.js
var require_hwma = __commonJS({
  "src/moving-averages/hwma.js"(exports, module) {
    var ta = require_registry();
    function hwma2(data, length = 14) {
      for (var i = 1, b = length, weight = 0, wmaa = [], weights = []; i <= length / 2; i++, b--) {
        if (i % 1 !== 0) {
          i = Math.round(i);
          weight += i * b;
        } else {
          weights.push(i * b);
          weight += i * b * 2;
        }
        weights.unshift(i * b);
      }
      for (var i = length; i <= data.length; i++) {
        var average = 0, pl = data.slice(i - length, i);
        for (var a = length - 1; a >= 0; a--) average += pl[a] * weights[a] / weight;
        wmaa.push(average);
      }
      return wmaa;
    }
    module.exports = hwma2;
  }
});

// src/moving-averages/kama.js
var require_kama = __commonJS({
  "src/moving-averages/kama.js"(exports, module) {
    var ta = require_registry();
    function kama2(data, len1 = 10, len2 = 2, len3 = 30) {
      for (var i = len1 + 1, ka = ta.sma(data, len1), ka = [ka[ka.length - 1]]; i < data.length; i++) {
        var vola = 0, change = Math.abs(data[i] - data[i - len1]);
        for (var a = 1; a < len1; a++) vola += Math.abs(data[i - a] - data[i - a - 1]);
        var sc = (change / vola * (2 / (len2 + 1) - 2 / (len3 + 1) + 2 / (len3 + 1))) ** 2;
        ka.push(ka[ka.length - 1] + sc * (data[i] - ka[ka.length - 1]));
      }
      return ka;
    }
    module.exports = kama2;
  }
});

// src/moving-averages/cwma.js
var require_cwma = __commonJS({
  "src/moving-averages/cwma.js"(exports, module) {
    var ta = require_registry();
    function cwma2(data, weights) {
      for (var i = weights.length, ma = []; i <= data.length; i++) {
        var pl = data.slice(i - weights.length, i), sum2 = 0, weight = 0;
        for (var q = 0; q < weights.length; q++) {
          sum2 += pl[q] * weights[q];
          weight += weights[q];
        }
        ma.push(sum2 / weight);
      }
      return ma;
    }
    module.exports = cwma2;
  }
});

// src/indicators/macd.js
var require_macd = __commonJS({
  "src/indicators/macd.js"(exports, module) {
    var ta = require_registry();
    function macd2(data, length1 = 12, length2 = 26) {
      if (length1 > length2) [length1, length2] = [length2, length1];
      var ema2 = ta.ema(data, length1), emb = ta.ema(data, length2), macd3 = [];
      ema2.splice(0, length2 - length1);
      for (var i = 0; i < emb.length; i++) macd3.push(ema2[i] - emb[i]);
      return macd3;
    }
    module.exports = macd2;
  }
});

// src/indicators/macd-signal.js
var require_macd_signal = __commonJS({
  "src/indicators/macd-signal.js"(exports, module) {
    var ta = require_registry();
    function macd_signal2(data, length1 = 12, length2 = 26, lengthsig = 9) {
      var ma = ta.macd(data, length1, length2), mas = ta.ema(ma, lengthsig);
      return mas;
    }
    module.exports = macd_signal2;
  }
});

// src/indicators/macd-bars.js
var require_macd_bars = __commonJS({
  "src/indicators/macd-bars.js"(exports, module) {
    var ta = require_registry();
    function macd_bars2(data, length1 = 12, length2 = 26, lengthsig = 9) {
      var ma = ta.macd(data, length1, length2), mas = ta.ema(ma, lengthsig), ret = [];
      ma.splice(0, ma.length - mas.length);
      for (var i in ma) ret.push(ma[i] - mas[i]);
      return ret;
    }
    module.exports = macd_bars2;
  }
});

// src/indicators/rsi.js
var require_rsi = __commonJS({
  "src/indicators/rsi.js"(exports, module) {
    var ta = require_registry();
    function rsi2(data, length = 14) {
      for (var i = length - 1, gain = 0, loss = 0, arrsi = [], pl = data.slice(0, length - 1); i < data.length; i++, gain = 0, loss = 0) {
        pl.push(data[i]);
        for (var q = 1; q < pl.length; q++) if (pl[q] - pl[q - 1] < 0) {
          loss += Math.abs(pl[q] - pl[q - 1]);
        } else {
          gain += pl[q] - pl[q - 1];
        }
        var rsi3 = 100 - 100 / (1 + gain / length / (loss / length));
        arrsi.push(rsi3);
        pl.splice(0, 1);
      }
      return arrsi;
    }
    module.exports = rsi2;
  }
});

// src/indicators/wrsi.js
var require_wrsi = __commonJS({
  "src/indicators/wrsi.js"(exports, module) {
    var ta = require_registry();
    function wrsi2(data, length = 14) {
      for (var i = 1, arrsi = [], u = [], d = []; i < data.length; i++) if (data[i] - data[i - 1] < 0) {
        d.push(Math.abs(data[i] - data[i - 1])), u.push(0);
      } else {
        d.push(0), u.push(data[i] - data[i - 1]);
      }
      d = ta.wsma(d, length), u = ta.wsma(u, length);
      for (var i in d) arrsi.push(100 - 100 / (1 + u[i] / d[i]));
      return arrsi;
    }
    module.exports = wrsi2;
  }
});

// src/indicators/tsi.js
var require_tsi = __commonJS({
  "src/indicators/tsi.js"(exports, module) {
    var ta = require_registry();
    function tsi2(data, long = 25, short = 13, signal = 13) {
      for (var i = 1, mom2 = [], abs = [], ts = [], tsi3 = []; i < data.length; i++) {
        mom2.push(data[i] - data[i - 1]);
        abs.push(Math.abs(data[i] - data[i - 1]));
      }
      var sma1 = ta.ema(mom2, long), sma2 = ta.ema(abs, long), ema1 = ta.ema(sma1, short), ema2 = ta.ema(sma2, short);
      for (var i = 0; i < ema1.length; i++) ts.push(ema1[i] / ema2[i]);
      var tma = ta.ema(ts, signal);
      ts.splice(0, ts.length - tma.length);
      for (var i = 0; i < tma.length; i++) tsi3.push([tma[i], ts[i]]);
      return tsi3;
    }
    module.exports = tsi2;
  }
});

// src/indicators/bop.js
var require_bop = __commonJS({
  "src/indicators/bop.js"(exports, module) {
    var ta = require_registry();
    function bop2(data, len = 14) {
      var bo = data.map((x) => (x[3] - x[0]) / (x[1] - x[2])), bo = ta.sma(bo, len);
      return bo;
    }
    module.exports = bop2;
  }
});

// src/indicators/fi.js
var require_fi = __commonJS({
  "src/indicators/fi.js"(exports, module) {
    var ta = require_registry();
    function fi2(data, length = 13) {
      for (var i = 1, pl = [], ff = []; i < data.length; i++) {
        pl.push((data[i][0] - data[i - 1][0]) * data[i][1]);
        if (pl.length >= length) {
          var vfi = ta.ema(pl, length);
          ff.push(vfi[vfi.length - 1]);
          pl.splice(0, 1);
        }
      }
      return ff;
    }
    module.exports = fi2;
  }
});

// src/indicators/asi.js
var require_asi = __commonJS({
  "src/indicators/asi.js"(exports, module) {
    var ta = require_registry();
    function asi2(data) {
      for (var i = 1, a = []; i < data.length; i++) {
        var c = data[i][1], cy = data[i - 1][1], h = data[i][0], hy = data[i - 1][0], l = data[i][2], ly = data[i - 1][2], k = hy - c > ly - c ? hy - c : ly - c, o = data[i][0], oy = data[i - 1][0], r, t = Math.max(data[i][0], data[i - 1][0]) - Math.min(data[i][2], data[i - 1][2]);
        if (h - cy > l - cy && h - cy > h - l) r = h - cy - (l - cy) / 2 + (cy - oy) / 4;
        if (l - cy > h - cy && l - cy > h - l) r = l - cy - (h - cy) / 2 + (cy - oy) / 4;
        if (h - l > h - cy && h - l > l - cy) r = h - l + (cy - oy) / 4;
        a.push(50 * ((cy - c + (cy - oy) / 2 + (c - o) / 2) / r) * k / t);
      }
      return a;
    }
    module.exports = asi2;
  }
});

// src/indicators/alligator.js
var require_alligator = __commonJS({
  "src/indicators/alligator.js"(exports, module) {
    var ta = require_registry();
    function alligator2(data, jl = 13, tl = 8, ll = 5, js = 8, ts = 5, ls = 3) {
      var ret = [], jaw = ta.smma(data, jl), teeth = ta.smma(data, tl), lips = ta.smma(data, ll);
      teeth.splice(0, teeth.length - jaw.length);
      lips.splice(0, lips.length - jaw.length);
      for (var i = jaw.length - 1; i >= 7; i--) ret.push([jaw[i - (js - 1)], teeth[i - (ts - 1)], lips[i - (ls - 1)]]);
      return ret;
    }
    module.exports = alligator2;
  }
});

// src/indicators/pr.js
var require_pr = __commonJS({
  "src/indicators/pr.js"(exports, module) {
    var ta = require_registry();
    function pr2(data, length = 14) {
      for (var i = length, n = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), highd = Math.max.apply(null, pl), lowd = Math.min.apply(null, pl);
        n.push((highd - data[i - 1]) / (highd - lowd) * -100);
      }
      return n;
    }
    module.exports = pr2;
  }
});

// src/indicators/stoch.js
var require_stoch = __commonJS({
  "src/indicators/stoch.js"(exports, module) {
    var ta = require_registry();
    function stoch2(data, length = 14, smoothd = 3, smoothk = 3) {
      if (length < smoothd) [length, smoothd] = [smoothd, length];
      if (smoothk > smoothd) [smoothk, smoothd] = [smoothd, smoothk];
      for (var i = 0, stoch3 = [], high = [], low = [], ka = []; i < data.length; i++) {
        high.push(data[i][0]), low.push(data[i][2]);
        if (high.length >= length) {
          var highd = Math.max.apply(null, high), lowd = Math.min.apply(null, low), k = 100 * (data[i][1] - lowd) / (highd - lowd);
          ka.push(k);
        }
        if (smoothk > 0 && ka.length > smoothk) {
          var smoothedk = ta.sma(ka, smoothk);
          ka.push(smoothedk[smoothedk.length - 1]);
        }
        if (ka.length - smoothk >= smoothd) {
          var d = ta.sma(ka, smoothd);
          stoch3.push([k, d[d.length - 1]]);
          high.splice(0, 1);
          low.splice(0, 1);
          ka.splice(0, 1);
        }
      }
      return stoch3;
    }
    module.exports = stoch2;
  }
});

// src/indicators/fib.js
var require_fib = __commonJS({
  "src/indicators/fib.js"(exports, module) {
    var fib2 = (start, end) => [start, (end - start) * 0.236 + start, (end - start) * 0.382 + start, (end - start) * 0.5 + start, (end - start) * 0.618 + start, (end - start) * 0.786 + start, end, (end - start) * 1.618 + start, (end - start) * 2.618 + start, (end - start) * 3.618 + start, (end - start) * 4.236 + start];
    module.exports = fib2;
  }
});

// src/indicators/bandwidth.js
var require_bandwidth = __commonJS({
  "src/indicators/bandwidth.js"(exports, module) {
    var ta = require_registry();
    function bandwidth2(data, length = 14, deviations = 1) {
      for (var i = 0, boll = [], band = ta.bands(data, length, deviations); i < band.length; i++) boll.push((band[i][0] - band[i][2]) / band[i][1]);
      return boll;
    }
    module.exports = bandwidth2;
  }
});

// src/indicators/ichimoku.js
var require_ichimoku = __commonJS({
  "src/indicators/ichimoku.js"(exports, module) {
    var ta = require_registry();
    function ichimoku2(data, length1 = 9, length2 = 26, length3 = 52, length4 = 26) {
      for (var i = 0, pl = [], cloud = [], place = []; i < data.length; i++) {
        pl.push(data[i]);
        if (pl.length >= length3) {
          var highs = [], lows = [];
          for (var a in pl) highs.push(pl[a][0]), lows.push(pl[a][2]);
          var tsen = (Math.max.apply(null, highs.slice(highs.length - length1, highs.length)) + Math.min.apply(null, lows.slice(lows.length - length1, lows.length))) / 2, ksen = (Math.max.apply(null, highs.slice(highs.length - length2, highs.length)) + Math.min.apply(null, lows.slice(lows.length - length2, lows.length))) / 2, senka = data[i][1] + ksen, senkb = (Math.max.apply(null, highs.slice(highs.length - length3, highs.length)) + Math.min.apply(null, lows.slice(lows.length - length2, lows.length))) / 2;
          chik = data[i][1];
          place.push([tsen, ksen, senka, senkb, chik]);
          pl.splice(0, 1);
        }
      }
      for (var i = length4; i < place.length - length4; i++) {
        cloud.push([place[i][0], place[i][1], place[i + length4][2], place[i + length4][3], place[i - length4][4]]);
      }
      return cloud;
    }
    module.exports = ichimoku2;
  }
});

// src/indicators/atr.js
var require_atr = __commonJS({
  "src/indicators/atr.js"(exports, module) {
    var ta = require_registry();
    function atr2(data, length = 14) {
      for (var i = 1, atr3 = [data[0][0] - data[0][2]]; i < data.length; i++) {
        var t0 = Math.max(data[i][0] - data[i - 1][1], data[i][2] - data[i - 1][1], data[i][0] - data[i][2]);
        atr3.push((atr3[atr3.length - 1] * (length - 1) + t0) / length);
      }
      return atr3;
    }
    module.exports = atr2;
  }
});

// src/indicators/mfi.js
var require_mfi = __commonJS({
  "src/indicators/mfi.js"(exports, module) {
    var ta = require_registry();
    function mfi2(data, length = 14) {
      for (var i = length, mfi3 = [], n = data.map((x) => x[1]), p = data.map((x) => x[0]), pos = 0, neg = 0; i <= data.length; i++, pos = 0, neg = 0) {
        for (var q = i - length; q < i; q++) pos += p[q], neg += n[q];
        mfi3.push(100 - 100 / (1 + pos / neg));
      }
      return mfi3;
    }
    module.exports = mfi2;
  }
});

// src/indicators/roc.js
var require_roc = __commonJS({
  "src/indicators/roc.js"(exports, module) {
    var ta = require_registry();
    function roc2(data, length = 14) {
      for (var i = length, roc3 = []; i <= data.length; i++) roc3.push((data[i - 1] - data[i - length]) / data[i - length]);
      return roc3;
    }
    module.exports = roc2;
  }
});

// src/indicators/cop.js
var require_cop = __commonJS({
  "src/indicators/cop.js"(exports, module) {
    var ta = require_registry();
    function cop2(data, len1 = 11, len2 = 14, len3 = 10) {
      for (var max = Math.max(len1, len2), co = [], i = max + len3; i < data.length; i++) {
        var r1 = data.slice(i - (max + len3), i), r2 = r1.slice(), tmp = [];
        r1 = ta.roc(r1, len1), r2 = ta.roc(r2, len2), r1.splice(0, r1.length - r2.length), r2.splice(0, r2.length - r1.length);
        for (var a = 0; a < r1.length; a++) tmp.push(r1[a] + r2[a]);
        tmp = ta.wma(tmp, len3);
        co.push(tmp[tmp.length - 1]);
      }
      return co;
    }
    module.exports = cop2;
  }
});

// src/indicators/kst.js
var require_kst = __commonJS({
  "src/indicators/kst.js"(exports, module) {
    var ta = require_registry();
    function kst2(data, r1 = 10, r2 = 15, r3 = 20, r4 = 30, s1 = 10, s2 = 10, s3 = 10, s4 = 15, sig = 9) {
      for (var ks = [], fs = [], ms = Math.max(r1, r2, r3, r4) + Math.max(s1, s2, s3, s4), i = ms; i <= data.length; i++) {
        var pl = data.slice(i - ms, i), rcma1 = ta.roc(pl, r1), rcma2 = ta.roc(pl, r2), rcma3 = ta.roc(pl, r3), rcma4 = ta.roc(pl, r4);
        rcma1 = ta.sma(rcma1, s1);
        rcma2 = ta.sma(rcma2, s2);
        rcma3 = ta.sma(rcma3, s3);
        rcma4 = ta.sma(rcma4, s4);
        ks.push(rcma1[rcma1.length - 1] + rcma2[rcma2.length - 1] + rcma3[rcma3.length - 1] + rcma4[rcma4.length - 1]);
      }
      var sl = ta.sma(ks, sig);
      ks.splice(0, ks.length - sl.length);
      for (var i in sl) fs.push([ks[i], sl[i]]);
      return fs;
    }
    module.exports = kst2;
  }
});

// src/indicators/obv.js
var require_obv = __commonJS({
  "src/indicators/obv.js"(exports, module) {
    var ta = require_registry();
    function obv2(data) {
      for (var i = 1, obv3 = [0]; i < data.length; i++) {
        if (data[i][1] > data[i - 1][1]) obv3.push(obv3[obv3.length - 1] + data[i][0]);
        if (data[i][1] < data[i - 1][1]) obv3.push(obv3[obv3.length - 1] - data[i][0]);
        if (data[i][1] === data[i - 1][1]) obv3.push(obv3[obv3.length - 1]);
      }
      return obv3;
    }
    module.exports = obv2;
  }
});

// src/indicators/vwap.js
var require_vwap = __commonJS({
  "src/indicators/vwap.js"(exports, module) {
    var ta = require_registry();
    function vwap2(data, length = data.length) {
      data = data.map((x) => [x[0] * x[1], x[1]]);
      for (var i = length, vwap3 = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), totalv = 0, totalp = 0;
        for (var o = 0; o < pl.length; o++) totalv += pl[o][1], totalp += pl[o][0];
        vwap3.push(totalp / totalv);
      }
      return vwap3;
    }
    module.exports = vwap2;
  }
});

// src/indicators/fractals.js
var require_fractals = __commonJS({
  "src/indicators/fractals.js"(exports, module) {
    var ta = require_registry();
    function fractals2(data, price = false) {
      var fractals3 = !price ? [[false, false], [false, false]] : [[-1, -1], [-1, -1]];
      for (var i = 2; i < data.length - 2; i++) {
        var up = data[i - 2][0] < data[i][0] && data[i - 1][0] < data[i][0] && data[i][0] > data[i + 1][0] && data[i][0] > data[i + 2][0] ? !price ? true : data[i][0] : !price ? false : -1, down = data[i - 2][1] > data[i][1] && data[i - 1][1] > data[i][1] && data[i][1] < data[i + 1][1] && data[i][1] < data[i + 2][1] ? !price ? true : data[i][1] : !price ? false : -1;
        fractals3.push([up, down]);
      }
      !price ? fractals3.push([false, false], [false, false]) : fractals3.push([[-1, -1], [-1, -1]]);
      return fractals3;
    }
    module.exports = fractals2;
  }
});

// src/indicators/cross.js
var require_cross = __commonJS({
  "src/indicators/cross.js"(exports, module) {
    function cross2(d1, d2) {
      d1.splice(0, d1.length - d2.length);
      var cross3 = d1[0] > d2[0], indexes = [];
      for (var i = 0; i < d1.length; i++) {
        if (d1[i] < d2[i] && cross3) {
          indexes.push({ index: i, cross: false });
          cross3 = false;
        }
        if (d1[i] > d2[i] && !cross3) {
          indexes.push({ index: i, cross: true });
          cross3 = true;
        }
      }
      return indexes;
    }
    module.exports = cross2;
  }
});

// src/indicators/mom.js
var require_mom = __commonJS({
  "src/indicators/mom.js"(exports, module) {
    var ta = require_registry();
    function mom2(data, length = 10, p) {
      for (var i = length - 1, mom3 = []; i < data.length; i++) {
        p ? mom3.push(data[i] / data[i - (length - 1)] * 100) : mom3.push(data[i] - data[i - (length - 1)]);
      }
      return mom3;
    }
    module.exports = mom2;
  }
});

// src/indicators/halftrend.js
var require_halftrend = __commonJS({
  "src/indicators/halftrend.js"(exports, module) {
    var ta = require_registry();
    function halftrend2(data, atrlen, amplitude, deviation) {
      var out = [], nexttrend = [0], trend = [0], up = [0], down = [0], direction = void 0;
      for (var i = atrlen; i < data.length; i++) {
        var pl = data.slice(i - atrlen, i), maxlow = pl[pl.length - 2][2], minhigh = pl[pl.length - 2][0], atr2 = ta.atr(pl, atrlen);
        atr2 = atr2[atr2.length - 1] / 2;
        var dev = deviation * atr2, highprice = Math.max.apply(null, pl.map((x) => x[0])), lowprice = Math.min.apply(null, pl.map((x) => x[2])), highma = ta.sma(pl.slice(pl.length - amplitude).map((x) => x[0]), amplitude), lowma = ta.sma(pl.slice(pl.length - amplitude).map((x) => x[2]), amplitude);
        if (nexttrend[nexttrend.length - 1] == 1) {
          maxlow = Math.max(lowprice, maxlow);
          if (highma[0] < maxlow && pl[pl.length - 1][1] < pl[pl.length - 2][2]) {
            trend.push(1);
            nexttrend.push(0);
            minhigh = pl[pl.length - 2][0];
          }
        } else {
          minhigh = Math.min(highprice, minhigh);
          if (lowma[0] > minhigh && pl[pl.length - 1][1] < pl[pl.length - 2][0]) {
            trend.push(0);
            nexttrend.push(1);
            maxlow = lowprice;
          }
        }
        if (trend[trend.length - 1] == 0) {
          if (!isNaN(trend[trend.length - 2]) && trend[trend.length - 2] != 0) {
            up.push(isNaN(down[down.length - 2]) ? down[down.length - 1] : down[down.length - 2]);
          } else {
            up.push(isNaN(up[up.length - 2]) ? maxlow : Math.max(up[up.length - 2], maxlow));
          }
          direction = "long";
        } else {
          if (!isNaN(trend[trend.length - 2]) && trend[trend.length - 2] != 1) {
            down.push(isNaN(up[up.length - 2]) ? up[up.length - 1] : up[up.length - 2]);
          } else {
            down.push(isNaN(down[down.length - 2]) ? minhigh : Math.min(minhigh, down[down.length - 2]));
          }
          direction = "short";
        }
        var atrHigh = direction === "long" ? up[up.length - 1] + dev : down[down.length - 1] + dev, atrLow = direction === "long" ? up[up.length - 1] - dev : down[down.length - 1] - dev;
        out.push([atrHigh, trend[trend.length - 1] == 0 ? up[up.length - 1] : down[down.length - 1], atrLow, direction]);
      }
      return out;
    }
    module.exports = halftrend2;
  }
});

// src/indicators/zigzag.js
var require_zigzag = __commonJS({
  "src/indicators/zigzag.js"(exports, module) {
    var ta = require_registry();
    function zigzag2(data, perc = 0.05) {
      var indexes = [], min = Infinity, max = -Infinity, lmin = false, lmax = false, final = [];
      if (Array.isArray(data[0])) {
        for (var i = 0; i < data.length; i++) {
          if (lmin) {
            if (indexes[indexes.length - 1].value >= data[i][1]) {
              indexes[indexes.length - 1].value = data[i][1];
              indexes[indexes.length - 1].index = i;
            }
            if (min >= data[i][1]) min = data[i][1];
            var hdif = (data[i][0] - min) / min;
            if (hdif > perc) {
              indexes.push({ index: i, value: data[i][0] });
              lmax = true;
              lmin = false;
              min = Infinity;
            }
          } else if (lmax) {
            if (indexes[indexes.length - 1].value <= data[i][0]) {
              indexes[indexes.length - 1].value = data[i][0];
              indexes[indexes.length - 1].index = i;
            }
            if (max <= data[i][1]) max = data[i][1];
            var ldif = (max - data[i][1]) / data[i][1];
            if (ldif > perc) {
              indexes.push({ index: i, value: data[i][1] });
              lmin = true;
              lmax = false;
              max = -Infinity;
            }
          } else {
            if (min >= data[i][1]) min = data[i][1];
            if (max <= data[i][0]) max = data[i][0];
            var hdif = (data[i][0] - min) / min, ldif = (max - data[i][1]) / max;
            if (ldif > perc && hdif < perc) {
              lmin = true;
              indexes.push({ index: 0, value: data[0][0] });
              indexes.push({ index: i, value: data[i][1] });
            } else if (hdif > perc && ldif < perc) {
              lmax = true;
              indexes.push({ index: 0, value: data[0][1] });
              indexes.push({ index: i, value: data[i][0] });
            } else {
              if (ldif > hdif) {
                lmin = true;
                indexes.push({ index: 0, value: data[0][0] });
                indexes.push({ index: i, value: data[i][1] });
              } else {
                lmax = true;
                indexes.push({ index: 0, value: data[0][1] });
                indexes.push({ index: i, value: data[i][0] });
              }
            }
          }
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          if (lmin) {
            if (indexes[indexes.length - 1].value >= data[i]) {
              indexes[indexes.length - 1].value = data[i];
              indexes[indexes.length - 1].index = i;
            }
            if (min >= data[i]) min = data[i];
            var hdif = (data[i] - min) / min;
            if (hdif > perc) {
              indexes.push({ index: i, value: data[i] });
              lmax = true;
              lmin = false;
              min = Infinity;
            }
          } else if (lmax) {
            if (indexes[indexes.length - 1].value <= data[i]) {
              indexes[indexes.length - 1].value = data[i];
              indexes[indexes.length - 1].index = i;
            }
            if (max <= data[i]) max = data[i];
            var ldif = (max - data[i]) / data[i];
            if (ldif > perc) {
              indexes.push({ index: i, value: data[i] });
              lmin = true;
              lmax = false;
              max = -Infinity;
            }
          } else {
            if (min >= data[i]) min = data[i];
            if (max <= data[i]) max = data[i];
            var hdif = (data[i] - min) / min, ldif = (max - data[i]) / max;
            if (ldif > perc && hdif < perc) {
              lmin = true;
              indexes.push({ index: 0, value: data[0] });
              indexes.push({ index: i, value: data[i] });
            } else if (hdif > perc && ldif < perc) {
              lmax = true;
              indexes.push({ index: 0, value: data[0] });
              indexes.push({ index: i, value: data[i] });
            } else {
              if (ldif > hdif) {
                lmin = true;
                indexes.push({ index: 0, value: data[0] });
                indexes.push({ index: i, value: data[i] });
              } else {
                lmax = true;
                indexes.push({ index: 0, value: data[0] });
                indexes.push({ index: i, value: data[i] });
              }
            }
          }
        }
      }
      final = [indexes[0].value];
      for (var i = 1; i < indexes.length; i++) {
        var len = indexes[i].index - indexes[i - 1].index, delta = (indexes[i].value - indexes[i - 1].value) / len;
        for (var x = 1; x <= len; x++) final.push(x * delta + indexes[i - 1].value);
      }
      return final;
    }
    module.exports = zigzag2;
  }
});

// src/indicators/psar.js
var require_psar = __commonJS({
  "src/indicators/psar.js"(exports, module) {
    var ta = require_registry();
    function psar2(data, step = 0.02, max = 0.2) {
      var furthest = data[0], up = true, accel = step, prev = data[0], sar = data[0][1], extreme = data[0][0], final = [sar];
      for (var i = 1; i < data.length; i++) {
        sar = sar + accel * (extreme - sar);
        if (up) {
          sar = Math.min(sar, furthest[1], prev[1]);
          if (data[i][0] > extreme) {
            extreme = data[i][0];
            accel = Math.min(accel + step, max);
          }
        } else {
          sar = Math.max(sar, furthest[0], prev[0]);
          if (data[i][1] < extreme) {
            extreme = data[i][0];
            accel = Math.min(accel + step, max);
          }
        }
        if (up && data[i][1] < sar || !up && data[i][0] > sar) {
          accel = step;
          sar = extreme;
          up = !up;
          extreme = !up ? data[i][1] : data[i][0];
        }
        furthest = prev;
        prev = data[i];
        final.push(sar);
      }
      return final;
    }
    module.exports = psar2;
  }
});

// src/indicators/supertrend.js
var require_supertrend = __commonJS({
  "src/indicators/supertrend.js"(exports, module) {
    var ta = require_registry();
    function supertrend2(data, length = 20, multiplier = 3) {
      for (var i = length - 1, atr2 = ta.atr(data, length), trend = []; i < data.length; i++) {
        trend.push([(data[i][0] + data[i][2]) / 2 + multiplier * atr2[i], (data[i][0] + data[i][2]) / 2 - multiplier * atr2[i]]);
      }
      return trend;
    }
    module.exports = supertrend2;
  }
});

// src/indicators/elderray.js
var require_elderray = __commonJS({
  "src/indicators/elderray.js"(exports, module) {
    var ta = require_registry();
    function elderray2(data, length = 13) {
      for (var i = length, eld = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), low = Math.min.apply(void 0, pl), high = Math.max.apply(void 0, pl), em = ta.ema(pl, pl.length);
        eld.push([high - em[0], low - em[0]]);
      }
      return eld;
    }
    module.exports = elderray2;
  }
});

// src/indicators/hv.js
var require_hv = __commonJS({
  "src/indicators/hv.js"(exports, module) {
    var ta = require_registry();
    function hv2(data, length = 10) {
      for (var i = length, hv3 = []; i <= data.length; i++) {
        var ss = ta.ssd(data.slice(i - length, i)), vari = ss / length;
        hv3.push(Math.sqrt(vari));
      }
      return hv3;
    }
    module.exports = hv2;
  }
});

// src/indicators/rvi.js
var require_rvi = __commonJS({
  "src/indicators/rvi.js"(exports, module) {
    var ta = require_registry();
    function rvi2(data, len = 20) {
      for (var i = 3, num = [], dnom = [], rv = []; i < data.length; i++) {
        num.push((data[i][3] - data[i][0] + 2 * (data[i][3] - data[i - 1][0]) + 2 * (data[i][3] - data[i - 2][0]) + (data[i][3] - data[i - 3][0])) / 6);
        dnom.push((data[i][1] - data[i][2] + 2 * (data[i][1] - data[i - 1][2]) + 2 * (data[i][1] - data[i - 2][2]) + (data[i][1] - data[i - 3][2])) / 6);
        if (num.length >= len) {
          var sn = ta.sma(num, len), dn = ta.sma(dnom, len);
          rv.push(sn[0] / dn[0]);
          num.splice(0, 1);
          dnom.splice(0, 1);
        }
      }
      return rv;
    }
    module.exports = rvi2;
  }
});

// src/indicators/rvi-signal.js
var require_rvi_signal = __commonJS({
  "src/indicators/rvi-signal.js"(exports, module) {
    function rvi_signal2(rv) {
      for (var i = 3, sig = []; i < rv.length; i++) {
        sig.push((rv[i] + 2 * rv[i - 1] + 2 * rv[i - 2] + rv[i - 3]) / 6);
      }
      return sig;
    }
    module.exports = rvi_signal2;
  }
});

// src/indicators/rsi-divergence.js
var require_rsi_divergence = __commonJS({
  "src/indicators/rsi-divergence.js"(exports, module) {
    var ta = require_registry();
    function rsi_divergence2(data, length, rs) {
      if (!rs) rs = ta.wrsi;
      var rd = rs(data, length), out = [];
      data = ta.mom(data.slice(length - 1, data.length), 2);
      for (var i = 0; i < data.length; i++) {
        if (data[i] > 0 && rd[i] < 0 || data[i] < 0 && rd[i] > 0) {
          out.push(1);
        } else {
          out.push(0);
        }
      }
      return out;
    }
    module.exports = rsi_divergence2;
  }
});

// src/indicators/divergence.js
var require_divergence = __commonJS({
  "src/indicators/divergence.js"(exports, module) {
    function divergence2(data1, data2) {
      if (data1.length > data2.length) data1.splice(0, data1.length - data2.length);
      if (data2.length > data1.length) data2.splice(0, data2.length - data1.length);
      for (var i = 1, out = []; i < data1.length; i++) {
        if (data1[i] > data1[i - 1] && data2[i] < data2[i - 1] || data1[i] < data1[i - 1] && data2[i] > data2[i - 1]) {
          out.push(1);
        } else {
          out.push(0);
        }
      }
      return out;
    }
    module.exports = divergence2;
  }
});

// src/oscillators/gator.js
var require_gator = __commonJS({
  "src/oscillators/gator.js"(exports, module) {
    var ta = require_registry();
    function gator2(data, jl = 13, tl = 8, ll = 5, js = 8, ts = 5, ls = 3) {
      var ret = [], jaw = ta.smma(data, jl), teeth = ta.smma(data, tl), lips = ta.smma(data, ll);
      teeth.splice(0, teeth.length - jaw.length);
      lips.splice(0, lips.length - jaw.length);
      for (var i = jaw.length - 1; i >= js - 1; i--) ret.push([jaw[i - (js - 1)] - teeth[i - (ts - 1)], -Math.abs(teeth[i - (ts - 1)] - lips[i - (ls - 1)])]);
      return ret;
    }
    module.exports = gator2;
  }
});

// src/oscillators/mom-osc.js
var require_mom_osc = __commonJS({
  "src/oscillators/mom-osc.js"(exports, module) {
    var ta = require_registry();
    function mom_osc2(data, length = 10) {
      length++;
      for (var i = length, osc = [], sumh = 0, suml = 0; i <= data.length; i++, sumh = 0, suml = 0) {
        for (var a = 1; a < length; a++) data[i - length + (a - 1)] < data[i - length + a] ? sumh += data[i - length + a] : suml += data[i - length + a];
        osc.push((sumh - suml) / (sumh + suml) * 100);
      }
      return osc;
    }
    module.exports = mom_osc2;
  }
});

// src/oscillators/chaikin-osc.js
var require_chaikin_osc = __commonJS({
  "src/oscillators/chaikin-osc.js"(exports, module) {
    var ta = require_registry();
    function chaikin_osc2(data, ema1 = 3, ema2 = 10) {
      for (var i = 0, cha = [], adl = []; i < data.length; i++) {
        var mfm = (data[i][1] - data[i][2] - (data[i][0] - data[i][1])) / (data[i][0] - data[i][2]);
        isNaN(mfm) ? adl.push(0) : adl.push(mfm * data[i][3]);
      }
      var ef = ta.ema(adl, ema1), es = ta.ema(adl, ema2);
      if (ef.length > es.length) {
        ef.splice(0, ef.length - es.length);
      } else {
        es.splice(0, es.length - ef.length);
      }
      for (var i = 0; i < ef.length; i++) cha.push(ef[i] - es[i]);
      return cha;
    }
    module.exports = chaikin_osc2;
  }
});

// src/oscillators/ao.js
var require_ao = __commonJS({
  "src/oscillators/ao.js"(exports, module) {
    var ta = require_registry();
    function ao2(data, length1 = 5, length2 = 35) {
      data = data.map((x) => (x[0] + x[1]) / 2);
      for (var i = length2, a = []; i <= data.length; i++) {
        var pl = data.slice(i - length2, i);
        var f = ta.sma(pl, length1), s = ta.sma(pl, length2);
        a.push(f[f.length - 1] - s[s.length - 1]);
      }
      return a;
    }
    module.exports = ao2;
  }
});

// src/oscillators/ac.js
var require_ac = __commonJS({
  "src/oscillators/ac.js"(exports, module) {
    var ta = require_registry();
    function ac2(data, len1 = 5, len2 = 35) {
      var a = ta.ao(data, len1, len2), sm = ta.sma(a, len1), acr = [];
      if (a.length > sm.length) {
        a.splice(0, a.length - sm.length);
      } else {
        sm.splice(0, sm.length - a.length);
      }
      for (var i in a) acr.push(a[i] - sm[i]);
      return acr;
    }
    module.exports = ac2;
  }
});

// src/oscillators/fisher.js
var require_fisher = __commonJS({
  "src/oscillators/fisher.js"(exports, module) {
    var ta = require_registry();
    function fisher2(data, len) {
      var out = [], fish = 0, v1 = 0;
      for (var i = len; i <= data.length; i++) {
        var pl = data.slice(i - len, i), pf = fish, mn = Math.min.apply(null, pl), v1 = 0.33 * 2 * ((data[i - 1] - mn) / (Math.max.apply(null, pl) - mn) - 0.5) + 0.67 * v1;
        if (v1 > 0.99) v1 = 0.999;
        if (v1 < -0.99) v1 = -0.999;
        fish = 0.5 * Math.log((1 + v1) / (1 - v1)) + 0.5 * pf;
        out.push([fish, pf]);
      }
      return out.slice(1, out.length);
    }
    module.exports = fisher2;
  }
});

// src/bands/bands.js
var require_bands = __commonJS({
  "src/bands/bands.js"(exports, module) {
    var ta = require_registry();
    function bands2(data, length = 14, deviations = 1) {
      for (var i = 0, pl = [], deviation = [], boll = [], sma2 = ta.sma(data, length); i < data.length; i++) {
        pl.push(data[i]);
        if (pl.length >= length) {
          var devi = ta.std(pl, length);
          deviation.push(devi);
          pl.splice(0, 1);
        }
      }
      for (var i = 0; i < sma2.length; i++) {
        boll.push([sma2[i] + deviation[i] * deviations, sma2[i], sma2[i] - deviation[i] * deviations]);
      }
      return boll;
    }
    module.exports = bands2;
  }
});

// src/bands/keltner.js
var require_keltner = __commonJS({
  "src/bands/keltner.js"(exports, module) {
    var ta = require_registry();
    function keltner2(data, length = 14, devi = 1) {
      var closing = [], atr2 = ta.atr(data, length), kma, kelt = [];
      for (var i in data) closing.push((data[i][0] + data[i][1] + data[i][2]) / 3);
      kma = ta.sma(closing, length);
      atr2.splice(0, length - 1);
      for (var i = 0; i < kma.length; i++) kelt.push([kma[i] + atr2[i] * devi, kma[i], kma[i] - atr2[i] * devi]);
      return kelt;
    }
    module.exports = keltner2;
  }
});

// src/bands/don.js
var require_don = __commonJS({
  "src/bands/don.js"(exports, module) {
    var ta = require_registry();
    function don2(data, length = 20) {
      for (var i = length, channel = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), highs = [], lows = [];
        for (var h in pl) highs.push(pl[h][0]), lows.push(pl[h][1]);
        var max = Math.max.apply(null, highs.slice()), min = Math.min.apply(null, lows.slice());
        channel.push([max, (max + min) / 2, min]);
      }
      return channel;
    }
    module.exports = don2;
  }
});

// src/bands/fibbands.js
var require_fibbands = __commonJS({
  "src/bands/fibbands.js"(exports, module) {
    var ta = require_registry();
    function fibbands2(data, length = 20, deviations = 3) {
      for (var i = 0, pl = [], deviation = [], vwma2 = ta.vwma(data, length); i < data.length; i++) {
        pl.push(data[i][0]);
        if (pl.length >= length) {
          var devi = ta.std(pl, length);
          deviation.push(devi * deviations);
          pl.splice(0, 1);
        }
      }
      for (var i = 0, boll = []; i < vwma2.length; i++) {
        var upper1 = vwma2[i] + 0.236 * deviation[i], upper2 = vwma2[i] + 0.382 * deviation[i], upper3 = vwma2[i] + 0.5 * deviation[i], upper4 = vwma2[i] + 0.618 * deviation[i], upper5 = vwma2[i] + 0.764 * deviation[i], upper6 = vwma2[i] + deviation[i], lower1 = vwma2[i] - 0.236 * deviation[i], lower2 = vwma2[i] - 0.382 * deviation[i], lower3 = vwma2[i] - 0.5 * deviation[i], lower4 = vwma2[i] - 0.618 * deviation[i], lower5 = vwma2[i] - 0.764 * deviation[i], lower6 = vwma2[i] - deviation[i];
        boll.push([upper6, upper5, upper4, upper3, upper2, upper1, vwma2[i], lower1, lower2, lower3, lower4, lower5, lower6]);
      }
      return boll;
    }
    module.exports = fibbands2;
  }
});

// src/bands/envelope.js
var require_envelope = __commonJS({
  "src/bands/envelope.js"(exports, module) {
    var ta = require_registry();
    function envelope2(data, len = 10, p = 5e-3) {
      for (var i = len, enve = []; i < data.length; i++) {
        var sm = ta.sma(data.slice(i - len, i), len);
        enve.push([sm[0] * (1 + p), sm[0], sm[0] * (1 - p)]);
      }
      return enve;
    }
    module.exports = envelope2;
  }
});

// src/statistics/sum.js
var require_sum = __commonJS({
  "src/statistics/sum.js"(exports, module) {
    var ta = require_registry();
    var sum2 = (data) => data.reduce((a, b) => a + b);
    module.exports = sum2;
  }
});

// src/statistics/std.js
var require_std = __commonJS({
  "src/statistics/std.js"(exports, module) {
    var ta = require_registry();
    function std2(data, length = data.length) {
      if (length < data.length) data.splice(0, data.length - length);
      var mean = data.reduce((a, b) => a + b) / length;
      return Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / length);
    }
    module.exports = std2;
  }
});

// src/statistics/variance.js
var require_variance = __commonJS({
  "src/statistics/variance.js"(exports, module) {
    var ta = require_registry();
    function variance2(data, length = data.length) {
      for (var i = length, va = []; i <= data.length; i++) {
        var tmp = data.slice(i - length, i), mean = ta.sma(tmp, length), sm = 0;
        for (var x in tmp) sm += (tmp[x] - mean[mean.length - 1]) ** 2;
        va.push(sm / length);
      }
      return va;
    }
    module.exports = variance2;
  }
});

// src/statistics/ncdf.js
var require_ncdf = __commonJS({
  "src/statistics/ncdf.js"(exports, module) {
    function ncdf2(x, mean, std2) {
      x = !mean && !std2 ? x : (x - mean) / std2;
      var t = 1 / (1 + 0.2315419 * Math.abs(x)), d = 0.3989423 * Math.exp(-x * x / 2), p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return x > 0 ? 1 - p : p;
    }
    module.exports = ncdf2;
  }
});

// src/statistics/normsinv.js
var require_normsinv = __commonJS({
  "src/statistics/normsinv.js"(exports, module) {
    function normsinv2(p) {
      var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969, a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924, b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887, b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -0.00778489400243029, c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373, c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 0.00778469570904146, d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742, p_low = 0.02425, p_high = 1 - p_low;
      if (p < 0 || p > 1) return 0;
      if (p < p_low) {
        var q = Math.sqrt(-2 * Math.log(p));
        return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
      }
      if (p <= p_high) {
        var q = p - 0.5, r = q * q;
        return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
      }
      var q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    module.exports = normsinv2;
  }
});

// src/statistics/sim.js
var require_sim = __commonJS({
  "src/statistics/sim.js"(exports, module) {
    var ta = require_registry();
    function sim2(d, length = 50, sims = 1e3, perc) {
      for (var i = 0, sd = []; i < sims; i++) {
        var projected = d.slice();
        for (var x = 0; x < length; x++) {
          var change = [];
          for (var y = 1; y < projected.length; y++) {
            var df = ta.dif(projected[y], projected[y - 1]);
            change.push(df);
          }
          var mean = ta.sma(change, change.length), std2 = ta.std(change), random2 = ta.normsinv(Math.random());
          projected.push(projected[projected.length - 1] * Math.exp(mean[0] - std2 * std2 / 2 + std2 * random2));
        }
        sd.push(projected);
      }
      return !perc ? sd : ta.percentile(sd, perc);
    }
    module.exports = sim2;
  }
});

// src/statistics/percentile.js
var require_percentile = __commonJS({
  "src/statistics/percentile.js"(exports, module) {
    var ta = require_registry();
    function percentile2(data, perc) {
      for (var i = 0, final = []; i < data[0].length; i++) {
        data.sort((a, b) => a[i] - b[i]);
        final.push(data[Math.round((data.length - 1) * perc)][i]);
      }
      return final;
    }
    module.exports = percentile2;
  }
});

// src/statistics/cor.js
var require_cor = __commonJS({
  "src/statistics/cor.js"(exports, module) {
    var ta = require_registry();
    function cor2(data1, data2) {
      var d1avg = ta.sma(data1, data1.length), d2avg = ta.sma(data2, data2.length), sumavg = 0, sx = 0, sy = 0;
      for (var i = 0; i < data1.length; i++) {
        var x = data1[i] - d1avg, y = data2[i] - d2avg;
        sumavg += x * y, sx += Math.pow(x, 2), sy += Math.pow(y, 2);
      }
      var n = data1.length - 1;
      sx /= n, sy /= n, sx = Math.sqrt(sx), sy = Math.sqrt(sy);
      return sumavg / (n * sx * sy);
    }
    module.exports = cor2;
  }
});

// src/statistics/covariance.js
var require_covariance = __commonJS({
  "src/statistics/covariance.js"(exports, module) {
    var ta = require_registry();
    function covariance2(data1, data2, length) {
      var out = [], x_mean = ta.sma(data1, data1.length), y_mean = ta.sma(data2, data2.length);
      for (var z = length; z <= data1.length; z++) {
        var x = data1.slice(z - length, z), y = data2.slice(z - length, z), x_mean = ta.sma(x, length), res = [], y_mean = ta.sma(y, length);
        for (var i = 0; i < length; i++) {
          res.push((x[i] - x_mean[0]) * (y[i] - y_mean[0]));
        }
        res = ta.sum(res);
        out.push(res / length);
      }
      return out;
    }
    module.exports = covariance2;
  }
});

// src/statistics/dif.js
var require_dif = __commonJS({
  "src/statistics/dif.js"(exports, module) {
    var dif2 = (n, o) => (n - o) / o;
    module.exports = dif2;
  }
});

// src/statistics/er.js
var require_er = __commonJS({
  "src/statistics/er.js"(exports, module) {
    var ta = require_registry();
    function er2(data) {
      var wins = [], losses = [], wp = 1, lp = 1;
      for (var i in data) data[i] >= 0 ? wins.push(1 + data[i]) : losses.push(1 + data[i]);
      var win = wins.length / data.length, loss = losses.length / data.length;
      for (var i in losses) lp *= losses[i];
      for (var i in wins) wp *= wins[i];
      return ((wp ** (1 / wins.length) - 1) * 100 * win + (lp ** (1 / losses.length) - 1) * 100 * loss) / 100;
    }
    module.exports = er2;
  }
});

// src/statistics/ar.js
var require_ar = __commonJS({
  "src/statistics/ar.js"(exports, module) {
    var ta = require_registry();
    function ar2(data, len = data.length) {
      for (var i = len, out = []; i < data.length; i++) {
        var exp2 = ta.er(data.slice(i - len, i));
        out.push(data[i] - exp2);
      }
      return out;
    }
    module.exports = ar2;
  }
});

// src/statistics/kelly.js
var require_kelly = __commonJS({
  "src/statistics/kelly.js"(exports, module) {
    var ta = require_registry();
    function kelly2(data) {
      var exp2 = ta.er(data) + 1, winr = ta.winratio(data);
      if (isNaN(exp2)) exp2 = 1;
      return winr - (1 - winr) / exp2;
    }
    module.exports = kelly2;
  }
});

// src/statistics/martingale.js
var require_martingale = __commonJS({
  "src/statistics/martingale.js"(exports, module) {
    function martingale2(data, bet, max, multiplier = 2) {
      var current = bet;
      for (var i in data) {
        if (data[i] < 0) {
          current *= multiplier;
        } else if (data[i] > 0) {
          current = bet;
        }
      }
      return current > max ? max : current;
    }
    module.exports = martingale2;
  }
});

// src/statistics/antimartingale.js
var require_antimartingale = __commonJS({
  "src/statistics/antimartingale.js"(exports, module) {
    function antimartingale2(data, bet, max, multiplier = 2) {
      var current = bet;
      for (var i in data) {
        if (data[i] > 0) {
          current *= multiplier;
        } else if (data[i] < 0) {
          current = bet;
        }
      }
      return current > max ? max : current;
    }
    module.exports = antimartingale2;
  }
});

// src/statistics/permutations.js
var require_permutations = __commonJS({
  "src/statistics/permutations.js"(exports, module) {
    var ta = require_registry();
    var permutations2 = (data) => data.reduce((a, b) => a * b);
    module.exports = permutations2;
  }
});

// src/statistics/expected-trails.js
var require_expected_trails = __commonJS({
  "src/statistics/expected-trails.js"(exports, module) {
    function expected_trails2(n) {
      for (var i = 1, sum2 = 0; i <= n; i++) sum2 += 1 / i;
      return Math.ceil(n * sum2);
    }
    module.exports = expected_trails2;
  }
});

// src/statistics/winratio.js
var require_winratio = __commonJS({
  "src/statistics/winratio.js"(exports, module) {
    function winratio2(data) {
      var wins = 0, losses = 0;
      for (var i in data) data[i] >= 0 ? wins++ : losses++;
      return wins / (losses + wins);
    }
    module.exports = winratio2;
  }
});

// src/statistics/avgwin.js
var require_avgwin = __commonJS({
  "src/statistics/avgwin.js"(exports, module) {
    var ta = require_registry();
    function avgwin2(data) {
      for (var i = 0, wins = []; i < data.length; i++) if (data[i] >= 0) wins.push(data[i]);
      var avg = ta.sma(wins, wins.length);
      return avg[0];
    }
    module.exports = avgwin2;
  }
});

// src/statistics/avgloss.js
var require_avgloss = __commonJS({
  "src/statistics/avgloss.js"(exports, module) {
    var ta = require_registry();
    function avgloss2(data) {
      var loss = [];
      for (var i = 0; i < data.length; i++) if (data[i] < 0) loss.push(data[i]);
      var avg = ta.sma(loss, loss.length);
      return avg[0];
    }
    module.exports = avgloss2;
  }
});

// src/statistics/return-positive.js
var require_return_positive = __commonJS({
  "src/statistics/return-positive.js"(exports, module) {
    var ta = require_registry();
    function return_positive2(data) {
      for (var i = 0, out = []; i < data.length; i++) {
        if (data[i] > 0) out.push(data[i]);
      }
      return out;
    }
    module.exports = return_positive2;
  }
});

// src/statistics/return-negative.js
var require_return_negative = __commonJS({
  "src/statistics/return-negative.js"(exports, module) {
    var ta = require_registry();
    function return_negative2(data) {
      for (var i = 0, out = []; i < data.length; i++) {
        if (data[i] < 0) out.push(data[i]);
      }
      return out;
    }
    module.exports = return_negative2;
  }
});

// src/statistics/drawdown.js
var require_drawdown = __commonJS({
  "src/statistics/drawdown.js"(exports, module) {
    var ta = require_registry();
    function drawdown2(d) {
      for (var y = 1, max = d[0], min = d[0], big = 0; y < d.length; y++) {
        if (d[y] > max) {
          if (min != 0) {
            var diff = ta.dif(min, max);
            if (diff < big) big = diff;
            min = d[y];
          }
          max = d[y];
        }
        if (d[y] < min) min = d[y];
      }
      var diff = ta.dif(min, max);
      if (diff < big) big = diff;
      return big;
    }
    module.exports = drawdown2;
  }
});

// src/statistics/median.js
var require_median = __commonJS({
  "src/statistics/median.js"(exports, module) {
    var ta = require_registry();
    function median2(data, length = data.length) {
      for (var i = length, med = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i);
        pl.sort((a, b) => a - b);
        med.push(pl[Math.round(pl.length / 2) - 1]);
      }
      return med;
    }
    module.exports = median2;
  }
});

// src/statistics/recent-high.js
var require_recent_high = __commonJS({
  "src/statistics/recent-high.js"(exports, module) {
    var ta = require_registry();
    function recent_high2(data, lb = 25) {
      for (var i = data.length - 2, xback = lb, hindex = 0, highest = data[data.length - 1]; i >= 0; i--) {
        if (data[i] >= highest && xback > 0) {
          highest = data[i];
          hindex = i;
          xback = lb;
        } else {
          xback--;
        }
        if (xback <= 0) break;
      }
      return { index: hindex, value: highest };
    }
    module.exports = recent_high2;
  }
});

// src/statistics/recent-low.js
var require_recent_low = __commonJS({
  "src/statistics/recent-low.js"(exports, module) {
    var ta = require_registry();
    function recent_low2(data, lb = 25) {
      for (var i = data.length - 2, xback = lb, lindex = 0, lowest = data[data.length - 1]; i >= 0; i--) {
        if (data[i] <= lowest && xback > 0) {
          lowest = data[i];
          lindex = i;
          xback = lb;
        } else {
          xback--;
        }
        if (xback <= 0) break;
      }
      return { index: lindex, value: lowest };
    }
    module.exports = recent_low2;
  }
});

// src/statistics/mad.js
var require_mad = __commonJS({
  "src/statistics/mad.js"(exports, module) {
    var ta = require_registry();
    function mad2(data, length = data.length) {
      for (var i = length, med = []; i <= data.length; i++) {
        var tmp = data.slice(i - length, i), m = ta.median(tmp), adev = tmp.map((x) => Math.abs(x - m[m.length - 1]));
        adev = ta.median(adev);
        med.push(adev[adev.length - 1]);
      }
      return med;
    }
    module.exports = mad2;
  }
});

// src/statistics/aad.js
var require_aad = __commonJS({
  "src/statistics/aad.js"(exports, module) {
    var ta = require_registry();
    function aad2(data, length = data.length) {
      for (var i = length, med = []; i <= data.length; i++) {
        var tmp = data.slice(i - length, i), sm = 0, m = ta.sma(tmp, length);
        for (var q in tmp) sm += Math.abs(tmp[q] - m[m.length - 1]);
        med.push(sm / length);
      }
      return med;
    }
    module.exports = aad2;
  }
});

// src/statistics/se.js
var require_se = __commonJS({
  "src/statistics/se.js"(exports, module) {
    var ta = require_registry();
    function se2(data, size) {
      size = !size ? data.length : size;
      var stdv = ta.std(data);
      return stdv / size ** 0.5;
    }
    module.exports = se2;
  }
});

// src/statistics/ssd.js
var require_ssd = __commonJS({
  "src/statistics/ssd.js"(exports, module) {
    var ta = require_registry();
    function ssd2(data, length = data.length) {
      for (var i = length, sd = []; i <= data.length; i++) {
        var tmp = data.slice(i - length, i), mean = ta.sma(tmp, length), sm = 0;
        for (var x in tmp) sm += (tmp[x] - mean[mean.length - 1]) ** 2;
        sd.push(Math.sqrt(sm));
      }
      return sd;
    }
    module.exports = ssd2;
  }
});

// src/statistics/log.js
var require_log = __commonJS({
  "src/statistics/log.js"(exports, module) {
    var log2 = (d) => d.map((x) => Math.log(x));
    module.exports = log2;
  }
});

// src/statistics/exp.js
var require_exp = __commonJS({
  "src/statistics/exp.js"(exports, module) {
    var exp2 = (d) => d.map((x) => Math.exp(x));
    module.exports = exp2;
  }
});

// src/statistics/normalize.js
var require_normalize = __commonJS({
  "src/statistics/normalize.js"(exports, module) {
    var ta = require_registry();
    function normalize2(data, marg = 0) {
      for (var i = 0, max = Math.max.apply(null, data.slice()) * (1 + marg), min = Math.min.apply(null, data.slice()) * (1 - marg), norm = []; i < data.length; i++) norm.push(1 - (max - data[i]) / (max - min));
      return norm;
    }
    module.exports = normalize2;
  }
});

// src/statistics/denormalize.js
var require_denormalize = __commonJS({
  "src/statistics/denormalize.js"(exports, module) {
    var ta = require_registry();
    function denormalize2(data, norm, marg = 0) {
      for (var i = 0, max = Math.max.apply(null, data.slice()) * (1 + marg), min = Math.min.apply(null, data.slice()) * (1 - marg), dnorm = []; i < norm.length; i++) dnorm.push(min + norm[i] * (max - min));
      return dnorm;
    }
    module.exports = denormalize2;
  }
});

// src/statistics/normalize-pair.js
var require_normalize_pair = __commonJS({
  "src/statistics/normalize-pair.js"(exports, module) {
    function normalize_pair2(data1, data2) {
      for (var i = 1, f = (data1[0] + data2[0]) / 2, ret = [[f, f]]; i < data1.length; i++) ret.push([ret[ret.length - 1][0] * ((data1[i] - data1[i - 1]) / data1[i - 1] + 1), ret[ret.length - 1][1] * ((data2[i] - data2[i - 1]) / data2[i - 1] + 1)]);
      return ret;
    }
    module.exports = normalize_pair2;
  }
});

// src/statistics/normalize-from.js
var require_normalize_from = __commonJS({
  "src/statistics/normalize-from.js"(exports, module) {
    var ta = require_registry();
    function normalize_from2(data, value) {
      for (var i = 1, ret = [value]; i < data.length; i++) ret.push(ret[ret.length - 1] * ((data[i] - data[i - 1]) / data[i - 1] + 1));
      return ret;
    }
    module.exports = normalize_from2;
  }
});

// src/statistics/standardize.js
var require_standardize = __commonJS({
  "src/statistics/standardize.js"(exports, module) {
    var ta = require_registry();
    function standardize2(data) {
      var mean = ta.sma(data, data.length), std2 = ta.std(data), res = [];
      for (var i = 0; i < data.length; i++) res.push((data[i] - mean[0]) / std2);
      return res;
    }
    module.exports = standardize2;
  }
});

// src/statistics/zscore.js
var require_zscore = __commonJS({
  "src/statistics/zscore.js"(exports, module) {
    var ta = require_registry();
    function zscore2(data, len = data.length) {
      for (var i = len - 1, out = [], pl = data.slice(0, len - 1); i < data.length; i++) {
        pl.push(data[i]);
        var mean = ta.sma(pl, len), stdv = ta.std(pl, len);
        out.push((data[i] - mean[0]) / stdv);
        pl.splice(0, 1);
      }
      return out;
    }
    module.exports = zscore2;
  }
});

// src/statistics/pvalue.js
var require_pvalue = __commonJS({
  "src/statistics/pvalue.js"(exports, module) {
    var ta = require_registry();
    var t_table = [
      { value: 0.5, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0 },
      { value: 0.25, "1": 1, "2": 0.816, "3": 0.765, "4": 0.741, "5": 0.727, "6": 0.718, "7": 0.711, "8": 0.706, "9": 0.703, "10": 0.7, "11": 0.697, "12": 0.695, "13": 0.694, "14": 0.692, "15": 0.691, "16": 0.69, "17": 0.689, "18": 0.688, "19": 0.688, "20": 0.687, "21": 0.686, "22": 0.686, "23": 0.685, "24": 0.685, "25": 0.684 },
      { value: 0.2, "1": 1.376, "2": 1.061, "3": 0.978, "4": 0.941, "5": 0.92, "6": 0.906, "7": 0.896, "8": 0.889, "9": 0.883, "10": 0.879, "11": 0.876, "12": 0.873, "13": 0.87, "14": 0.868, "15": 0.866, "16": 0.865, "17": 0.863, "18": 0.862, "19": 0.861, "20": 0.86, "21": 0.859, "22": 0.858, "23": 0.858, "24": 0.857, "25": 0.856 },
      { value: 0.15, "1": 1.963, "2": 1.386, "3": 1.25, "4": 1.19, "5": 1.156, "6": 1.134, "7": 1.119, "8": 1.108, "9": 1.1, "10": 1.093, "11": 1.088, "12": 1.088, "13": 1.079, "14": 1.076, "15": 1.074, "16": 1.071, "17": 1.069, "18": 1.067, "19": 1.066, "20": 1.064, "21": 1.063, "22": 1.061, "23": 1.06, "24": 1.059, "25": 1.058 },
      { value: 0.1, "1": 3.078, "2": 1.886, "3": 1.638, "4": 1.533, "5": 1.476, "6": 1.44, "7": 1.415, "8": 1.397, "9": 1.383, "10": 1.372, "11": 1.363, "12": 1.356, "13": 1.35, "14": 1.345, "15": 1.341, "16": 1.337, "17": 1.333, "18": 1.33, "19": 1.328, "20": 1.325, "21": 1.323, "22": 1.321, "23": 1.319, "24": 1.318, "25": 1.316 },
      { value: 0.05, "1": 6.314, "2": 2.92, "3": 2.353, "4": 2.132, "5": 2.015, "6": 1.943, "7": 1.895, "8": 1.86, "9": 1.833, "10": 1.812, "11": 1.796, "12": 1.782, "13": 1.771, "14": 1.761, "15": 1.753, "16": 1.746, "17": 1.74, "18": 1.734, "19": 1.729, "20": 1.725, "21": 1.721, "22": 1.717, "23": 1.714, "24": 1.711, "25": 1.708 },
      { value: 0.025, "1": 12.71, "2": 4.303, "3": 3.182, "4": 2.776, "5": 2.571, "6": 2.447, "7": 2.365, "8": 2.306, "9": 2.262, "10": 2.228, "11": 2.201, "12": 2.179, "13": 2.16, "14": 2.145, "15": 2.131, "16": 2.12, "17": 2.11, "18": 2.101, "19": 2.093, "20": 2.086, "21": 2.08, "22": 2.074, "23": 2.069, "24": 2.064, "25": 2.06 },
      { value: 0.01, "1": 31.82, "2": 6.965, "3": 4.541, "4": 3.747, "5": 3.365, "6": 3.143, "7": 2.998, "8": 2.896, "9": 2.821, "10": 2.764, "11": 2.718, "12": 2.681, "13": 2.65, "14": 2.624, "15": 2.602, "16": 2.583, "17": 2.567, "18": 2.552, "19": 2.539, "20": 2.528, "21": 2.518, "22": 2.508, "23": 2.5, "24": 2.492, "25": 2.485 },
      { value: 5e-3, "1": 63.66, "2": 9.925, "3": 5.841, "4": 4.604, "5": 4.032, "6": 3.707, "7": 3.499, "8": 3.355, "9": 3.25, "10": 3.169, "11": 3.106, "12": 3.055, "13": 3.012, "14": 2.977, "15": 2.947, "16": 2.921, "17": 2.898, "18": 2.878, "19": 2.861, "20": 2.845, "21": 2.831, "22": 2.819, "23": 2.807, "24": 2.797, "25": 2.787 },
      { value: 1e-3, "1": 318.13, "2": 22.327, "3": 10.215, "4": 7.173, "5": 5.893, "6": 5.208, "7": 4.785, "8": 4.501, "9": 4.297, "10": 4.144, "11": 4.025, "12": 3.93, "13": 3.852, "14": 3.787, "15": 3.733, "16": 3.686, "17": 3.646, "18": 3.61, "19": 3.579, "20": 3.552, "21": 3.527, "22": 3.505, "23": 3.485, "24": 3.467, "25": 3.45 },
      { value: 5e-4, "1": 636.62, "2": 31.599, "3": 12.924, "4": 8.61, "5": 6.869, "6": 5.959, "7": 5.408, "8": 5.041, "9": 4.781, "10": 4.587, "11": 4.437, "12": 4.318, "13": 4.221, "14": 4.14, "15": 4.073, "16": 4.015, "17": 3.965, "18": 3.922, "19": 3.883, "20": 3.85, "21": 3.819, "22": 3.792, "23": 3.768, "24": 3.745, "25": 3.725 }
    ];
    function pvalue2(t, df) {
      if (df > 25) throw new Error("ta.js | pvalue | df too high!");
      if (df < 1) throw new Error("ta.js | pvalue | df too low!");
      for (var x = 0; x < t_table.length - 1; x++) {
        if (t >= t_table[x][Number(df).toString()] && t <= t_table[Number(x) + 1][Number(df).toString()]) {
          return t_table[x + 1].value + (t_table[Number(x) + 1].value - t_table[x].value) * (t_table[x + 1][Number(df).toString()] - t) / (t_table[x][Number(df).toString()] - t_table[x + 1][Number(df).toString()]);
        }
      }
      return 1e-4;
    }
    module.exports = pvalue2;
  }
});

// src/statistics/kmeans.js
var require_kmeans = __commonJS({
  "src/statistics/kmeans.js"(exports, module) {
    var ta = require_registry();
    function kmeans2(data, clusters) {
      var means = [], centers = [], old = [], n, changed = false, init = Math.round(data.length / (clusters + 1));
      for (var i = 0; i < clusters; i++) centers[i] = data[init * (i + 1)];
      do {
        for (var i = 0; i < clusters; i++) means[i] = [];
        for (var x = 0; x < data.length; x++) {
          var range = -1, oldrange = -1;
          for (var y = 0; y < clusters; y++) {
            var r = Math.abs(centers[y] - data[x]);
            if (oldrange === -1) {
              oldrange = r;
              n = y;
            } else if (r <= oldrange) {
              oldrange = r;
              n = y;
            }
          }
          means[n].push(data[x]);
        }
        old = centers;
        for (var x = 0; x < clusters; x++) {
          var sm = 0;
          for (var y = 0; y < means[x].length; y++) sm += means[x][y];
          var m = sm / means[n].length;
          centers[x] = m;
        }
        for (var x = 0; x < clusters; x++) if (centers[x] !== old[x]) changed = true;
      } while (changed);
      return means;
    }
    module.exports = kmeans2;
  }
});

// src/statistics/mse.js
var require_mse = __commonJS({
  "src/statistics/mse.js"(exports, module) {
    function mse2(data1, data2) {
      for (var i = 0, err = 0; i < data1.length; i++) err += Math.pow(data2[i] - data1[i], 2);
      return err / data1.length;
    }
    module.exports = mse2;
  }
});

// src/statistics/cum.js
var require_cum = __commonJS({
  "src/statistics/cum.js"(exports, module) {
    var ta = require_registry();
    function cum2(data, length) {
      for (var i = length, res = []; i <= data.length; i++) {
        res.push(ta.sum(data.slice(i - length, i)));
      }
      return res;
    }
    module.exports = cum2;
  }
});

// src/chart-types/ha.js
var require_ha = __commonJS({
  "src/chart-types/ha.js"(exports, module) {
    var ta = require_registry();
    function ha2(data) {
      var ha3 = [[(data[0][0] + data[0][3]) / 2, data[0][1], data[0][2], (data[0][0] + data[0][1] + data[0][2] + data[0][3]) / 4]];
      for (var i = 1; i < data.length; i++) {
        ha3.push([(ha3[ha3.length - 1][0] + ha3[ha3.length - 1][3]) / 2, Math.max(ha3[ha3.length - 1][0], ha3[ha3.length - 1][3], data[i][1]), Math.min(ha3[ha3.length - 1][0], ha3[ha3.length - 1][3], data[i][2]), (data[i][0] + data[i][1] + data[i][2] + data[i][3]) / 4]);
      }
      return ha3;
    }
    module.exports = ha2;
  }
});

// src/chart-types/ren.js
var require_ren = __commonJS({
  "src/chart-types/ren.js"(exports, module) {
    var ta = require_registry();
    function ren2(data, bs = 1) {
      var re = [], decimals = Math.floor(bs) === bs ? 0 : bs.toString().split(".")[1].length || 0, bh = Math.ceil(data[0][0] / bs * 10 ** decimals) / 10 ** decimals * bs, bl = bh - bs;
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] > bh + bs) {
          do {
            re.push([bh, bh + bs, bh, bh + bs]);
            bh += bs;
            bl += bs;
          } while (data[i][0] > bh + bs);
        }
        if (data[i][1] < bl - bs) {
          do {
            re.push([bl, bl, bl - bs, bl - bs]);
            bh -= bs;
            bl -= bs;
          } while (data[i][1] < bl - bs);
        }
      }
      return re;
    }
    module.exports = ren2;
  }
});

// src/misc/fibnumbers.js
var require_fibnumbers = __commonJS({
  "src/misc/fibnumbers.js"(exports, module) {
    var fibnumbers2 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181];
    module.exports = fibnumbers2;
  }
});

// src/misc/times-up.js
var require_times_up = __commonJS({
  "src/misc/times-up.js"(exports, module) {
    var ta = require_registry();
    function times_up2(data, len) {
      var out = [];
      for (var i = len; i < data.length; i++) {
        var up = 1;
        for (var x = i - len + 1; x <= i; x++) {
          if (data[x - 1] > data[x]) {
            up = 0;
            break;
          }
        }
        out.push(up);
      }
      return out;
    }
    module.exports = times_up2;
  }
});

// src/misc/times-down.js
var require_times_down = __commonJS({
  "src/misc/times-down.js"(exports, module) {
    var ta = require_registry();
    function times_down2(data, len) {
      var out = [];
      for (var i = len; i < data.length; i++) {
        var dn = 1;
        for (var x = i - len + 1; x <= i; x++) {
          if (data[x - 1] < data[x]) {
            dn = 0;
            break;
          }
        }
        out.push(dn);
      }
      return out;
    }
    module.exports = times_down2;
  }
});

// src/experimental/support.js
var require_support = __commonJS({
  "src/experimental/support.js"(exports, module) {
    var ta = require_registry();
    function support2(d, hl) {
      hl = !hl ? ta.recent_low(d) : hl;
      var index2, findex, lowform = hl.value;
      do {
        for (var i = hl.index; i < d.length; i++) {
          var newlow = (hl.value - d[i]) / (hl.index - i);
          if (newlow < lowform) {
            lowform = newlow;
            index2 = i;
          }
        }
        if (hl.index + 1 == index2 && index2 != d.length - 1) {
          hl.index = index2;
          lowform = Math.min.apply(null, d.slice());
          hl.value = d[hl.index];
          findex = false;
        } else {
          findex = true;
        }
        if (hl.index == d.length - 1) findex = true;
      } while (!findex);
      if (index2 == d.length - 1 || hl.index == d.length - 1) return { calculate: (pos) => hl.value, slope: 0, lowest: hl.value, index: hl.index };
      return { calculate: (pos) => pos * lowform + hl.value, slope: lowform, lowest: hl.value, index: hl.index };
    }
    module.exports = support2;
  }
});

// src/experimental/resistance.js
var require_resistance = __commonJS({
  "src/experimental/resistance.js"(exports, module) {
    var ta = require_registry();
    function resistance2(d, hl) {
      hl = !hl ? ta.recent_high(d) : hl;
      var index2, findex, highform = hl.value;
      do {
        for (var i = hl.index; i < d.length; i++) {
          var newhigh = (d[i] - hl.value) / (hl.index - i);
          if (newhigh < highform) {
            highform = newhigh;
            index2 = i;
          }
        }
        if (hl.index + 1 == index2 && index2 != d.length - 1) {
          hl.index = index2;
          highform = Math.max.apply(null, d.slice());
          hl.value = d[hl.index];
          findex = false;
        } else {
          findex = true;
        }
        if (hl.index == d.length - 1) findex = true;
      } while (!findex);
      if (index2 == d.length - 1 || hl.index == d.length - 1) return { calculate: (pos) => hl.value, slope: 0, highest: hl.value, index: hl.index };
      return { calculate: (pos) => pos * -highform + hl.value, slope: highform, highest: hl.value, index: hl.index };
    }
    module.exports = resistance2;
  }
});

// src/experimental/divergence-state.js
var require_divergence_state = __commonJS({
  "src/experimental/divergence-state.js"(exports, module) {
    var ta = require_registry();
    function divergence_state2(data1, data2, length, lb, smoother = 1, threshold_ex = 0.03, threshold_nm = 0.01) {
      if (data1.length > data2.length) data1.splice(0, data1.length - data2.length);
      if (data2.length > data1.length) data2.splice(0, data2.length - data1.length);
      for (var i = length, out = []; i < data1.length; i++) {
        var pl1 = data1.slice(i - length, i + 1);
        var support1 = ta.support(pl1, ta.recent_low(pl1, lb));
        var support1_delta = support1.slope / support1.lowest;
        var resistance1 = ta.resistance(pl1, ta.recent_high(pl1, lb));
        var resistance1_delta = resistance1.slope / resistance1.highest;
        var pl2 = data2.slice(i - length, i + 1);
        var support2 = ta.support(pl2, ta.recent_low(pl2, lb));
        var support2_delta = support2.slope / support2.lowest;
        var resistance2 = ta.resistance(pl2, ta.recent_high(pl2, lb));
        var resistance2_delta = resistance2.slope / resistance2.highest;
        if (data1[i] > data1[i - smoother] && data2[i] < data2[i - smoother] || data1[i] < data1[i - smoother] && data2[i] > data2[i - smoother]) {
          var obj = [];
          if (resistance1_delta < -threshold_ex && resistance2_delta > -threshold_nm) obj.push("exaggerated_bearish");
          if (support1_delta < threshold_nm && support2_delta > threshold_ex) obj.push("exaggerated_bullish");
          if (resistance1_delta < -threshold_nm && resistance2_delta < threshold_nm) obj.push("hidden_bearish");
          if (support1_delta > threshold_nm && support2_delta < -threshold_nm) obj.push("hidden_bullish");
          if (resistance1_delta > threshold_nm && resistance2_delta < -threshold_nm) obj.push("regular_bearish");
          if (support1_delta < -threshold_nm && support2_delta > threshold_nm) obj.push("regular_bullish");
          if (obj.length <= 0) obj.push("divergence");
          out.push(obj);
        } else {
          out.push(["convergence"]);
        }
      }
      return out;
    }
    module.exports = divergence_state2;
  }
});

// src/indicators/aroon-up.js
var require_aroon_up = __commonJS({
  "src/indicators/aroon-up.js"(exports, module) {
    var ta = require_registry();
    function aroon_up(data, length = 10) {
      for (var i = length, aroon2 = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), hl = pl.slice();
        hl.sort((a, b) => a - b);
        aroon2.push(100 * (length - 1 - pl.reverse().findIndex((x) => x === hl[length - 1])) / (length - 1));
      }
      return aroon2;
    }
    module.exports = aroon_up;
  }
});

// src/indicators/aroon-down.js
var require_aroon_down = __commonJS({
  "src/indicators/aroon-down.js"(exports, module) {
    var ta = require_registry();
    function aroon_down(data, length = 10) {
      for (var i = length, aroon2 = []; i <= data.length; i++) {
        var pl = data.slice(i - length, i), hl = pl.slice();
        hl.sort((a, b) => a - b);
        aroon2.push(100 * (length - 1 - pl.reverse().findIndex((x) => x === hl[0])) / (length - 1));
      }
      return aroon2;
    }
    module.exports = aroon_down;
  }
});

// src/oscillators/aroon-osc.js
var require_aroon_osc = __commonJS({
  "src/oscillators/aroon-osc.js"(exports, module) {
    var ta = require_registry();
    function aroon_osc(data, length = 25) {
      for (var i = 0, aroon2 = [], u = ta.aroon.up(data, length), d = ta.aroon.down(data, length); i < u.length; i++) aroon2.push(u[i] - d[i]);
      return aroon2;
    }
    module.exports = aroon_osc;
  }
});

// src/random/prng.js
var require_prng = __commonJS({
  "src/random/prng.js"(exports, module) {
    function prng(seed) {
      for (var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++) {
        h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
      }
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      seed = (h ^= h >>> 16) >>> 0;
      return function() {
        var t = seed += 1831565813;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }
    module.exports = prng;
  }
});

// src/random/pick.js
var require_pick = __commonJS({
  "src/random/pick.js"(exports, module) {
    var ta = require_registry();
    var pick = (data, rng) => data[Math.floor(rng ? rng() * Math.floor(data.length) : Math.random() * Math.floor(data.length))];
    module.exports = pick;
  }
});

// src/random/range.js
var require_range = __commonJS({
  "src/random/range.js"(exports, module) {
    var range = (min, max, rng) => Math.floor(rng ? rng() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min) : Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
    module.exports = range;
  }
});

// src/random/float.js
var require_float = __commonJS({
  "src/random/float.js"(exports, module) {
    var float = (min, max, rng) => rng ? rng() * (max - min) + min : Math.random() * (max - min) + min;
    module.exports = float;
  }
});

// src/random/order.js
var require_order = __commonJS({
  "src/random/order.js"(exports, module) {
    var ta = require_registry();
    function order(data, rng) {
      var ret = [];
      data = data.slice();
      do {
        var index = Math.floor(rng ? rng() * Math.floor(data.length) : Math.random() * Math.floor(data.length));
        ret.push(data[index]);
        data.splice(index, 1);
      } while (data.length > 0);
      return ret;
    }
    module.exports = order;
  }
});

// src/_browser-multi-stub.js
var require_browser_multi_stub = __commonJS({
  "src/_browser-multi-stub.js"(exports, module) {
    module.exports = { sim: void 0 };
  }
});

// index.js
var require_index = __commonJS({
  "index.js"(exports, module) {
    var registry = require_registry();
    Object.assign(registry, {
      // moving averages
      sma: require_sma(),
      smma: require_smma(),
      wma: require_wma(),
      ema: require_ema(),
      hull: require_hull(),
      lsma: require_lsma(),
      vwma: require_vwma(),
      vwwma: require_vwwma(),
      wsma: require_wsma(),
      pwma: require_pwma(),
      hwma: require_hwma(),
      kama: require_kama(),
      cwma: require_cwma(),
      // indicators
      macd: require_macd(),
      macd_signal: require_macd_signal(),
      macd_bars: require_macd_bars(),
      rsi: require_rsi(),
      wrsi: require_wrsi(),
      tsi: require_tsi(),
      bop: require_bop(),
      fi: require_fi(),
      asi: require_asi(),
      alligator: require_alligator(),
      pr: require_pr(),
      stoch: require_stoch(),
      fib: require_fib(),
      bandwidth: require_bandwidth(),
      ichimoku: require_ichimoku(),
      atr: require_atr(),
      mfi: require_mfi(),
      roc: require_roc(),
      cop: require_cop(),
      kst: require_kst(),
      obv: require_obv(),
      vwap: require_vwap(),
      fractals: require_fractals(),
      cross: require_cross(),
      mom: require_mom(),
      halftrend: require_halftrend(),
      zigzag: require_zigzag(),
      psar: require_psar(),
      supertrend: require_supertrend(),
      elderray: require_elderray(),
      hv: require_hv(),
      rvi: require_rvi(),
      rvi_signal: require_rvi_signal(),
      rsi_divergence: require_rsi_divergence(),
      divergence: require_divergence(),
      // oscillators
      gator: require_gator(),
      mom_osc: require_mom_osc(),
      chaikin_osc: require_chaikin_osc(),
      ao: require_ao(),
      ac: require_ac(),
      fisher: require_fisher(),
      // bands
      bands: require_bands(),
      keltner: require_keltner(),
      don: require_don(),
      fibbands: require_fibbands(),
      envelope: require_envelope(),
      // statistics
      sum: require_sum(),
      std: require_std(),
      variance: require_variance(),
      ncdf: require_ncdf(),
      normsinv: require_normsinv(),
      sim: require_sim(),
      percentile: require_percentile(),
      cor: require_cor(),
      covariance: require_covariance(),
      dif: require_dif(),
      er: require_er(),
      ar: require_ar(),
      kelly: require_kelly(),
      martingale: require_martingale(),
      antimartingale: require_antimartingale(),
      permutations: require_permutations(),
      expected_trails: require_expected_trails(),
      winratio: require_winratio(),
      avgwin: require_avgwin(),
      avgloss: require_avgloss(),
      return_positive: require_return_positive(),
      return_negative: require_return_negative(),
      drawdown: require_drawdown(),
      median: require_median(),
      recent_high: require_recent_high(),
      recent_low: require_recent_low(),
      mad: require_mad(),
      aad: require_aad(),
      se: require_se(),
      ssd: require_ssd(),
      log: require_log(),
      exp: require_exp(),
      normalize: require_normalize(),
      denormalize: require_denormalize(),
      normalize_pair: require_normalize_pair(),
      normalize_from: require_normalize_from(),
      standardize: require_standardize(),
      zscore: require_zscore(),
      pvalue: require_pvalue(),
      kmeans: require_kmeans(),
      mse: require_mse(),
      cum: require_cum(),
      // chart types
      ha: require_ha(),
      ren: require_ren(),
      // misc
      fibnumbers: require_fibnumbers(),
      times_up: require_times_up(),
      times_down: require_times_down(),
      // experimental
      support: require_support(),
      resistance: require_resistance(),
      divergence_state: require_divergence_state(),
      // nested groups (public-API preserved exactly)
      aroon: {
        up: require_aroon_up(),
        down: require_aroon_down(),
        osc: require_aroon_osc()
      },
      random: {
        prng: require_prng(),
        pick: require_pick(),
        range: require_range(),
        float: require_float(),
        order: require_order()
      }
    });
    if (typeof process === "object" && Number(process.versions.node.split(".")[0]) >= 12) {
      registry.multi = require_browser_multi_stub();
    }
    module.exports = registry;
  }
});

// _esm-entry-virtual.js
var import_ta = __toESM(require_index());
var sma = import_ta.default["sma"];
var smma = import_ta.default["smma"];
var wma = import_ta.default["wma"];
var ema = import_ta.default["ema"];
var hull = import_ta.default["hull"];
var lsma = import_ta.default["lsma"];
var vwma = import_ta.default["vwma"];
var vwwma = import_ta.default["vwwma"];
var wsma = import_ta.default["wsma"];
var pwma = import_ta.default["pwma"];
var hwma = import_ta.default["hwma"];
var kama = import_ta.default["kama"];
var cwma = import_ta.default["cwma"];
var macd = import_ta.default["macd"];
var macd_signal = import_ta.default["macd_signal"];
var macd_bars = import_ta.default["macd_bars"];
var rsi = import_ta.default["rsi"];
var wrsi = import_ta.default["wrsi"];
var tsi = import_ta.default["tsi"];
var bop = import_ta.default["bop"];
var fi = import_ta.default["fi"];
var asi = import_ta.default["asi"];
var alligator = import_ta.default["alligator"];
var pr = import_ta.default["pr"];
var stoch = import_ta.default["stoch"];
var fib = import_ta.default["fib"];
var bandwidth = import_ta.default["bandwidth"];
var ichimoku = import_ta.default["ichimoku"];
var atr = import_ta.default["atr"];
var mfi = import_ta.default["mfi"];
var roc = import_ta.default["roc"];
var cop = import_ta.default["cop"];
var kst = import_ta.default["kst"];
var obv = import_ta.default["obv"];
var vwap = import_ta.default["vwap"];
var fractals = import_ta.default["fractals"];
var cross = import_ta.default["cross"];
var mom = import_ta.default["mom"];
var halftrend = import_ta.default["halftrend"];
var zigzag = import_ta.default["zigzag"];
var psar = import_ta.default["psar"];
var supertrend = import_ta.default["supertrend"];
var elderray = import_ta.default["elderray"];
var hv = import_ta.default["hv"];
var rvi = import_ta.default["rvi"];
var rvi_signal = import_ta.default["rvi_signal"];
var rsi_divergence = import_ta.default["rsi_divergence"];
var divergence = import_ta.default["divergence"];
var gator = import_ta.default["gator"];
var mom_osc = import_ta.default["mom_osc"];
var chaikin_osc = import_ta.default["chaikin_osc"];
var ao = import_ta.default["ao"];
var ac = import_ta.default["ac"];
var fisher = import_ta.default["fisher"];
var bands = import_ta.default["bands"];
var keltner = import_ta.default["keltner"];
var don = import_ta.default["don"];
var fibbands = import_ta.default["fibbands"];
var envelope = import_ta.default["envelope"];
var sum = import_ta.default["sum"];
var std = import_ta.default["std"];
var variance = import_ta.default["variance"];
var ncdf = import_ta.default["ncdf"];
var normsinv = import_ta.default["normsinv"];
var sim = import_ta.default["sim"];
var percentile = import_ta.default["percentile"];
var cor = import_ta.default["cor"];
var covariance = import_ta.default["covariance"];
var dif = import_ta.default["dif"];
var er = import_ta.default["er"];
var ar = import_ta.default["ar"];
var kelly = import_ta.default["kelly"];
var martingale = import_ta.default["martingale"];
var antimartingale = import_ta.default["antimartingale"];
var permutations = import_ta.default["permutations"];
var expected_trails = import_ta.default["expected_trails"];
var winratio = import_ta.default["winratio"];
var avgwin = import_ta.default["avgwin"];
var avgloss = import_ta.default["avgloss"];
var return_positive = import_ta.default["return_positive"];
var return_negative = import_ta.default["return_negative"];
var drawdown = import_ta.default["drawdown"];
var median = import_ta.default["median"];
var recent_high = import_ta.default["recent_high"];
var recent_low = import_ta.default["recent_low"];
var mad = import_ta.default["mad"];
var aad = import_ta.default["aad"];
var se = import_ta.default["se"];
var ssd = import_ta.default["ssd"];
var log = import_ta.default["log"];
var exp = import_ta.default["exp"];
var normalize = import_ta.default["normalize"];
var denormalize = import_ta.default["denormalize"];
var normalize_pair = import_ta.default["normalize_pair"];
var normalize_from = import_ta.default["normalize_from"];
var standardize = import_ta.default["standardize"];
var zscore = import_ta.default["zscore"];
var pvalue = import_ta.default["pvalue"];
var kmeans = import_ta.default["kmeans"];
var mse = import_ta.default["mse"];
var cum = import_ta.default["cum"];
var ha = import_ta.default["ha"];
var ren = import_ta.default["ren"];
var fibnumbers = import_ta.default["fibnumbers"];
var times_up = import_ta.default["times_up"];
var times_down = import_ta.default["times_down"];
var support = import_ta.default["support"];
var resistance = import_ta.default["resistance"];
var divergence_state = import_ta.default["divergence_state"];
var aroon = import_ta.default["aroon"];
var random = import_ta.default["random"];
var multi = import_ta.default["multi"];
var esm_entry_virtual_default = import_ta.default;
export {
  aad,
  ac,
  alligator,
  antimartingale,
  ao,
  ar,
  aroon,
  asi,
  atr,
  avgloss,
  avgwin,
  bands,
  bandwidth,
  bop,
  chaikin_osc,
  cop,
  cor,
  covariance,
  cross,
  cum,
  cwma,
  esm_entry_virtual_default as default,
  denormalize,
  dif,
  divergence,
  divergence_state,
  don,
  drawdown,
  elderray,
  ema,
  envelope,
  er,
  exp,
  expected_trails,
  fi,
  fib,
  fibbands,
  fibnumbers,
  fisher,
  fractals,
  gator,
  ha,
  halftrend,
  hull,
  hv,
  hwma,
  ichimoku,
  kama,
  kelly,
  keltner,
  kmeans,
  kst,
  log,
  lsma,
  macd,
  macd_bars,
  macd_signal,
  mad,
  martingale,
  median,
  mfi,
  mom,
  mom_osc,
  mse,
  multi,
  ncdf,
  normalize,
  normalize_from,
  normalize_pair,
  normsinv,
  obv,
  percentile,
  permutations,
  pr,
  psar,
  pvalue,
  pwma,
  random,
  recent_high,
  recent_low,
  ren,
  resistance,
  return_negative,
  return_positive,
  roc,
  rsi,
  rsi_divergence,
  rvi,
  rvi_signal,
  se,
  sim,
  sma,
  smma,
  ssd,
  standardize,
  std,
  stoch,
  sum,
  supertrend,
  support,
  times_down,
  times_up,
  tsi,
  variance,
  vwap,
  vwma,
  vwwma,
  winratio,
  wma,
  wrsi,
  wsma,
  zigzag,
  zscore
};
