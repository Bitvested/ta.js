async function median(data, len) {
  var length = (!len) ? data.length : len, pl = [], med = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-len,i);
    pl.sort((a, b) => {
      if(a > b) return -1;
      if(a < b) return 1;
      return 0;
    });
    med.push(pl[Math.round(pl.length / 2)]);
  }
  return med;
}
async function kmeans(data, clusters) {
  var means = [], centers = [], old = [], n, changed = false, init = Math.round(data.length/(clusters+1));
  for(i = 0; i < clusters; i++) centers[i] = data[init*(i+1)];
  do {
    for(i = 0; i < clusters; i++) means[i] = [];
    for(x = 0; x < data.length; x++) {
      var range = -1, oldrange = -1;
      for(y = 0; y < clusters; y++) {
        var r = Math.abs(centers[y]-data[x]);
        if(oldrange === -1) {
          oldrange = r;
          n = y;
        } else if(r <= oldrange) {
          oldrange = r
          n = y;
        }
      }
      means[n].push(data[x]);
    }
    old = centers;
    for(x = 0; x < clusters; x++) {
      var sum = 0;
      for(y = 0; y < means[x].length; y++) sum += means[x][y];
      var m = sum / means[n].length;
      centers[x] = m;
    }
    for(x = 0; x < clusters; x++) if(centers[x] !== old[x]) changed = true;
  } while(changed);
  return means;
}
async function normalize(data, marg) {
  marg = (!marg) ? 0 : marg;
  var max = await Math.max.apply(null, data.slice())*(1+marg), min = await Math.min.apply(null, data.slice())*(1-marg), norm = [];
  for(var i = 0; i < data.length; i++) norm.push(1-(max-data[i])/(max-min));
  return norm;
}
async function denormalize(data, norm, marg) {
  marg = (!marg) ? 0 : marg;
  var max = await Math.max.apply(null, data.slice())*(1+marg), min = await Math.min.apply(null, data.slice())*(1-marg), dnorm = [];
  for(var i = 0; i < norm.length; i++) dnorm.push(min+norm[i]*(max-min));
  return dnorm;
}
async function mad(data, len) {
  var length = (!len) ? data.length : len, med = [];
  for(var i = length; i <= data.length; i++) {
    var tmp = data.slice(i - length, i),
        m = await module.exports.median(tmp.slice()),
        adev = tmp.map(x => Math.abs(x - m[m.length-1]));
        adev = await module.exports.median(adev);
    med.push(adev[adev.length-1]);
  }
  return med;
}
async function aad(data, len) {
  var length = (!len) ? data.length : len, med = [];
  for(var i = length; i <= data.length; i++) {
    var tmp = data.slice(i-length, i), sum = 0,
        m = await module.exports.sma(tmp.slice(), length);
    for(q in tmp) sum += Math.abs(tmp[q] - m[m.length-1]);
    med.push(sum/length);
  }
  return med;
}
async function ssd(data, len) {
  var length = (!len) ? data.length : len, sd = [];
  for(var i = length; i < data.length; i++) {
    var mean = await module.exports.sma(data.slice(i-length, i), length), tmp = data.slice(i-length,i), sum = 0;
    for(let x in tmp) sum += (tmp[x] - mean[mean.length-1]) ** 2;
    sd.push(Math.sqrt(sum));
  }
  return sd;
}
async function rsi(data, len) {
  var length = (!len) ? 14 : len, arrsi = [];
  for(var i = len+1; i <= data.length; i++) {
    var pl = data.slice(i-(len+1), i), gain = 0, loss = 0;
    for(var q = 1; q < pl.length; q++) if(pl[q]-pl[q-1] < 0) {loss+=Math.abs(pl[q]-pl[q-1]);}else{gain+=pl[q]-pl[q-1];}
    rsi = Number(100 - 100 / (1 + ((gain / length) / (loss / length))));
    arrsi.push(rsi);
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
  var bo = data.map(x => (x[3]-x[0])/(x[1]-x[2])), len = (!len) ? 14 : len;
  bo = await module.exports.sma(bo, len);
  return bo;
}
async function fi(data, len) {
  var length = (!len) ? 13 : len, pl = [], ff = [];
  for(var i = 1; i < data.length; i++) {
    pl.push(data[i][0] - data[i - 1][0]);
    if(pl.length >= length) {
      var vfi = await module.exports.ema(pl.slice(), length);
      ff.push((data[i][0] - data[i - 1][0]) * vfi[0]);
      pl.splice(0, 1);
    }
  }
  return ff;
}
async function asi(data) {
  var a = [];
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
  data = data.map(x => (x[0]+x[1])/2);
  for(var i = len2; i <= data.length; i++) {
    var pl = data.slice(i-len2,i);
    var f = await module.exports.sma(pl.slice(), length1),
        s = await module.exports.sma(pl.slice(), length2);
    a.push(f[f.length - 1] - s[s.length - 1]);
  }
  return a;
}
async function pr(data, len) {
  var length = (!len) ? 14 : len, n = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), highd = await Math.max.apply(null, pl), lowd = await Math.min.apply(null, pl);
    n.push((highd - data[i-1]) / (highd - lowd) * -100);
  }
  return n;
}
async function lsma(data, len) {
  var length = (!len) ? 25 : len, lr = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0, sum_yy = 0, m, b;
    for(var q = 1; q <= length; q++) sum_x += q, sum_y += pl[q - 1], sum_xy += (pl[q - 1] * q), sum_xx += (q * q), sum_yy += (pl[q - 1] * pl[q - 1]);
    m = ((sum_xy - sum_x * sum_y / length) / (sum_xx - sum_x * sum_x / length));
    b = sum_y / length - m * sum_x / length;
    lr.push(m * length + b);
  }
  return lr;
}
async function don(data, len) {
  var channel = [], length = (!len) ? 20 : len;
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), highs = [], lows = [];
    for(let h in pl) highs.push(pl[h][0]), lows.push(pl[h][1]);
    var max = Math.max.apply(null, highs.slice()), min = Math.min.apply(null, lows.slice());
    channel.push([max, (max + min) / 2, min]);
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
  var length = (!len) ? 14 : len, smoothd = (!sd) ? 3 : sd, smoothk = (!sk) ? 3 : sk, stoch = [], high = [], low = [], ka = [];
  if(length < smoothd) [length, smoothd] = [smoothd, length];
  if(smoothk > smoothd) [smoothk, smoothd] = [smoothd, smoothk];
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
      var d = await module.exports.sma(ka.slice(), smoothd);
      stoch.push([k, d[d.length - 1]]);
      high.splice(0, 1);
      low.splice(0, 1);
      ka.splice(0, 1);
    }
  }
  return stoch;
}
async function atr(data, len) {
  var length = (!len) ? 14 : len, atr = [data[0][0] - data[0][2]];
  for(var i = 1; i < data.length; i++) {
    var t0 = await Math.max((data[i][0] - data[i - 1][1]), (data[i][2] - data[i - 1][1]), (data[i][0] - data[i][2]));
    atr.push((atr[atr.length - 1] * (length - 1) + t0) / length);
  }
  return atr;
}
async function sma(data, len) {
  var length = (!len) ? 14 : len, sma = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length, i), average = 0;
    for(q in pl) average += pl[q];
    sma.push(average / length);
  }
  return sma;
}
async function smma(data, len) {
  var length = (!len) ? 14 : len, smma = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), average = 0;
    for(q in pl) average += pl[q];
    if(smma.length <= 0) { smma.push(average / length); } else { smma.push((average - smma[smma.length - 1]) / length); }
  }
  smma.splice(0, 1);
  return smma;
}
async function wma(data, len) {
  var length = (!len) ? 14 : len, weight = 0, wma = [];;
  for(var i = 1; i <= length; i++) weight += i;
  for(var i = len; i <= data.length; i++) {
    var pl = data.slice(i-len,i), average = 0;
    for(q in pl) average += pl[q] * (Number(q)+1) / weight;
    wma.push(average);
  }
  return wma;
}
async function pwma(data, len) {
  var weight = 0, wmaa = [], weights = [], length = (!len) ? 14 : len;
  for(var i = length / 2, b = len; i >= 1; i--, b--) {
    if(i % 1 !== 0) {
      i = Math.round(i);
      weight += (i * b)
    } else {
      weights.push(i * b);
      weight += (i*b*2);
    }
    weights.unshift(i * b);
  }
  for(var i = length; i <= data.length; i++) {
    var average = 0, pl = data.slice(i-length,i);
    for(var a = length - 1; a >= 0; a--) average += pl[a] * weights[a] / weight;
    wmaa.push(average);
  }
  return wmaa;
}
async function hwma(data, len) {
  var weight = 0, wmaa = [], weights = [], length = (!len) ? 14 : len;
  for(var i = 1, b = length; i <= length / 2; i++, b--) {
    if(i % 1 !== 0) {
      i = Math.round(i);
      weight += (i * b)
    } else {
      weights.push(i * b);
      weight += (i*b*2);
    }
    weights.unshift(i * b);
  }
  for(var i = length; i <= data.length; i++) {
    var average = 0, pl = data.slice(i-length, i);
    for(var a = length - 1; a >= 0; a--) average += pl[a] * weights[a] / weight;
    wmaa.push(average);
  }
  return wmaa;
}
async function vwma(data, len) {
  var length = (!len) ? 20 : len, vwma = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
    pl = pl.map(x => [x[0] * x[1], x[1]]);
    var totalv = 0, totalp = 0;
    for(var o = 0; o < pl.length; o++) {
      totalv += pl[o][1];
      totalp += pl[o][0];
    }
    vwma.push(totalp/totalv);
  }
  return vwma;
}
async function ema(data, len) {
  var length = (!len) ? 12 : len, ema = [], weight = 2 / (length + 1);
  for(var i = length; i <= data.length; i++) {
    if(ema.length > 0) {
      ema.push((data[i-1] - ema[ema.length - 1]) * weight + ema[ema.length - 1]);
      continue;
    }
    var pl = data.slice(i-length,i), average = 0;
    for(q in pl) average += pl[q];
    ema.push(average / length);
  }
  return ema;
}
async function hull(data, len) {
  var length = (!len) ? 14 : len, pl = [], hma = [], ewma = await module.exports.wma(data.slice(), length), sqn = Math.round(Math.sqrt(length)),
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
  var length1 = (!len1) ? 12 : len1, length2 = (!len2) ? 26 : len2;
  if(length1 > length2) [length1, length2] = [length2, length1];
  var ema = await module.exports.ema(data, length1), emb = await module.exports.ema(data, length2), macd = [];
  ema.splice(0, length2 - length1);
  for(var i = 0; i < emb.length; i++) macd.push(ema[i] - emb[i]);
  return macd;
}
async function bands(data, len, dev) {
  var length = (!len) ? 14 : len, deviations = (!dev) ? 1 : dev, pl = [], deviation = [], boll = [],
      sma = await module.exports.sma(data, length);
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
  var length = (!len) ? 14 : len, deviations = (!dev) ? 1 : dev, boll = [],
  band = await module.exports.bands(data.slice(), length, deviations);
  for(var i = 0; i < band.length; i++) boll.push((band[i][0] - band[i][2]) / band[i][1]);
  return boll;
}
async function keltner(data, len, dev) {
  var length = (!len) ? 14 : len, devi = (!dev) ? 1 : dev,
      closing = [], atr = await module.exports.atr(data, length), kma, kelt = [];
  for(var i in data) closing.push((data[i][0] + data[i][1] + data[i][2]) / 3);
  kma = await module.exports.sma(closing, length);
  atr.splice(0, length - 1);
  for(var i = 0; i < kma.length; i++) kelt.push([kma[i] + atr[i] * devi, kma[i], kma[i] - atr[i] * devi]);
  return kelt
}
async function variance(data, len) {
  var length = (!len) ? data.length : len, va = [];
  for(var i = length; i <= data.length; i++) {
    var tmp = data.slice(i - length, i), mean = await module.exports.sma(tmp.slice(), length), sum = 0;
    for(x in tmp) sum += ((tmp[x] - mean[mean.length-1]) ** 2);
    va.push(sum/length);
  }
  return va;
}
async function std(data, len) {
  var length = (!len) ? data.length : len,
      mean = data.reduce((a, b) => {
    return Number(a) + Number(b);
  }) / length,
  std = Math.sqrt(data.reduce((sq, n) => {
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
async function dif(n, o) { return (n - o) / o; }
async function aroon_up(data, len) {
  var length = (!len) ? 10 : len, aroon = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), hl = pl.slice();
    hl.sort((a, b) => { return a - b; });
    aroon.push((100 * (length - (pl.findIndex(x => x === hl[length - 1]) + 1)) / length));
  }
  return aroon;
}
async function aroon_down(data, len) {
  var length = (!len) ? 10 : len, aroon = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i)
    var hl = pl.slice(0);
    hl.sort((a, b) => { return a - b; });
    aroon.push((100 * (length - (pl.findIndex(x => x === hl[0]) + 1)) / length));
    pl.splice(0, 1);
  }
  return aroon;
}
async function aroon_osc(data, len) {
  var length = (!len) ? 25 : len, aroon = [],
  u = await module.exports.aroon.up(data, length),
  d = await module.exports.aroon.down(data, length);
  for(var i = 0; i < u.length; i++) aroon.push(u[i] - d[i]);
  return aroon;
}
async function mfi(data, len) {
  var length = (!len) ? 14 : len, mfi = [], n = data.map(x => x[1]), p = data.map(x => x[0]);
  for(var i = length; i <= data.length; i++) {
    var pos = 0, neg = 0;
    for(q = i-length; q < i; q++) pos += p[q], neg += n[q];
    mfi.push((100 - 100 / (1 + pos / neg)));
  }
  return mfi;
}
async function roc(data, len) {
  var length = (!len) ? 14 : len, roc = [];
  for(var i = length; i <= data.length; i++) roc.push((data[i-1] - data[i-length]) / data[i-length]);
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
    if(data[i][1] === data[i - 1][1]) obv.push(obv[obv.length - 1])
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
  var length = (!len) ? 9 : len, osc = [];
  for(var i = length; i < data.length; i++) {
    var sumh = 0, suml = 0;
    for(var a = 1; a < length; a++) (data[i-length+(a-1)] < data[i-length+a]) ? sumh += data[i-length+a] : suml += data[i-length+a];
    osc.push((sumh - suml) / (sumh + suml) * 100);
  }
  return osc;
}
async function ha(data) {
  var ha = [[(Number(data[0][0]) + Number(data[0][3])) / 2, Number(data[0][1]), Number(data[0][2]), (Number(data[0][0]) + Number(data[0][1]) + Number(data[0][2]) + Number(data[0][3])) / 4]];
  for(var i = 1; i < data.length; i++) {
    ha.push([(ha[ha.length - 1][0] + ha[ha.length - 1][3]) / 2, Math.max(ha[ha.length - 1][0], ha[ha.length - 1][3], data[i][1]), Math.min(ha[ha.length - 1][0], ha[ha.length - 1][3], data[i][2]), (data[i][0] + data[i][1] + data[i][2] + data[i][3]) / 4]);
  }
  return ha;
}
async function ren(data, bs) {
  var re = [], bs = (!bs) ? 1 : bs, decimals = (function(){
    if(Math.floor(bs) === bs) return 0;
    return bs.toString().split(".")[1].length || 0;
  })(), bh = Math.ceil(data[0][0] / bs * (10 ** decimals)) / (10 ** decimals) * bs, bl = bh - bs;
  for(var i = 1; i < data.length; i++) {
    if(data[i][0] > bh + bs) {
      do {
        re.push([bh,bh+bs,bh,bh+bs]);
        bh+=bs;
        bl+=bs;
      } while(data[i][0] > bh + bs);
    }
    if(data[i][1] < bl - bs) {
      do {
        re.push([bl,bl,bl-bs,bl-bs]);
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
  bop, cop, kama, mad, aad, variance, ssd, pwma, hwma, kmeans,
  normalize, denormalize
}
