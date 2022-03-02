const multi = (Number(process.versions.node.split('.')[0]) >= 12) ? require('./multi/multi.js') : undefined;
async function median(data, len) {
  var length = (!len) ? data.length : len, med = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-len,i);
    pl.sort((a, b) => a-b);
    med.push(pl[Math.round(pl.length / 2)-1]);
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
async function normalize_pair(data1, data2) {
  var f = (data1[0] + data2[0]) / 2, ret = [[f,f]];
  for(var i = 1; i < data1.length; i++) ret.push([ret[ret.length-1][0]*((data1[i]-data1[i-1])/data1[i-1]+1),ret[ret.length-1][1]*((data2[i]-data2[i-1])/data2[i-1]+1)]);
  return ret;
}
async function normalize_from(data, value) {
  var ret = [value];
  for(var i = 1; i < data.length; i++) ret.push(ret[ret.length-1]*((data[i]-data[i-1])/data[i-1]+1));
  return ret;
}
async function standardize(data) {
  var mean = await module.exports.sma(data, data.length),
      std = await module.exports.std(data), res = [];
  for(var i = 0; i < data.length; i++) res.push((data[i]-mean[0])/std);
  return res;
}
async function mad(data, len) {
  var length = (!len) ? data.length : len, med = [];
  for(var i = length; i <= data.length; i++) {
    var tmp = data.slice(i - length, i),
        m = await module.exports.median(tmp),
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
        m = await module.exports.sma(tmp, length);
    for(q in tmp) sum += Math.abs(tmp[q] - m[m.length-1]);
    med.push(sum/length);
  }
  return med;
}
async function ssd(data, len) {
  var length = (!len) ? data.length : len, sd = [];
  for(var i = length; i <= data.length; i++) {
    var tmp = data.slice(i-length,i), mean = await module.exports.sma(tmp, length), sum = 0;
    for(let x in tmp) sum += (tmp[x] - mean[mean.length-1]) ** 2;
    sd.push(Math.sqrt(sum));
  }
  return sd;
}
async function er(data) {
  var wins = [], losses = [], wp = 1, lp = 1;
  for(let i in data) (data[i] >= 0) ? wins.push(1+data[i]) : losses.push(1+data[i]);
  var win = (wins.length / data.length), loss = (losses.length / data.length);
  for(let i in losses) lp *= losses[i];
  for(let i in wins) wp *= wins[i];
  return (((wp**(1/wins.length)-1)*100) * win + ((lp**(1/losses.length)-1)*100) * loss) / 100;
}
async function ar(data, len) {
  var out = [];
  for(var i = len; i < data.length; i++) {
    var exp = await module.exports.er(data.slice(i-len,i));
    out.push(data[i]-exp);
  }
  return out;
}
async function kelly(data) {
  var exp = await module.exports.er(data) + 1,
      winr = await module.exports.winratio(data);
  return winr - (1-winr) / exp;
}
async function winratio(data) {
  var wins = 0, losses = 0;
  for(let i in data) (data[i] >= 0) ? wins++ : losses++;
  return wins / (losses + wins);
}
async function avgwin(data) {
  var wins = [];
  for(var i = 0; i < data.length; i++) if(data[i] >= 0) wins.push(data[i]);
  var avg = await module.exports.sma(wins, wins.length);
  return avg[0];
}
async function avgloss(data) {
  var loss = [];
  for(var i = 0; i < data.length; i++) if(data[i] < 0) loss.push(data[i]);
  var avg = await module.exports.sma(loss, loss.length);
  return avg[0];
}
async function zscore(data, len) {
  var out = [], pl = data.slice(0,len-1);
  for(let i = len-1; i < data.length; i++) {
    pl.push(data[i]);
    var mean = await module.exports.sma(pl, len),
        stdv = await module.exports.std(pl, len);
    out.push((data[i]-mean[0])/stdv)
    pl.splice(0,1);
  }
  return out;
}
async function rsi(data, len) {
  var length = (!len) ? 14 : len, arrsi = [], pl = data.slice(0,length-1);
  for(var i = length-1,gain=0,loss=0; i < data.length; i++,gain=0,loss=0) {
    pl.push(data[i]);
    for(var q = 1; q < pl.length; q++) if(pl[q]-pl[q-1] < 0) {loss+=Math.abs(pl[q]-pl[q-1]);}else{gain+=pl[q]-pl[q-1];}
    var rsi = 100 - 100 / (1 + ((gain / length) / (loss / length)));
    arrsi.push(rsi);
    pl.splice(0,1);
  }
  return arrsi;
}
async function wrsi(data, len) {
  var length = (!len) ? 14 : len, arrsi = [], u = [], d = [];
  for(var i = 1; i < data.length; i++) if(data[i]-data[i-1]<0) {d.push(Math.abs(data[i]-data[i-1])),u.push(0);}else{d.push(0),u.push(data[i]-data[i-1]);}
  d = await module.exports.wsma(d, length), u = await module.exports.wsma(u, length);
  for(let i in d) arrsi.push(100-100/(1+(u[i]/d[i])));
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
    pl.push((data[i][0] - data[i - 1][0]) * data[i][1]);
    if(pl.length >= length) {
      var vfi = await module.exports.ema(pl, length);
      ff.push(vfi[vfi.length-1]);
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
  var length1 = (!len1) ? 5 : len1, length2 = (!len2) ? 35 : len2, a = [];
      data = data.map(x => (x[0]+x[1])/2);
  for(var i = length2; i <= data.length; i++) {
    var pl = data.slice(i-length2,i);
    var f = await module.exports.sma(pl, length1),
        s = await module.exports.sma(pl, length2);
    a.push(f[f.length - 1] - s[s.length - 1]);
  }
  return a;
}
async function ac(data, len1, len2) {
  len1 = (!len1) ? 5 : len1, len2 = (!len2) ? 35 : len2;
  var a = await ao(data, len1, len2), sm = await sma(a, len1), acr = [];
  if(a.length > sm.length) {a.splice(0, a.length-sm.length)} else {sm.splice(0,sm.length-a.length)}
  for(let i in a) acr.push(a[i]-sm[i]);
  return acr;
}
async function fib(start, end) { return [start, (end-start)*.236+start, (end-start)*.382+start, (end-start)*.5+start, (end-start)*.618+start, (end-start)*.786+start, end, (end-start)*1.618+start, (end-start)*2.618+start, (end-start)*3.618+start, (end-start)*4.236+start]}
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
    if(pl.length >= length3) {
      var highs = [], lows = [];
      for(let a in pl) highs.push(pl[a][0]), lows.push(pl[a][2]);
      var tsen = (Math.max.apply(null, highs.slice((highs.length - length1), highs.length)) + Math.min.apply(null, lows.slice((lows.length - length1), lows.length))) / 2,
          ksen = (Math.max.apply(null, highs.slice((highs.length - length2), highs.length)) + Math.min.apply(null, lows.slice((lows.length - length2), lows.length))) / 2,
          senka = data[i][1] + ksen,
          senkb = (Math.max.apply(null, highs.slice((highs.length - length3), highs.length)) + Math.min.apply(null, lows.slice((lows.length - length2), lows.length))) / 2;
          chik = data[i][1];
          place.push([tsen, ksen, senka, senkb, chik]);
      pl.splice(0, 1);
    }
  }
  for(var i = length4; i < place.length - length4; i++) {
    cloud.push([place[i][0], place[i][1], place[i + length4][2], place[i + length4][3], place[i - length4][4]]);
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
      var d = await module.exports.sma(ka, smoothd);
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
  for(var i = length, avg = 0; i <= data.length; i++, avg=0) {
    var pl = data.slice(i-length, i);
    for(q in pl) avg += pl[q];
    sma.push(avg / length);
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
  var length = (!len) ? 14 : len, weight = 0, wma = [];
  for(var i = 1; i <= length; i++) weight += i;
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), average = 0;
    for(q in pl) average += pl[q] * (Number(q)+1) / weight;
    wma.push(average);
  }
  return wma;
}
async function wsma(data, len) {
  var length = (!len) ? 14 : len, wsm = [], weight = 1/length;
  for(var i = length; i <= data.length; i++) {
    if(wsm.length > 0) {
      wsm.push((data[i-1]-wsm[wsm.length-1]) * weight + wsm[wsm.length-1]);
      continue;
    }
    var pl = data.slice(i-length,i),average=0;
    for(q in pl) average += pl[q];
    wsm.push(average/length);
  }
  return wsm;
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
  var length = (!len) ? 20 : len, vwma = [], data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
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
  var length = (!len) ? 14 : len, pl = [], hma = [], ewma = await module.exports.wma(data, length), sqn = Math.round(Math.sqrt(length)),
  first = await wma(data, Math.round(length / 2));
  first.splice(0, first.length - ewma.length);
  for(let i in ewma) {
    pl.push((first[i] * 2) - ewma[i]);
    if(pl.length >= sqn) {
      var h = await wma(pl, sqn);
      hma.push(h[0]);
      pl.splice(0,1);
    }
  }
  return hma;
}
async function kama(data, len1, len2, len3) {
  len1 = (!len1) ? 10 : len1, len2 = (!len2) ? 2 : len2, len3 = (!len3) ? 30 : len3;
  var ka = await module.exports.sma(data, len1), ka = [ka[ka.length - 1]];
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
  band = await module.exports.bands(data, length, deviations);
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
    var tmp = data.slice(i - length, i), mean = await module.exports.sma(tmp, length), sum = 0;
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
async function normsinv(p) {
  var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969, a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924,
      b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887, b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03,
      c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373, c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03,
      d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742, p_low = 0.02425, p_high = 1 - p_low;
  if(p < 0 || p > 1) return 0;
  if(p < p_low) {
    var q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  if(p <= p_high) {
    var q = p - 0.5,
        r = q * q;
    return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  }
  var q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
}
async function sim(d, length, sims, perc) {
  var sd = [], length = (!length) ? 50 : length, sims = (!sims) ? 1000 : sims;
  for(var i = 0; i < sims; i++) {
    var projected = d.slice();
    for(var x = 0; x < length; x++) {
      var change = [];
      for(var y = 1; y < projected.length; y++) {
        var df = await module.exports.dif(projected[y],projected[y-1]);
        change.push(df);
      }
      var mean = await module.exports.sma(change, change.length),
          std = await module.exports.std(change), random = await module.exports.normsinv(Math.random());
      projected.push(projected[projected.length-1]*Math.exp(mean[0]-(std*std)/2+std*random));
    }
    sd.push(projected);
  }
  return (!perc) ? sd : await module.exports.percentile(sd, perc);
}
async function percentile(data, perc) {
  var final = [];
  for(var i = 0; i < data[0].length; i++) {
    data.sort((a, b) => a[i]-b[i]);
    final.push(data[Math.round((data.length-1)*perc)][i]);
  }
  return final;
}
async function cor(data1, data2) {
  var d1avg = await module.exports.sma(data1, data1.length),
      d2avg = await module.exports.sma(data2, data2.length),
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
async function log(d) { return d.map(x=>Math.log(x)); }
async function exp(d) { return d.map(x=>Math.exp(x)); }
async function drawdown(d) {
  var max = d[0], min = d[0], big = 0;
  for(var y = 1; y < d.length; y++) {
    if(d[y] > max) {
      if(min != 0) {
        var diff = await module.exports.dif(min, max);
        if(diff < big) big = diff;
        min = d[y];
      }
      max = d[y];
    }
    if(d[y] < min) min = d[y];
  }
  var diff = await module.exports.dif(min, max);
  if(diff < big) big = diff
  return big;
}
async function aroon_up(data, len) {
  var length = (!len) ? 10 : len, aroon = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), hl = pl.slice();
    hl.sort((a, b) => a-b);
    aroon.push((100 * (length-1-pl.reverse().findIndex(x => x === hl[length - 1])) / (length-1)));
  }
  return aroon;
}
async function aroon_down(data, len) {
  var length = (!len) ? 10 : len, aroon = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), hl = pl.slice();
    hl.sort((a, b) => a-b);
    aroon.push((100 * (length-1-pl.reverse().findIndex(x => x === hl[0])) / (length-1)));
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
    var r1 = data.slice(i - (max + len3), i), r2 = r1.slice(), tmp = [];
    r1 = await module.exports.roc(r1, len1), r2 = await module.exports.roc(r2, len2), r1.splice(0, r1.length - r2.length), r2.splice(0, r2.length - r1.length);
    for(var a = 0; a < r1.length; a++) tmp.push(r1[a] + r2[a]);
    tmp = await module.exports.wma(tmp, len3);
    co.push(tmp[tmp.length - 1]);
  }
  return co;
}
async function kst(data, r1, r2, r3, r4, s1, s2, s3, s4, sig) {
  r1 = (!r1) ? 10 : r1, r2 = (!r2) ? 15 : r2, r3 = (!r3) ? 20 : r3, r4 = (!r4) ? 30 : r4, s1 = (!s1) ? 10 : s1, s2 = (!s2) ? 10 : s2, s3 = (!s3) ? 10 : s3, s4 = (!s4) ? 15 : s4, sig = (!sig) ? 9 : sig;
  var ks = [], fs = [], ms = (Math.max(r1, r2, r3, r4) + Math.max(s1, s2, s3, s4));
  for(var i = ms; i <= data.length; i++) {
    var pl = data.slice(i-ms,i),
        rcma1 = await module.exports.roc(pl, r1),
        rcma2 = await module.exports.roc(pl, r2),
        rcma3 = await module.exports.roc(pl, r3),
        rcma4 = await module.exports.roc(pl, r4);
        rcma1 = await module.exports.sma(rcma1, s1);
        rcma2 = await module.exports.sma(rcma2, s2);
        rcma3 = await module.exports.sma(rcma3, s3);
        rcma4 = await module.exports.sma(rcma4, s4);
      ks.push(rcma1[rcma1.length - 1] + rcma2[rcma2.length - 1] + rcma3[rcma3.length - 1] + rcma4[rcma4.length - 1]);
  }
  var sl = await module.exports.sma(ks, sig);
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
  var length = (!len || len > data.length) ? data.length : len, data = data.map(x=>[x[0]*x[1],x[1]]), vwap = [];
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i),
        totalv = 0, totalp = 0;
    for(var o = 0; o < pl.length; o++) totalv+=pl[o][1], totalp+=pl[o][0];
    vwap.push(totalp/totalv);
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
  var length = (!len) ? 9+1 : len+1, osc = [];
  for(var i = length; i <= data.length; i++) {
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
async function envelope(data, len, p) {
  len = (!len) ? 10 : len; p = (!p) ? 0.005 : p;
  var enve = [];
  for(var i = len; i < data.length; i++) {
    var sm = await module.exports.sma(data.slice(i-len,i), len);
    enve.push([sm[0]*(1+p),sm[0],sm[0]*(1-p)]);
  }
  return enve;
}
async function chaikin_osc(data, ema1, ema2) {
  ema1 = (!ema1) ? 3 : ema1; ema2 = (!ema2) ? 10 : ema2;
  var cha = [], adl = [];
  for(var i = 0; i < data.length; i++) {
    var mfm = ((data[i][1]-data[i][2])-(data[i][0]-data[i][1]))/(data[i][0]-data[i][2]);
    (isNaN(mfm)) ? adl.push(0) : adl.push(mfm*data[i][3])
  }
  var ef = await module.exports.ema(adl, ema1), es = await module.exports.ema(adl, ema2);
  if(ef.length > es.length) { ef.splice(0,ef.length-es.length); } else { es.splice(0,es.length-ef.length); }
  for(var i = 0; i < ef.length; i++) cha.push(ef[i]-es[i]);
  return cha;
}
async function fractals(data) {
  var fractals = [[false, false], [false, false]];
  for(var i = 2; i < data.length-2; i++) {
    var up = (data[i-2][0] < data[i][0] && data[i-1][0] < data[i][0] && data[i][0] > data[i+1][0] && data[i][0] > data[i+2][0]) ? true : false,
        down = (data[i-2][1] > data[i][1] && data[i-1][1] > data[i][1] && data[i][1] < data[i+1][1] && data[i][1] < data[i+2][1]) ? true : false;
    fractals.push([up, down]);
  }
  fractals.push([false,false], [false, false]);
  return fractals;
}
async function alligator(data, jl, tl, ll, js, ts, ls) {
  jl = (!jl) ? 13 : jl; tl = (!tl) ? 8 : tl; ll = (!ll) ? 5 : ll;
  js = (!js) ? 8 : js; ts = (!ts) ? 5 : ts; ls = (!ls) ? 3 : ls;
  var ret = [],
      jaw = await module.exports.smma(data, jl),
      teeth = await module.exports.smma(data, tl),
      lips = await module.exports.smma(data, ll);
  teeth.splice(0,teeth.length-jaw.length);
  lips.splice(0,lips.length-jaw.length);
  for(var i = jaw.length-1; i >= 7; i--) ret.push([jaw[i-(js-1)], teeth[i-(ts-1)], lips[i-(ls-1)]]);
  return ret;
}
async function gator(data, jl, tl, ll, js, ts, ls) {
  jl = (!jl) ? 13 : jl; tl = (!tl) ? 8 : tl; ll = (!ll) ? 5 : ll;
  js = (!js) ? 8 : js; ts = (!ts) ? 5 : ts; ls = (!ls) ? 3 : ls;
  var ret = [],
      jaw = await module.exports.smma(data, jl),
      teeth = await module.exports.smma(data, tl),
      lips = await module.exports.smma(data, ll);
  teeth.splice(0,teeth.length-jaw.length);
  lips.splice(0,lips.length-jaw.length);
  for(var i = jaw.length-1; i >= (js-1); i--) ret.push([jaw[i-(js-1)]-teeth[i-(ts-1)], -(Math.abs(teeth[i-(ts-1)]-lips[i-(ls-1)]))]);
  return ret;
}
async function recent_high(data, lb) {
  lb = (!lb) ? 25 : lb;
  var xback = lb, hindex = 0, highest = data[data.length-1];
  for(var i = data.length-2; i >= 0; i--) {
    if(data[i] >= highest && xback > 0) {
      highest = data[i];
      hindex = i;
      xback = lb;
    } else {
      xback--;
    }
    if(xback <= 0) break;
  }
  return {index: hindex, value: highest};
}
async function recent_low(data, lb) {
  lb = (!lb) ? 25 : lb;
  var xback = lb, lindex = 0, lowest = data[data.length-1];
  for(var i = data.length-2; i >= 0; i--) {
    if(data[i] <= lowest && xback > 0) {
      lowest = data[i];
      lindex = i;
      xback = lb;
    } else {
      xback--;
    }
    if(xback <= 0) break;
  }
  return {index: lindex, value: lowest};
}
async function support(d, hl) {
  hl = (!hl) ? await recent_low(d) : hl;
  var index2, findex, lowform = hl.value;
  do {
    for(var i = hl.index; i < d.length; i++) {
      var newlow = (hl.value-d[i])/(hl.index-i);
      if(newlow < lowform) {
        lowform = newlow;
        index2 = i;
      }
    }
    if(hl.index + 1 == index2 && index2 != d.length-1) {
      hl.index = index2;
      lowform = Math.min.apply(null, d.slice());
      hl.value = d[hl.index];
      findex = false;
    } else {
      findex = true;
    }
    if(hl.index == d.length-1) findex = true;
  } while(!findex);
  if(index2 == d.length-1 || hl.index == d.length-1) return {calculate: async(pos) => hl.value, slope: 0, lowest: hl.value, index: hl.index};
  return {calculate: async(pos) => pos*lowform+hl.value, slope: lowform, lowest: hl.value, index: hl.index};
}
async function resistance(d, hl) {
  hl = (!hl) ? await recent_high(d) : hl;
  var index2, findex, highform = hl.value;
  do {
    for(var i = hl.index; i < d.length; i++) {
      var newhigh = (d[i]-hl.value)/(hl.index-i);
      if(newhigh < highform) {
        highform = newhigh;
        index2 = i;
      }
    }
    if(hl.index+1 == index2 && index2 != d.length-1) {
      hl.index = index2;
      highform = Math.max.apply(null, d.slice());
      hl.value = d[hl.index];
      findex = false;
    } else {
      findex = true;
    }
    if(hl.index == d.length-1) findex = true;
  } while(!findex);
  if(index2 == d.length-1 || hl.index == d.length-1) return {calculate: async(pos) => hl.value, slope: 0, highest: hl.value, index: hl.index};
  return {calculate: async(pos) => pos*-highform+hl.value, slope: highform, highest: hl.value, index: hl.index};
}
async function fisher(data, len) {
  var out = [], fish = 0, v1 = 0;
  for(let i = len; i <= data.length; i++) {
    var pl = data.slice(i-len,i), pf = fish,
        mn = Math.min.apply(null, pl),
        v1 = .33*2*((data[i-1]-mn)/(Math.max.apply(null, pl)-mn)-.5)+.67*v1;
    if(v1 > .99) v1 = 0.999;
    if(v1 < -0.99) v1 = -0.999;
    fish = 0.5 * Math.log((1+v1)/(1-v1)) + 0.5 * pf;
    out.push([fish, pf]);
  }
  return out.slice(1,out.length);
}
async function cross(d1, d2) {
  d1.splice(0, d1.length - d2.length);
  var cross = (d1[0] > d2[0]), indexes = [];
  for(var i = 0; i < d1.length; i++) {
    if(d1[i] < d2[i] && cross) {
      indexes.push({index: i, cross: false});
      cross = false;
    }
    if(d1[i] > d2[i] && !cross) {
      indexes.push({index: i, cross: true});
      cross = true;
    }
  }
  return indexes;
}
async function se(data, size) {
  size = (!size) ? data.length : size;
  var stdv = await module.exports.std(data);
  return stdv / (size ** 0.5);
}
async function halftrend(data, atrlen, amplitude, deviation) {
  let out = [], nexttrend = [0], trend = [0], up = [0], down = [0], direction = undefined;
  for(let i = atrlen; i <= data.length; i++) {
    let pl = data.slice(i-atrlen,i);
        maxlow = pl[pl.length-2][2],
        minhigh = pl[pl.length-2][0],
        atr2 = await module.exports.atr(pl, atrlen);
        atr2 = atr2[atr2.length-1] / 2;
    let dev = deviation * atr2,
        highprice = Math.max.apply(null, pl.slice(pl.length-1, pl.length).map(x=>x[0])),
        lowprice = Math.min.apply(null, pl.slice(pl.length-1, pl.length).map(x=>x[2])),
        highma = await module.exports.sma(pl.slice(pl.length-amplitude,pl.length).map(x=>x[0]), amplitude),
        lowma = await module.exports.sma(pl.slice(pl.length-amplitude,pl.length).map(x=>x[2]), amplitude);
    if(nexttrend[nexttrend.length-1] == 1) {
      maxlow = Math.max(lowprice, maxlow);
      if(highma[0] < maxlow && pl[pl.length-1][1] < pl[pl.length-2][2]) {
        trend.push(1)
        nexttrend.push(0)
        minhigh = pl[pl.length-2][0]
      }
    } else {
      minhigh = Math.min(highprice, minhigh)
      if(lowma[0] > minhigh && pl[pl.length-1][1] < pl[pl.length-2][0]) {
        trend.push(0);
        nexttrend.push(1);
        maxlow = lowprice
      }
    }
    if(trend[trend.length-1] == 0) {
      if(!isNaN(trend[trend.length-2]) && trend[trend.length-2] != 0) {
        up.push((isNaN(down[down.length-2])) ? down[down.length-1] : down[down.length-2])
      } else {
        up.push((isNaN(up[up.length-2])) ? maxlow : Math.max(up[up.length-2], maxlow))
      }
      direction = 'long';
      var atrHigh = up[up.length-1] + dev,
          atrLow = up[up.length-1] - dev;
    } else {
      if(!isNaN(trend[trend.length-2]) && trend[trend.length-2] != 1) {
        down.push((isNaN(up[up.len-2])) ? up[up.length-1] : up[up.length-2])
      } else {
        down.push((isNaN(down[down.length-2])) ? minhigh : Math.min(minhigh, down[down.length-2]))
      }
      direction = 'short'
      var atrHigh = down[down.length-1] + dev,
          atrLow = down[down.length-1] - dev
    }
    out.push([atrHigh, (trend[trend.length-1] == 0) ? up[up.length-1] : down[down.length-1], atrLow, direction]);
  }
  return out;
}
module.exports = {
  aroon: { up: aroon_up, down: aroon_down, osc: aroon_osc,},
  rsi, tsi, fi, pr, stoch, atr, sma, smma, wma, vwma, ao, asi,
  ema, macd, lsma, don, ichimoku, bands, bandwidth, median, keltner,
  std, cor, dif, hull, mfi, roc, kst, obv, vwap, mom, mom_osc, ha, ren,
  bop, cop, kama, mad, aad, variance, ssd, pwma, hwma, kmeans, drawdown,
  normalize, denormalize, wrsi, wsma, normsinv, sim, multi, percentile,
  envelope, chaikin_osc, fractals, recent_high, recent_low, support,
  resistance, ac, fib, alligator, gator, standardize, er, winratio,
  avgwin, avgloss, fisher, cross, se, kelly, normalize_pair, normalize_from,
  ar, zscore, log, exp, halftrend
}
