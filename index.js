async function median(data, len) {
  var length = (!len) ? data.length : len, pl = [], med = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var ll = pl.slice();
      ll.sort((a, b) => {
        if(a > b) return -1;
        if(a < b) return 1;
        return 0;
      });
      med.push(ll[Math.round(ll.length / 2)]);
      pl.splice(0, 1);
    }
  }
  return med;
}
async function rsi(data, len) {
  var length = (!len) ? 14 : len;
  var pl = [], arrsi = [];
  for(var i = 1; i < data.length; i++) {
    var diff = (data[i] - data[i - 1]);
    pl.push(diff);
    if(pl.length >= length) {
      var gain = 0, loss = 0;
      for(q in pl) {
        if(pl[q] < 0) loss += pl[q];
        if(pl[q] >= 0) gain += pl[q];
      }
      gain /= length; loss = (Math.abs(loss)) / length;
      rsi = Number(100 - 100 / (1 + (gain / loss)));
      arrsi.push(rsi);
      pl.splice(0, 1);
    }
  }
  return arrsi;
}
async function tsi(data, llen, slen, sig) {
  var long = (!llen) ? 25 : llen, short = (!slen) ? 13 : slen,
  signal = (!sig) ? 13 : sig, mom = [], abs = [], ts = [], tsi = [];
  for(var i = 1; i < data.length; i++) {
    mom.push(data[i] - data[i - 1]);
    abs.push(Math.abs(data[i] - data[i - 1]));
  }
  var sma1 = await module.exports.ema(mom ,long);
  var sma2 = await module.exports.ema(abs ,long);
  var ema1 = await module.exports.ema(sma1, short);
  var ema2 = await module.exports.ema(sma2, short);
  for(var i = 0; i < ema1.length; i++) {
    ts.push(ema1[i] / ema2[i]);
  }
  var tma = await module.exports.ema(ts, signal);
  ts.splice(0, ts.length - tma.length)
  for(var i = 0; i < tma.length; i++) {
    tsi.push([tma[i], ts[i]]);
  }
  return tsi;
}
async function bop(data, len) {
  var bo = [], len = (!len) ? 14 : len;
  for(var i = 0; i < data.length; i++) {
    bo.push((data[i][3] - data[i][0]) / (data[i][1] - data[i][2]));
  }
  bo = await module.exports.sma(bo, len);
  return bo;
}
async function fi(data, len) {
  var length = (!len) ? 13 : len, pl = [], ff = [];
  for(var i = 1; i < data.length; i++) {
    pl.push(data[i][0] - data[i - 1][0]);
    if(pl.length > length) {
      var vfi = await module.exports.ema(pl.slice(), length);
      ff.push((data[i][0] - data[i - 1][0]) * vfi[0]);
      pl.splice(0, 1);
    }
  }
  return ffi;
}
async function asi(data) {
  var pl = [], a = [];
  for(var i = 1; i < data.length; i++) {
    var c = data[i][1], cy = data[i - 1][1], h = data[i][0], hy = data[i - 1][0],
    l = data[i][2], ly = data[i - 1][2], k = (hy - c > ly - c) ? hy - c : ly - c,
    o = data[i][0], oy = data[i - 1][0], r, t = Math.max(data[i][0], data[i - 1][0]) - Math.min(data[i][2], data[i - 1][2]);
    if(h - cy > l - cy && h - cy > h - l) r = h - cy - (l - cy) / 2 + (cy - oy) / 4;
    if(l - cy > h - cy && l - cy > h - l) r = l - cy - (h - cy) / 2 + (cy - oy) / 4;
    if(h - l > h - cy && h - l > l - cy) r = h - l + (cy - oy) / 4;
    a.push(50 * ((cy - c + (cy - oy) / 2 + (c - o) / 2) / r) * k / t)
  }
  return a;
}
async function ao(data, len1, len2) {
  var length1 = (!len1) ? 5 : len1, length2 = (!len2) ? 35 : len2, pl = [], a = [];
  for(var i = 0; i < data.length; i++) {
    pl.push((data[i][0] + data[i][1]) / 2);
    if(pl.length >= length2) {
      var f = await module.exports.sma(pl.slice(), length1),
          s = await module.exports.sma(pl.slice(), length2);
      a.push(f[f.length - 1] - s[s.length - 1]);
      pl.splice(0, 1);
    }
  }
  return a;
}
async function pr(data, len) {
  var length = (!len) ? 14 : len;
  var n = [], pl = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length - 1) {
      var highd = await Math.max.apply(null, pl), lowd = await Math.min.apply(null, pl);
      n.push((highd - data[i]) / (highd - lowd) * -100);
      pl.splice(0, 1);
    }
  }
  return n;
}
async function lsma(data, len) {
  var length = (!len) ? 25 : len;
  var pl = [], lr = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0, sum_yy = 0, m, b;
      for(var q = 1; q <= length; q++) sum_x += q, sum_y += pl[q - 1], sum_xy += (pl[q - 1] * q), sum_xx += (q * q), sum_yy += (pl[q - 1] * pl[q - 1]);
      m = ((sum_xy - sum_x * sum_y / length) / (sum_xx - sum_x * sum_x / length));
      b = sum_y / length - m * sum_x / length;
      lr.push(m * length + b);
      pl.splice(0, 1);
    }
  }
  return lr;
}
async function don(data, len) {
  var pl = [], channel = [], length = (!len) ? 20 : len;
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var highs = [], lows = [];
      for(let h in pl) highs.push(pl[h][0]), lows.push(pl[h][1]);
      var max = Math.max.apply(null, highs.slice()), min = Math.min.apply(null, lows.slice());
      channel.push([max, (max + min) / 2, min]);
      pl.splice(0, 1);
    }
  }
  return channel;
}
async function ichimoku(data, len1, len2, len3, len4) {
  var pl = [], length1 = (!len1) ? 9 : len1, length2 = (!len2) ? 26 : len2,
  length3 = (!len3) ? 52 : len3, length4 = (!len4) ? 26 : len4, cloud = [], place = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length > length3) {
      var highs = [], lows = [];
      for(let a in pl) highs.push(pl[a][0]), lows.push(pl[a][2]);
      var tsen = (Math.max.apply(null, highs.slice((highs.length - 1 - length1), highs.length - 1)) + Math.min.apply(null, lows.slice((lows.length - 1 - length1), lows.length - 1))) / 2,
          ksen = (Math.max.apply(null, highs.slice((highs.length - 1 - length2), highs.length - 1)) + Math.min.apply(null, lows.slice((lows.length - 1 - length2), lows.length - 1))) / 2,
          senka = data[i][1] + ksen,
          senkb = (Math.max.apply(null, highs.slice((highs.length - 1 - length3), highs.length - 1)) + Math.min.apply(null, lows.slice((lows.length - 1 - length2), lows.length - 1))) / 2;
          chik = data[i][1];
          place.push([tsen, ksen, senka, senkb, chik]);
      pl.splice(0, 1);
    }
  }
  for(var i = length4; i < place.length - length4; i++) {
    cloud.push([place[i][0], place[i][1], place[i + (length4 - 1)][2], place[i + (length4 - 1)][3], place[i + length4 - 1][4]]);
  }
  return cloud;
}
async function stoch(data, len, sd, sk) {
  var length = (!len) ? 14 : len;
  var smoothd = (!sd) ? 3 : sd;
  var smoothk = (!sk) ? 3 : sk;
  if(length < smoothd) [length, smoothd] = [smoothd, length];
  if(smoothk > smoothd) [smoothk, smoothd] = [smoothd, smoothk];
  var stoch = [], high = [], low = [], ka = [];
  for(var i = 0; i < data.length; i++) {
    high.push(data[i][0]), low.push(data[i][2]);
    if(high.length >= length) {
      var highd = await Math.max.apply(null, high), lowd = await Math.min.apply(null, low),
      k = 100 * (data[i][1] - lowd) / (highd - lowd);
      ka.push(k)
    }
    if(smoothk > 0 && ka.length > smoothk) {
      var smoothedk = await module.exports.sma(ka, smoothk);
      ka.push(smoothedk[smoothedk.length - 1]);
    }
    if(ka.length - smoothk >= smoothd) {
      var d = await module.exports.sma(ka.slice(smoothk), smoothd);
      stoch.push([k, d[d.length - 1]]);
      high.splice(0, 1);
      low.splice(0, 1);
      ka.splice(0, 1);
    }
  }
  return stoch;
}
async function atr(data, len) {
  var length = (!len) ? 14 : len;
  var atr = [];
  for(var i = 0; i < data.length; i++) {
    if(atr.length < 1) {
      atr.push(data[i][0] - data[i][2]);
    } else {
      var t0 = await Math.max((data[i][0] - data[i - 1][1]), (data[i][2] - data[i - 1][1]), (data[i][0] - data[i][2]));
      var at =(atr[atr.length - 1] * (length - 1) + t0) / length;
      atr.push(at);
    }
  }
  return atr;
}
async function sma(data, len) {
  var length = (!len) ? 14 : len;
  var pl = [], sma = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var average = 0;
      for(q in pl) average += pl[q];
      sma.push(average / length);
      pl.splice(0, 1);
    }
  }
  return sma;
}
async function smma(data, len) {
  var length = (!len) ? 14 : len;
  var pl = [], smma = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var average = 0;
      for(q in pl) average += pl[q];
      if(smma.length <= 0) { smma.push(average / length); } else { smma.push((average - smma[smma.length - 1]) / length); }
      pl.splice(0, 1);
    }
  }
  smma.splice(0, 1);
  return smma;
}
async function wma(data, len) {
  var length = (!len) ? 14 : len;
  var weight = 0;
  for(var i = 1; i <= length; i++) weight += i;
  var pl = [], wma = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var average = 0, index = 1;
      for(q in pl) {
        average += pl[q] * index / weight;
        index++;
      }
      wma.push(average);
      pl.splice(0, 1);
    }
  }
  return wma;
}
async function vwma(data, len) {
    var length = (!len) ? 20 : len, pl = [], vwma = [];
    for(var i = 0; i < data.length; i++) {
      pl.push([(data[i][0] * data[i][1]), data[i][1]]);
      if(pl.length >= length) {
        var totalv = 0, totalp = 0;
        for(var o = 0; o < pl.length; o++) {
          totalv += pl[o][1];
          totalp += pl[o][0];
        }
        vwma.push(totalp / totalv);
        pl.splice(0, 1);
      }
    }
    return vwma;
}
async function ema(data, len) {
  var length = (!len) ? 12 : len;
  var pl = [], ema = [], prevema = 0,
  weight = 2 / (length + 1);
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    var average = 0;
    if(prevema == 0 && pl.length >= length) {
      for(q in pl) average += pl[q];
      average /= length;
      ema.push(average);
      prevema = average;
    } else if(prevema != 0 && pl.length >= length) {
      average = (data[i] - prevema) * weight + prevema;
      ema.push(average);
      prevema = average;
    }
  }
  return ema;
}
async function hull(data, len) {
  var length = (!len) ? 14 : len;
  var pl = [], hma = [], ewma = await module.exports.wma(data.slice(), length), sqn = Math.round(Math.sqrt(length)),
  first = await wma(data.slice(), Math.round(length / 2));
  first.splice(0, first.length - ewma.length);
  for(let i in ewma) {
    pl.push((first[i] * 2) - ewma[i]);
    if(pl.length >= sqn) {
      var h = await wma(pl, sqn);
      hma.push(h[h.length - 1]);
    }
  }
  return hma;
}
async function kama(data, len1, len2, len3) {
  len1 = (!len1) ? 10 : len1, len2 = (!len2) ? 2 : len2, len3 = (!len3) ? 30 : len3;
  var ka = await module.exports.sma(data.slice(), len1), ka = [ka[ka.length - 1]];
  for(var i = len1 + 1; i < data.length; i++) {
    var vola = 0, change = Math.abs(data[i] - data[i - len1]);
    for(var a = 1; a < len1; a++) vola += Math.abs(data[(i-a)] - data[(i-a)-1]);
    var sc = (change/vola * (2/(len2+1) - 2/(len3+1) + 2/(len3+1))) ** 2;
    ka.push(ka[ka.length - 1] + sc * (data[i] - ka[ka.length - 1]));
  }
  return ka;
}
async function macd(data, len1, len2) {
  var length1 = (!len1) ? 12 : len1;
  var length2 = (!len2) ? 26 : len2;
  if(length1 > length2) [length1, length2] = [length2, length1];
  var ema = await module.exports.ema(data, length1);
  var emb = await module.exports.ema(data, length2);
  ema.splice(0, length2 - length1);
  var macd = [];
  for(var i = 0; i < emb.length; i++) {
    macd.push([ema[i] - emb[i]]);
  }
  return macd;
}
async function bands(data, len, dev) {
  var length = (!len) ? 14 : len;
  var deviations = (!dev) ? 1 : dev;
  var pl = [], deviation = [], boll = [];
  var sma = await module.exports.sma(data, length);
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var devi = await module.exports.std(pl, length);
      deviation.push(devi);
      pl.splice(0, 1);
    }
  }
  for(var i = 0; i < sma.length; i++) {
    boll.push([sma[i] + deviation[i] * deviations, sma[i], sma[i] - deviation[i] * deviations]);
  }
  return boll;
}
async function bandwidth(data, len, dev) {
  var length = (!len) ? 14 : len;
  var deviations = (!dev) ? 1 : dev;
  var pl = [], deviation = [], boll = [];
  var sma = await module.exports.sma(data, length);
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var devi = await module.exports.std(pl);
      deviation.push(devi);
      pl.push(data[i]);
      pl.splice(0, 1);
    }
  }
  for(var i = 0; i < deviation.length; i++) {
    var bandwidth = (((sma[i] + deviation[i] * deviations) - (sma[i] - deviation[i] * deviations)) / sma[i]);
    boll.push(bandwidth);
  }
  return boll;
}
async function keltner(data, len, dev) {
  var length = (!len) ? 14 : len;
  var devi = (!dev) ? 1 : dev;
  var closing = [], atr = await module.exports.atr(data, length), kma, kelt = [];
  for(var i in data) closing.push((data[i][0] + data[i][1] + data[i][2]) / 3);
  kma = await module.exports.sma(closing, length);
  atr.splice(0, length - 1);
  for(var i = 0; i < kma.length; i++) {
    kelt.push([kma[i] + atr[i] * devi, kma[i], kma[i] - atr[i] * devi]);
  }
  return kelt
}
async function std(data, len) {
  var length = (!len) ? data.length : len;
  var mean = data.reduce((a, b) => {
    return Number(a) + Number(b);
  }) / length;
  var std = Math.sqrt(data.reduce((sq, n) => {
    return sq + Math.pow(n - mean, 2);
  }, 0) / (length));
  return std;
}
async function cor(data1, data2) {
  var d1avg = await module.exports.sma(data1.slice(), data1.length),
      d2avg = await module.exports.sma(data2.slice(), data2.length),
      sumavg = 0, sx = 0, sy = 0;
  for(var i = 0; i < data1.length; i++) {
    var x = data1[i] - d1avg, y = data2[i] - d2avg;
    sumavg += (x * y), sx += Math.pow(x, 2), sy += Math.pow(y, 2);
  }
  var n = data1.length - 1;
  sx /= n, sy /= n, sx = Math.sqrt(sx), sy = Math.sqrt(sy);
  return (sumavg / (n * sx * sy));
}
async function dif(n, o) {
  return (n - o) / o;
}
async function aroon_up(data, len) {
  var length = (!len) ? 10 : len;
  var pl = [], aroon = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var hl = pl.slice(0);
      hl.sort((a, b) => {
        return a - b;
      });
      var h = hl[length - 1];
      aroon.push((100 * (length - (pl.findIndex(x => x == h) + 1)) / length));
      pl.splice(0, 1);
    }
  }
  return aroon;
}
async function aroon_down(data, len) {
  var length = (!len) ? 10 : len;
  var pl = [], aroon = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      var hl = pl.slice(0);
      hl.sort((a, b) => {
        return a - b;
      });
      var l = hl[0];
      aroon.push((100 * (length - (pl.findIndex(x => x == l) + 1)) / length));
      pl.splice(0, 1);
    }
  }
  return aroon;
}
async function aroon_osc(data, len) {
  var length = (!len) ? 25 : len;
  var aroon = [];
  var u = await module.exports.aroon.up(data, length);
  var d = await module.exports.aroon.down(data, length);
  for(var i = 0; i < u.length; i++) {
    aroon.push(u[i] - d[i]);
  }
  return aroon;
}
async function mfi(data, len) {
  var length = (!len) ? 14 : len;
  var mfi = [], n = [], p = [];
  for(var i = 0; i < data.length; i++) {
    p.push(data[i][0]);
    n.push(data[i][1]);
    if(p.length >= length) {
      var positive = 0, negative = 0;
      for(q in p) positive += p[q];
      for(q in n) negative += n[q];
      mfi.push((100 - 100 / (1 + positive / negative)));
      p.splice(0, 1);
      n.splice(0, 1);
    }
  }
  return mfi;
}
async function roc(data, len) {
  var length = (!len) ? 14 : len;
  var pl = [], roc = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length) {
      roc.push((pl[length - 1] - pl[0]) / pl[0]);
      pl.splice(0, 1);
    }
  }
  return roc;
}
async function cop(data, len1, len2, len3) {
  len1 = (!len1) ? 11 : len1, len2 = (!len2) ? 14 : len2, len3 = (!len3) ? 10 : len3, max = Math.max(len1, len2), co = [];
  for(var i = max + len3; i < data.length; i++) {
    var r1 = data.slice(i - (max + len3), i), r2 = data.slice(i - (max + len3), i), tmp = [];
    r1 = await module.exports.roc(r1, len1), r2 = await module.exports.roc(r2, len2), r1.splice(0, r1.length - r2.length), r2.splice(0, r2.length - r1.length);
    for(var a = 0; a < r1.length; a++) tmp.push(r1[a] + r2[a]);
    tmp = await module.exports.wma(tmp.slice(), len3);
    co.push(tmp[tmp.length - 1]);
  }
  return co;
}
async function kst(data, r1, r2, r3, r4, s1, s2, s3, s4, sig) {
  r1 = (!r1) ? 10 : r1, r2 = (!r2) ? 15 : r2, r3 = (!r3) ? 20 : r3, r4 = (!r4) ? 30 : r4, s1 = (!s1) ? 10 : s1, s2 = (!s2) ? 10 : s2, s3 = (!s3) ? 10 : s3, s4 = (!s4) ? 15 : s4, sig = (!sig) ? 9 : sig;
  var ks = [], fs = [], ms = (Math.max(r1, r2, r3, r4) + Math.max(s1, s2, s3, s4));
  for(var i = ms; i < data.length; i++) {
    var rcma1 = await module.exports.roc(data.slice(i - ms, i), r1),
        rcma2 = await module.exports.roc(data.slice(i - ms, i), r2),
        rcma3 = await module.exports.roc(data.slice(i - ms, i), r3),
        rcma4 = await module.exports.roc(data.slice(i - ms, i), r4);
        rcma1 = await module.exports.sma(rcma1, s1);
        rcma2 = await module.exports.sma(rcma2, s2);
        rcma3 = await module.exports.sma(rcma3, s3);
        rcma4 = await module.exports.sma(rcma4, s4);
      ks.push(rcma1[rcma1.length - 1] + rcma2[rcma2.length - 1] + rcma3[rcma3.length - 1] + rcma4[rcma4.length - 1]);
  }
  var sl = await module.exports.sma(ks.slice(), sig);
  ks.splice(0, ks.length - sl.length);
  for(var i in sl) fs.push([ks[i], sl[i]]);
  return fs;
}
async function obv(data) {
  var obv = [0];
  for(var i = 1; i < data.length; i++) {
    if(data[i][1] > data[i - 1][1]) obv.push(obv[obv.length - 1] + data[i][0])
    if(data[i][1] < data[i - 1][1]) obv.push(obv[obv.length - 1] - data[i][0])
    if(data[i][1] == data[i - 1][1]) obv.push(obv[obv.length - 1])
  }
  return obv;
}
async function vwap(data, len) {
  var length = (!len || len > data.length) ? data.length : len, pl = [], vwap = [];
  for(var i = 0; i < data.length; i++) {
    pl.push([(data[i][0] * data[i][1]), data[i][1]]);
    if(pl.length >= length) {
      var totalv = 0, totalp = 0;
      for(var o = 0; o < pl.length; o++) {
        totalv += pl[o][1];
        totalp += pl[o][0];
      }
      vwap.push(totalp / totalv);
      pl.splice(0, 1);
    }
  }
  return vwap;
}
async function mom(data, len, p) {
  var length = (!len) ? 10 : len, mom = [];
  for(var i = length - 1; i < data.length; i++) {
    (p) ? mom.push(data[i] / data[i - (length - 1)] * 100) : mom.push(data[i] - data[i - (length - 1)])
  }
  return mom;
}
async function mom_osc(data, len) {
  var length = (!len) ? 9 : len, pl = [], osc = [];
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length > length) {
      var sumh = 0, suml = 0;
      for(var a = 1; a < length; a++) (pl[a - 1] < pl[a]) ? sumh += pl[a] : suml += pl[a];
      osc.push((sumh - suml) / (sumh + suml) * 100);
      pl.splice(0, 1);
    }
  }
  return osc;
}
async function ha(data) {
  var ha = [(Number(data[0][1]) + Number(data[0][4])) / 2, Number(data[0][2]), Number(data[0][3]), (Number(data[0][1]) + Number(data[0][2]) + Number(data[0][3]) + Number(data[0][4])) / 4];
  for(var i = 1; i < data.length; i++) {
    ha.push((ha[ha.length - 1][0] + ha[ha.length - 1][3]) / 2, Math.max(open, close, Number(data[i][2])), Math.min(open, close, Number(data[i][3])), (Number(data[i][1]) + Number(data[i][2]) + Number(data[i][3]) + Number(data[i][4])) / 4);
  }
  return ha;
}
async function ren(data, bs) {
  var re = [], bs = (!bs) ? 1 : bs, decimals = (function(){
    if(Math.floor(bs) == bs) return 0;
    return bs.toString().split(".")[1].length || 0;
  })(), bh = Math.ceil(data[0][0] / bs * (10 ** decimals)) / (10 ** decimals) * bs, bl = bh - bs;
  for(var i = 1; i < data.length; i++) {
    if(data[i][0] > bh + bs) {
      do {
        re.push([bh,bh+bs,bh,bh+bh+bs]);
        bh+=bs;
        bl+=bs;
      } while(data[i][0] > bh + bs);
    }
    if(data[i][1] < bl - bs) {
      do {
        re.push([bh-bs,bh-bs,bl+bs,bl+bs]);
        bh-=bs;
        bl-=bs;
      } while(data[i][1] < bl - bs);
    }
  }
  return re;
}
module.exports = {
  aroon: {
    up: aroon_up,
    down: aroon_down,
    osc: aroon_osc,
  }, rsi, tsi, fi, pr, stoch, atr, sma, smma, wma, vwma, ao, asi,
  ema, macd, lsma, don, ichimoku, bands, bandwidth, median, keltner,
  std, cor, dif, hull, mfi, roc, kst, obv, vwap, mom, mom_osc, ha, ren,
  bop, cop, kama
}
