const multi = (typeof process === 'object' && Number(process.versions.node.split('.')[0]) >= 12) ? require('./multi/multi.js') : undefined;
async function median(data, length=data.length) {
  for(var i = length, med = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
    pl.sort((a, b) => a-b);
    med.push(pl[Math.round(pl.length / 2)-1]);
  }
  return med;
}
async function kmeans(data, clusters) {
  var means = [], centers = [], old = [], n, changed = false, init = Math.round(data.length/(clusters+1));
  for(var i = 0; i < clusters; i++) centers[i] = data[init*(i+1)];
  do {
    for(var i = 0; i < clusters; i++) means[i] = [];
    for(var x = 0; x < data.length; x++) {
      var range = -1, oldrange = -1;
      for(var y = 0; y < clusters; y++) {
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
    for(var x = 0; x < clusters; x++) {
      var sm = 0;
      for(var y = 0; y < means[x].length; y++) sm += means[x][y];
      var m = sm / means[n].length;
      centers[x] = m;
    }
    for(var x = 0; x < clusters; x++) if(centers[x] !== old[x]) changed = true;
  } while(changed);
  return means;
}
async function normalize(data, marg=0) {
  for(var i = 0, max = await Math.max.apply(null, data.slice())*(1+marg), min = await Math.min.apply(null, data.slice())*(1-marg), norm = []; i < data.length; i++) norm.push(1-(max-data[i])/(max-min));
  return norm;
}
async function denormalize(data, norm, marg=0) {
  for(var i = 0, max = await Math.max.apply(null, data.slice())*(1+marg), min = await Math.min.apply(null, data.slice())*(1-marg), dnorm = []; i < norm.length; i++) dnorm.push(min+norm[i]*(max-min));
  return dnorm;
}
async function normalize_pair(data1, data2) {
  for(var i = 1, f = (data1[0] + data2[0]) / 2, ret = [[f,f]]; i < data1.length; i++) ret.push([ret[ret.length-1][0]*((data1[i]-data1[i-1])/data1[i-1]+1),ret[ret.length-1][1]*((data2[i]-data2[i-1])/data2[i-1]+1)]);
  return ret;
}
async function normalize_from(data, value) {
  for(var i = 1, ret = [value]; i < data.length; i++) ret.push(ret[ret.length-1]*((data[i]-data[i-1])/data[i-1]+1));
  return ret;
}
async function standardize(data) {
  var mean = await module.exports.sma(data, data.length),
      std = await module.exports.std(data), res = [];
  for(var i = 0; i < data.length; i++) res.push((data[i]-mean[0])/std);
  return res;
}
async function mad(data, length=data.length) {
  for(var i = length, med = []; i <= data.length; i++) {
    var tmp = data.slice(i - length, i),
        m = await module.exports.median(tmp),
        adev = tmp.map(x => Math.abs(x - m[m.length-1]));
        adev = await module.exports.median(adev);
    med.push(adev[adev.length-1]);
  }
  return med;
}
async function aad(data, length=data.length) {
  for(var i = length, med = []; i <= data.length; i++) {
    var tmp = data.slice(i-length, i), sm = 0,
        m = await module.exports.sma(tmp, length);
    for(var q in tmp) sm += Math.abs(tmp[q] - m[m.length-1]);
    med.push(sm/length);
  }
  return med;
}
async function ssd(data, length=data.length) {
  for(var i = length, sd = []; i <= data.length; i++) {
    var tmp = data.slice(i-length,i), mean = await module.exports.sma(tmp, length), sm = 0;
    for(var x in tmp) sm += (tmp[x] - mean[mean.length-1]) ** 2;
    sd.push(Math.sqrt(sm));
  }
  return sd;
}
async function er(data) {
  var wins = [], losses = [], wp = 1, lp = 1;
  for(var i in data) (data[i] >= 0) ? wins.push(1+data[i]) : losses.push(1+data[i]);
  var win = (wins.length / data.length), loss = (losses.length / data.length);
  for(var i in losses) lp *= losses[i];
  for(var i in wins) wp *= wins[i];
  return (((wp**(1/wins.length)-1)*100) * win + ((lp**(1/losses.length)-1)*100) * loss) / 100;
}
async function ar(data, len=data.length) {
  for(var i = len, out = []; i < data.length; i++) {
    var exp = await module.exports.er(data.slice(i-len,i));
    out.push(data[i]-exp);
  }
  return out;
}
async function kelly(data) {
  var exp = await module.exports.er(data) + 1,
      winr = await module.exports.winratio(data);
  if(isNaN(exp)) exp = 1;
  return winr - (1-winr) / exp;
}
async function martingale(data, bet, max, multiplier=2) {
  var current = bet;
  for(var i in data) {
    if(data[i] < 0) {
      current *= multiplier;
    } else if(data[i] > 0) {
      current = bet;
    }
  }
  return (current > max) ? max : current;
}
async function antimartingale(data, bet, max, multiplier=2) {
  var current = bet;
  for(var i in data) {
    if(data[i] > 0) {
      current *= multiplier;
    } else if(data[i] < 0) {
      current = bet;
    }
  }
  return (current > max) ? max : current;
}
async function winratio(data) {
  var wins = 0, losses = 0;
  for(var i in data) (data[i] >= 0) ? wins++ : losses++;
  return wins / (losses + wins);
}
async function avgwin(data) {
  for(var i = 0, wins = []; i < data.length; i++) if(data[i] >= 0) wins.push(data[i]);
  var avg = await module.exports.sma(wins, wins.length);
  return avg[0];
}
async function avgloss(data) {
  var loss = [];
  for(var i = 0; i < data.length; i++) if(data[i] < 0) loss.push(data[i]);
  var avg = await module.exports.sma(loss, loss.length);
  return avg[0];
}
async function zscore(data, len=data.length) {
  for(var i = len-1, out = [], pl = data.slice(0,len-1); i < data.length; i++) {
    pl.push(data[i]);
    var mean = await module.exports.sma(pl, len),
        stdv = await module.exports.std(pl, len);
    out.push((data[i]-mean[0])/stdv)
    pl.splice(0,1);
  }
  return out;
}
async function rsi(data, length=14) {
  for(var i = length-1,gain=0,loss=0,arrsi = [], pl = data.slice(0,length-1); i < data.length; i++,gain=0,loss=0) {
    pl.push(data[i]);
    for(var q = 1; q < pl.length; q++) if(pl[q]-pl[q-1] < 0) {loss+=Math.abs(pl[q]-pl[q-1]);}else{gain+=pl[q]-pl[q-1];}
    var rsi = 100 - 100 / (1 + ((gain / length) / (loss / length)));
    arrsi.push(rsi);
    pl.splice(0,1);
  }
  return arrsi;
}
async function wrsi(data, length=14) {
  for(var i = 1, arrsi = [], u = [], d = []; i < data.length; i++) if(data[i]-data[i-1]<0) {d.push(Math.abs(data[i]-data[i-1])),u.push(0);}else{d.push(0),u.push(data[i]-data[i-1]);}
  d = await module.exports.wsma(d, length), u = await module.exports.wsma(u, length);
  for(var i in d) arrsi.push(100-100/(1+(u[i]/d[i])));
  return arrsi;
}
async function tsi(data, long=25, short=13, signal=13) {
  for(var i = 1, mom = [], abs = [], ts = [], tsi = []; i < data.length; i++) {
    mom.push(data[i] - data[i - 1]);
    abs.push(Math.abs(data[i] - data[i - 1]));
  }
  var sma1 = await module.exports.ema(mom,long),
      sma2 = await module.exports.ema(abs,long),
      ema1 = await module.exports.ema(sma1,short),
      ema2 = await module.exports.ema(sma2,short);
  for(var i = 0; i < ema1.length; i++) ts.push(ema1[i] / ema2[i]);
  var tma = await module.exports.ema(ts, signal);
  ts.splice(0, ts.length - tma.length)
  for(var i = 0; i < tma.length; i++) tsi.push([tma[i], ts[i]]);
  return tsi;
}
async function bop(data, len=14) {
  var bo = data.map(x => (x[3]-x[0])/(x[1]-x[2])),
      bo = await module.exports.sma(bo, len);
  return bo;
}
async function fi(data, length=13) {
  for(var i = 1, pl = [], ff = []; i < data.length; i++) {
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
  for(var i = 1, a = []; i < data.length; i++) {
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
async function ao(data, length1=5, length2=35) {
  data = data.map(x => (x[0]+x[1])/2);
  for(var i = length2, a = []; i <= data.length; i++) {
    var pl = data.slice(i-length2,i);
    var f = await module.exports.sma(pl, length1),
        s = await module.exports.sma(pl, length2);
    a.push(f[f.length - 1] - s[s.length - 1]);
  }
  return a;
}
async function ac(data, len1=5, len2=35) {
  var a = await ao(data, len1, len2), sm = await sma(a, len1), acr = [];
  if(a.length > sm.length) {a.splice(0, a.length-sm.length)} else {sm.splice(0,sm.length-a.length)}
  for(var i in a) acr.push(a[i]-sm[i]);
  return acr;
}
const fib = async(start, end) => [start, (end-start)*.236+start, (end-start)*.382+start, (end-start)*.5+start, (end-start)*.618+start, (end-start)*.786+start, end, (end-start)*1.618+start, (end-start)*2.618+start, (end-start)*3.618+start, (end-start)*4.236+start];
async function pr(data, length=14) {
  for(var i = length, n = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), highd = await Math.max.apply(null, pl), lowd = await Math.min.apply(null, pl);
    n.push((highd - data[i-1]) / (highd - lowd) * -100);
  }
  return n;
}
async function lsma(data, length=25) {
  for(var i = length, lr = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0, sum_yy = 0, m, b;
    for(var q = 1; q <= length; q++) sum_x += q, sum_y += pl[q - 1], sum_xy += (pl[q - 1] * q), sum_xx += (q * q), sum_yy += (pl[q - 1] * pl[q - 1]);
    m = ((sum_xy - sum_x * sum_y / length) / (sum_xx - sum_x * sum_x / length));
    b = sum_y / length - m * sum_x / length;
    lr.push(m * length + b);
  }
  return lr;
}
async function don(data, length=20) {
  for(var i = length, channel = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), highs = [], lows = [];
    for(var h in pl) highs.push(pl[h][0]), lows.push(pl[h][1]);
    var max = Math.max.apply(null, highs.slice()), min = Math.min.apply(null, lows.slice());
    channel.push([max, (max + min) / 2, min]);
  }
  return channel;
}
async function ichimoku(data, length1=9, length2=26, length3=52, length4=26) {
  for(var i = 0, pl = [], cloud = [], place = []; i < data.length; i++) {
    pl.push(data[i]);
    if(pl.length >= length3) {
      var highs = [], lows = [];
      for(var a in pl) highs.push(pl[a][0]), lows.push(pl[a][2]);
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
async function stoch(data, length=14, smoothd=3, smoothk=3) {
  if(length < smoothd) [length, smoothd] = [smoothd, length];
  if(smoothk > smoothd) [smoothk, smoothd] = [smoothd, smoothk];
  for(var i = 0, stoch = [], high = [], low = [], ka = []; i < data.length; i++) {
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
async function atr(data, length=14) {
  for(var i = 1, atr = [data[0][0] - data[0][2]]; i < data.length; i++) {
    var t0 = await Math.max((data[i][0] - data[i - 1][1]), (data[i][2] - data[i - 1][1]), (data[i][0] - data[i][2]));
    atr.push((atr[atr.length - 1] * (length - 1) + t0) / length);
  }
  return atr;
}
async function sma(data, length=14) {
  for(var i = length, sma = []; i <= data.length; i++) {
    var avg = await module.exports.sum(data.slice(i-length,i));
    sma.push(avg / length);
  }
  return sma;
}
async function smma(data, length=14) {
  for(var i = length, smma = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), average = 0;
    for(var q in pl) average += pl[q];
    if(smma.length <= 0) { smma.push(average / length); } else { smma.push((average - smma[smma.length - 1]) / length); }
  }
  smma.splice(0, 1);
  return smma;
}
async function wma(data, length=14) {
  for(var i = 1, weight = 0, wma = []; i <= length; i++) weight += i;
  for(var i = length; i <= data.length; i++) {
    var pl = data.slice(i-length,i), average = 0;
    for(var q in pl) average += pl[q] * (Number(q)+1) / weight;
    wma.push(average);
  }
  return wma;
}
async function wsma(data, length=14) {
  for(var i = length, wsm = [], weight = 1/length; i <= data.length; i++) {
    if(wsm.length > 0) {
      wsm.push((data[i-1]-wsm[wsm.length-1]) * weight + wsm[wsm.length-1]);
      continue;
    }
    var pl = data.slice(i-length,i),average=0;
    for(var q in pl) average += pl[q];
    wsm.push(average/length);
  }
  return wsm;
}
async function pwma(data, length=14) {
  for(var i = length / 2, b = length, weight = 0, wmaa = [], weights = []; i >= 1; i--, b--) {
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
async function hwma(data, length=14) {
  for(var i = 1, b = length, weight = 0, wmaa = [], weights = []; i <= length / 2; i++, b--) {
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
async function vwma(data, length=20) {
  data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = length, vwma = []; i <= data.length; i++) {
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
async function ema(data, length=12) {
  for(var i = length, ema = [], weight = 2 / (length + 1); i <= data.length; i++) {
    if(ema.length > 0) {
      ema.push((data[i-1] - ema[ema.length - 1]) * weight + ema[ema.length - 1]);
      continue;
    }
    var pl = data.slice(i-length,i), average = 0;
    for(var q in pl) average += pl[q];
    ema.push(average / length);
  }
  return ema;
}
async function hull(data, length=14) {
  var pl = [], hma = [], ewma = await module.exports.wma(data, length), sqn = Math.round(Math.sqrt(length)),
      first = await wma(data, Math.round(length / 2));
  first.splice(0, first.length - ewma.length);
  for(var i in ewma) {
    pl.push((first[i] * 2) - ewma[i]);
    if(pl.length >= sqn) {
      var h = await wma(pl, sqn);
      hma.push(h[0]);
      pl.splice(0,1);
    }
  }
  return hma;
}
async function kama(data, len1=10, len2=2, len3=30) {
  for(var i = len1 + 1, ka = await module.exports.sma(data, len1), ka = [ka[ka.length - 1]]; i < data.length; i++) {
    var vola = 0, change = Math.abs(data[i] - data[i - len1]);
    for(var a = 1; a < len1; a++) vola += Math.abs(data[(i-a)] - data[(i-a)-1]);
    var sc = (change/vola * (2/(len2+1) - 2/(len3+1) + 2/(len3+1))) ** 2;
    ka.push(ka[ka.length - 1] + sc * (data[i] - ka[ka.length - 1]));
  }
  return ka;
}
async function macd(data, length1=12, length2=26) {
  if(length1 > length2) [length1, length2] = [length2, length1];
  var ema = await module.exports.ema(data, length1), emb = await module.exports.ema(data, length2), macd = [];
  ema.splice(0, length2 - length1);
  for(var i = 0; i < emb.length; i++) macd.push(ema[i] - emb[i]);
  return macd;
}
async function macd_signal(data, length1=12, length2=26, lengthsig=9) {
  var ma = await module.exports.macd(data, length1, length2),
      mas = await module.exports.ema(ma, lengthsig);
  return mas;
}
async function macd_bars(data, length1=12, length2=26, lengthsig=9) {
  var ma = await module.exports.macd(data, length1, length2),
      mas = await module.exports.ema(ma, lengthsig), ret = [];
  ma.splice(0,ma.length-mas.length);
  for(var i in ma) ret.push(ma[i]-mas[i]);
  return ret;
}
async function bands(data, length=14, deviations=1) {
  for(var i = 0, pl = [], deviation = [], boll = [], sma = await module.exports.sma(data, length); i < data.length; i++) {
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
async function bandwidth(data, length=14, deviations=1) {
  for(var i = 0, boll = [], band = await module.exports.bands(data, length, deviations); i < band.length; i++) boll.push((band[i][0] - band[i][2]) / band[i][1]);
  return boll;
}
async function keltner(data, length=14, devi=1) {
  var closing = [], atr = await module.exports.atr(data, length), kma, kelt = [];
  for(var i in data) closing.push((data[i][0] + data[i][1] + data[i][2]) / 3);
  kma = await module.exports.sma(closing, length);
  atr.splice(0, length - 1);
  for(var i = 0; i < kma.length; i++) kelt.push([kma[i] + atr[i] * devi, kma[i], kma[i] - atr[i] * devi]);
  return kelt
}
async function variance(data, length=data.length) {
  for(var i = length, va = []; i <= data.length; i++) {
    var tmp = data.slice(i - length, i), mean = await module.exports.sma(tmp, length), sm = 0;
    for(var x in tmp) sm += ((tmp[x] - mean[mean.length-1]) ** 2);
    va.push(sm/length);
  }
  return va;
}
async function std(data, length=data.length) {
  if(length < data.length) data.splice(0,data.length-length);
  var mean = data.reduce((a, b) => a + b) / length;
  return Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / length);
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
async function sim(d, length=50, sims=1000, perc) {
  for(var i = 0, sd = []; i < sims; i++) {
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
  for(var i = 0, final = []; i < data[0].length; i++) {
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
const dif = async(n,o) => (n-o) / o;
const log = async(d) => d.map(x=>Math.log(x));
const exp = async(d) => d.map(x=>Math.exp(x));
async function drawdown(d) {
  for(var y = 1, max = d[0], min = d[0], big = 0; y < d.length; y++) {
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
async function aroon_up(data, length=10) {
  for(var i = length, aroon = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), hl = pl.slice();
    hl.sort((a, b) => a-b);
    aroon.push((100 * (length-1-pl.reverse().findIndex(x => x === hl[length - 1])) / (length-1)));
  }
  return aroon;
}
async function aroon_down(data, length=10) {
  for(var i = length, aroon = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i), hl = pl.slice();
    hl.sort((a, b) => a-b);
    aroon.push((100 * (length-1-pl.reverse().findIndex(x => x === hl[0])) / (length-1)));
  }
  return aroon;
}
async function aroon_osc(data, length=25) {
  for(var i = 0, aroon = [], u = await module.exports.aroon.up(data, length), d = await module.exports.aroon.down(data, length); i < u.length; i++) aroon.push(u[i] - d[i]);
  return aroon;
}
async function mfi(data, length=14) {
  for(var i = length, mfi = [], n = data.map(x => x[1]), p = data.map(x => x[0]), pos = 0, neg = 0; i <= data.length; i++, pos = 0, neg = 0) {
    for(var q = i-length; q < i; q++) pos += p[q], neg += n[q];
    mfi.push((100 - 100 / (1 + pos / neg)));
  }
  return mfi;
}
async function roc(data, length=14) {
  for(var i = length, roc = []; i <= data.length; i++) roc.push((data[i-1] - data[i-length]) / data[i-length]);
  return roc;
}
async function cop(data, len1=11, len2=14, len3=10) {
  for(var max = Math.max(len1, len2), co = [], i = max + len3; i < data.length; i++) {
    var r1 = data.slice(i - (max + len3), i), r2 = r1.slice(), tmp = [];
    r1 = await module.exports.roc(r1, len1), r2 = await module.exports.roc(r2, len2), r1.splice(0, r1.length - r2.length), r2.splice(0, r2.length - r1.length);
    for(var a = 0; a < r1.length; a++) tmp.push(r1[a] + r2[a]);
    tmp = await module.exports.wma(tmp, len3);
    co.push(tmp[tmp.length - 1]);
  }
  return co;
}
async function kst(data, r1=10, r2=15, r3=20, r4=30, s1=10, s2=10, s3=10, s4=15, sig=9) {
  for(var ks = [], fs = [], ms = (Math.max(r1, r2, r3, r4) + Math.max(s1, s2, s3, s4)), i = ms; i <= data.length; i++) {
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
  for(var i = 1, obv = [0]; i < data.length; i++) {
    if(data[i][1] > data[i - 1][1]) obv.push(obv[obv.length - 1] + data[i][0])
    if(data[i][1] < data[i - 1][1]) obv.push(obv[obv.length - 1] - data[i][0])
    if(data[i][1] === data[i - 1][1]) obv.push(obv[obv.length - 1])
  }
  return obv;
}
async function vwap(data, length=data.length) {
  data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = length, vwap = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i),
        totalv = 0, totalp = 0;
    for(var o = 0; o < pl.length; o++) totalv+=pl[o][1], totalp+=pl[o][0];
    vwap.push(totalp/totalv);
  }
  return vwap;
}
async function mom(data, length=10, p) {
  for(var i = length - 1, mom = []; i < data.length; i++) {
    (p) ? mom.push(data[i] / data[i - (length - 1)] * 100) : mom.push(data[i] - data[i - (length - 1)])
  }
  return mom;
}
async function mom_osc(data, length=10) {
  length++
  for(var i = length, osc = [], sumh = 0, suml = 0; i <= data.length; i++, sumh = 0, suml = 0) {
    for(var a = 1; a < length; a++) (data[i-length+(a-1)] < data[i-length+a]) ? sumh += data[i-length+a] : suml += data[i-length+a];
    osc.push((sumh - suml) / (sumh + suml) * 100);
  }
  return osc;
}
async function ha(data) {
  var ha = [[(data[0][0] + data[0][3]) / 2, data[0][1], data[0][2], (data[0][0] + data[0][1] + data[0][2] + data[0][3]) / 4]];
  for(var i = 1; i < data.length; i++) {
    ha.push([(ha[ha.length - 1][0] + ha[ha.length - 1][3]) / 2, Math.max(ha[ha.length - 1][0], ha[ha.length - 1][3], data[i][1]), Math.min(ha[ha.length - 1][0], ha[ha.length - 1][3], data[i][2]), (data[i][0] + data[i][1] + data[i][2] + data[i][3]) / 4]);
  }
  return ha;
}
async function ren(data, bs=1) {
  var re = [], decimals = (Math.floor(bs) === bs) ? 0 : bs.toString().split(".")[1].length || 0,
      bh = Math.ceil(data[0][0] / bs * (10 ** decimals)) / (10 ** decimals) * bs, bl = bh - bs;
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
async function envelope(data, len=10, p=0.005) {
  for(var i = len, enve = []; i < data.length; i++) {
    var sm = await module.exports.sma(data.slice(i-len,i), len);
    enve.push([sm[0]*(1+p),sm[0],sm[0]*(1-p)]);
  }
  return enve;
}
async function chaikin_osc(data, ema1=3, ema2=10) {
  for(var i = 0, cha = [], adl = []; i < data.length; i++) {
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
async function alligator(data, jl=13, tl=8, ll=5, js=8, ts=5, ls=3) {
  var ret = [],
      jaw = await module.exports.smma(data, jl),
      teeth = await module.exports.smma(data, tl),
      lips = await module.exports.smma(data, ll);
  teeth.splice(0,teeth.length-jaw.length);
  lips.splice(0,lips.length-jaw.length);
  for(var i = jaw.length-1; i >= 7; i--) ret.push([jaw[i-(js-1)], teeth[i-(ts-1)], lips[i-(ls-1)]]);
  return ret;
}
async function gator(data, jl=13, tl=8, ll=5, js=8, ts=5, ls=3) {
  var ret = [],
      jaw = await module.exports.smma(data, jl),
      teeth = await module.exports.smma(data, tl),
      lips = await module.exports.smma(data, ll);
  teeth.splice(0,teeth.length-jaw.length);
  lips.splice(0,lips.length-jaw.length);
  for(var i = jaw.length-1; i >= (js-1); i--) ret.push([jaw[i-(js-1)]-teeth[i-(ts-1)], -(Math.abs(teeth[i-(ts-1)]-lips[i-(ls-1)]))]);
  return ret;
}
async function recent_high(data, lb=25) {
  for(var i = data.length-2, xback = lb, hindex = 0, highest = data[data.length-1]; i >= 0; i--) {
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
async function recent_low(data, lb=25) {
  for(var i = data.length-2, xback = lb, lindex = 0, lowest = data[data.length-1]; i >= 0; i--) {
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
async function support(d, hl=recent_low(d)) {
  hl = await hl;
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
  for(var i = len; i <= data.length; i++) {
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
  var out = [], nexttrend = [0], trend = [0], up = [0], down = [0], direction = undefined;
  for(var i = atrlen; i <= data.length; i++) {
    var pl = data.slice(i-atrlen,i);
        maxlow = pl[pl.length-2][2],
        minhigh = pl[pl.length-2][0],
        atr2 = await module.exports.atr(pl, atrlen);
        atr2 = atr2[atr2.length-1] / 2;
    var dev = deviation * atr2,
        highprice = Math.max.apply(null, pl.slice(pl.length-1, pl.length).map(x=>x[0])),
        lowprice = Math.min.apply(null, pl.slice(pl.length-1, pl.length).map(x=>x[2])),
        highma = await module.exports.sma(pl.slice(pl.length-amplitude,amplitude).map(x=>x[0]), amplitude),
        lowma = await module.exports.sma(pl.slice(pl.length-amplitude,amplitude).map(x=>x[2]), amplitude);
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
const sum = async(data) => data.reduce((a,b) => a+b);
async function covariance(data1, data2, length) {
  var out = [], x_mean = await module.exports.sma(data1, data1.length),
      y_mean = await module.exports.sma(data2, data2.length);
  for(var z = length; z <= data1.length; z++) {
    var x = data1.slice(z-length,z), y = data2.slice(z-length,z),
        x_mean = await module.exports.sma(x, length), res = [],
        y_mean = await module.exports.sma(y, length);
    for(var i = 0; i < length; i++) {
      res.push((x[i]-x_mean[0])*(y[i]-y_mean[0]));
    }
    res = await module.exports.sum(res);
    out.push(res/length);
  }
  return out;
}
const range = (min, max, rng) => Math.floor((rng) ? rng()*(Math.floor(max)-Math.ceil(min))+Math.ceil(min) : Math.random()*(Math.floor(max)-Math.ceil(min))+Math.ceil(min));
const pick = (data, rng) => data[Math.floor((rng) ? rng()*(Math.floor(data.length)) : Math.random()*(Math.floor(data.length)))];
const float = (min, max, rng) => (rng) ? rng()*(max-min)+min : Math.random()*(max-min)+min;
function order(data, rng) {
  var ret = []; data = data.slice();
  do {
    var index = Math.floor((rng) ? rng()*(Math.floor(data.length)) : Math.random()*(Math.floor(data.length)));
    ret.push(data[index]);
    data.splice(index, 1);
  } while(data.length > 0);
  return ret;
}
function prng(seed) {
  for(var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  seed = (h ^= h >>> 16) >>> 0;
  return function() {
    var t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
async function ncdf(x, mean, std) {
  x = (!mean && !std) ? x : (x - mean) / std;
  var t = 1 / (1+.2315419*Math.abs(x)),
      d = .3989423*Math.exp(-x*x/2),
      p = d*t*(.3193815 + t * (-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));
  return (x > 0) ? 1-p : p;
}
async function zigzag(data, perc=0.05) {
  var indexes = [], min = Infinity, max = -Infinity, lmin = false, lmax = false, final = [];
  if(Array.isArray(data[0])) {
    for(var i = 0; i < data.length; i++) {
      if(lmin) {
        if(indexes[indexes.length-1].value >= data[i][1]) {
          indexes[indexes.length-1].value = data[i][1];
          indexes[indexes.length-1].index = i;
        }
        if(min >= data[i][1]) min = data[i][1];
        var hdif = (data[i][0]-min)/min;
        if(hdif > perc) {
          indexes.push({index: i, value: data[i][0]});
          lmax = true;
          lmin = false;
          min = Infinity
        }
      } else if(lmax) {
        if(indexes[indexes.length-1].value <= data[i][0]) {
          indexes[indexes.length-1].value = data[i][0];
          indexes[indexes.length-1].index = i;
        }
        if(max <= data[i][1]) max = data[i][1];
        var ldif = (max-data[i][1])/data[i][1];
        if(ldif > perc) {
          indexes.push({index: i, value: data[i][1]});
          lmin = true;
          lmax = false;
          max = -Infinity
        }
      } else {
        if(min >= data[i][1]) min = data[i][1];
        if(max <= data[i][0]) max = data[i][0];
        var hdif = (data[i][0]-min)/min,
            ldif = (max-data[i][1])/max;
        if(ldif > perc && hdif < perc) {
          lmin = true;
          indexes.push({index: 0, value: data[0][0]});
          indexes.push({index: i, value: data[i][1]});
        } else if(hdif > perc && ldif < perc) {
          lmax = true;
          indexes.push({index: 0, value: data[0][1]});
          indexes.push({index: i, value: data[i][0]});
        } else {
          if(ldif > hdif) {
            lmin = true;
            indexes.push({index: 0, value: data[0][0]});
            indexes.push({index: i, value: data[i][1]});
          } else {
            lmax = true;
            indexes.push({index: 0, value: data[0][1]});
            indexes.push({index: i, value: data[i][0]});
          }
        }
      }
    }
  } else {
    for(var i = 0; i < data.length; i++) {
      if(lmin) {
        if(indexes[indexes.length-1].value >= data[i]) {
          indexes[indexes.length-1].value = data[i];
          indexes[indexes.length-1].index = i;
        }
        if(min >= data[i]) min = data[i];
        var hdif = (data[i]-min)/min;
        if(hdif > perc) {
          indexes.push({index: i, value: data[i]});
          lmax = true;
          lmin = false;
          min = Infinity;
        }
      } else if(lmax) {
        if(indexes[indexes.length-1].value <= data[i]) {
          indexes[indexes.length-1].value = data[i];
          indexes[indexes.length-1].index = i;
        }
        if(max <= data[i]) max = data[i];
        var ldif = (max-data[i])/data[i];
        if(ldif > perc) {
          indexes.push({index: i, value: data[i]});
          lmin = true;
          lmax = false;
          max = -Infinity;
        }
      } else {
        if(min >= data[i]) min = data[i];
        if(max <= data[i]) max = data[i];
        var hdif = (data[i]-min)/min,
            ldif = (max-data[i])/max;
        if(ldif > perc && hdif < perc) {
          lmin = true;
          indexes.push({index: 0, value: data[0]});
          indexes.push({index: i, value: data[i]});
        } else if(hdif > perc && ldif < perc) {
          lmax = true;
          indexes.push({index: 0, value: data[0]});
          indexes.push({index: i, value: data[i]});
        } else {
          if(ldif > hdif) {
            lmin = true;
            indexes.push({index: 0, value: data[0]});
            indexes.push({index: i, value: data[i]});
          } else {
            lmax = true;
            indexes.push({index: 0, value: data[0]});
            indexes.push({index: i, value: data[i]});
          }
        }
      }
    }
  }
  final = [indexes[0].value]
  for(var i = 1; i < indexes.length; i++) {
    var len = indexes[i].index - indexes[i-1].index,
        delta = (indexes[i].value - indexes[i-1].value) / len;
    for(var x = 1; x <= len; x++) final.push(x*delta+indexes[i-1].value);
  }
  return final;
}
async function psar(data, step=0.02, max=0.2) {
  var furthest = data[0], up = true, accel = step, prev = data[0],
      sar = data[0][1], extreme = data[0][0], final = [sar];
  for(var i = 1; i < data.length; i++) {
    sar = sar + accel * (extreme - sar);
    if(up) {
      sar = Math.min(sar, furthest[1], prev[1]);
      if(data[i][0] > extreme) {
        extreme = data[i][0];
        accel = Math.min(accel+step, max);
      }
    } else {
      sar = Math.max(sar, furthest[0], prev[0]);
      if(data[i][1] < extreme) {
        extreme = data[i][0];
        accel = Math.min(accel + step, max);
      }
    }
    if((up && data[i][1] < sar) || (!up && data[i][0] > sar)) {
      accel = step;
      sar = extreme;
      up = !up;
      extreme = !up ? data[i][1] : data[i][0]
    }
    furthest = prev;
    prev = data[i];
    final.push(sar);
  }
  return final;
}
async function fibbands(data, length=20, deviations=3) {
  for(var i = 0, pl = [], deviation = [], vwma = await module.exports.vwma(data, length); i < data.length; i++) {
    pl.push(data[i][0]);
    if(pl.length >= length) {
      var devi = await module.exports.std(pl, length);
      deviation.push(devi * deviations);
      pl.splice(0,1);
    }
  }
  for(var i = 0, boll = []; i < vwma.length; i++) {
    var upper1 = vwma[i] + 0.236 * deviation[i],
        upper2 = vwma[i] + 0.382 * deviation[i],
        upper3 = vwma[i] + 0.5 * deviation[i],
        upper4 = vwma[i] + 0.618 * deviation[i],
        upper5 = vwma[i] + 0.764 * deviation[i],
        upper6 = vwma[i] + deviation[i],
        lower1 = vwma[i] - 0.236 * deviation[i],
        lower2 = vwma[i] - 0.382 * deviation[i],
        lower3 = vwma[i] - 0.5 * deviation[i],
        lower4 = vwma[i] - 0.618 * deviation[i],
        lower5 = vwma[i] - 0.764 * deviation[i],
        lower6 = vwma[i] - deviation[i];
    boll.push([upper6, upper5, upper4, upper3, upper2, upper1, vwma[i], lower1, lower2, lower3, lower4, lower5, lower6]);
  }
  return boll;
}
async function supertrend(data, length=20, multiplier=3) {
  for(var i = length-1, atr = await module.exports.atr(data, length), trend = []; i < data.length; i++) {
    trend.push([(data[i][0] + data[i][2]) / 2 + multiplier * atr[i], (data[i][0] + data[i][2]) / 2 - multiplier * atr[i]]);
  }
  return trend;
}
async function cwma(data, weights) {
  for(var i = weights.length, ma = []; i <= data.length; i++) {
    var pl = data.slice(i-weights.length,i), sum = 0, weight = 0;
    for(var q = 0; q < weights.length; q++) {
      sum += pl[q] * weights[q];
      weight += weights[q];
    }
    ma.push(sum / weight);
  }
  return ma;
}
const fibnumbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181];
const permutations = async(data) => data.reduce((a,b) => a * b);
async function mse(data1, data2) {
  for(var i = 0, err = 0; i < data1.length; i++) err += Math.pow((data2[i] - data1[i]), 2);
  return err / data1.length;
}
async function cum(data, length) {
  for(var i = length, res = []; i <= data.length; i++) {
    res.push(await module.exports.sum(data.slice(i-length,i)));
  }
  return res;
}
async function vwwma(data, length=20) {
  data = data.map(x=>[x[0]*x[1],x[1]]);
  for(var i = 1, weight = 0; i <= length; i++) weight += i;
  for(var i = length, vwma = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i);
    var totalv = 0, totalp = 0;
    for(var q in pl) {
      totalv += pl[q][1] * (Number(q)+1) / weight;
      totalp += pl[q][0] * (Number(q)+1) / weight;
    }
    vwma.push(totalp/totalv);
  }
  return vwma;
}
async function elderray(data, length=13) {
  for(var i = length, eld = []; i <= data.length; i++) {
    var pl = data.slice(i-length,i),
        low = Math.min.apply(undefined, pl),
        high = Math.max.apply(undefined, pl),
        em = await module.exports.ema(pl, pl.length);
    eld.push([high-em[0],low-em[0]]);
  }
  return eld;
}
async function hv(data, length=10) {
  for(var i = length, hv = []; i <= data.length; i++) {
    var ss = await ssd(data.slice(i-length,i)),
        vari = ss / length;
    hv.push(Math.sqrt(vari));
  }
  return hv;
}
const t_table = [
  {value:.5,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0},
  {value:.25,"1":1,"2":.816,"3":.765,"4":.741,"5":.727,"6":.718,"7":.711,"8":.706,"9":.703,"10":.7,"11":.697,"12":.695,"13":.694,"14":.692,"15":.691,"16":.69,"17":.689,"18":.688,"19":.688,"20":.687,"21":.686,"22":.686,"23":.685,"24":.685,"25":.684},
  {value:.2,"1":1.376,"2":1.061,"3":.978,"4":.941,"5":.92,"6":.906,"7":.896,"8":.889,"9":.883,"10":.879,"11":.876,"12":.873,"13":.87,"14":.868,"15":.866,"16":.865,"17":.863,"18":.862,"19":.861,"20":.86,"21":.859,"22":.858,"23":.858,"24":.857,"25":.856},
  {value:.15,"1":1.963,"2":1.386,"3":1.25,"4":1.19,"5":1.156,"6":1.134,"7":1.119,"8":1.108,"9":1.1,"10":1.093,"11":1.088,"12":1.088,"13":1.079,"14":1.076,"15":1.074,"16":1.071,"17":1.069,"18":1.067,"19":1.066,"20":1.064,"21":1.063,"22":1.061,"23":1.06,"24":1.059,"25":1.058},
  {value:.1,"1":3.078,"2":1.886,"3":1.638,"4":1.533,"5":1.476,"6":1.44,"7":1.415,"8":1.397,"9":1.383,"10":1.372,"11":1.363,"12":1.356,"13":1.35,"14":1.345,"15":1.341,"16":1.337,"17":1.333,"18":1.33,"19":1.328,"20":1.325,"21":1.323,"22":1.321,"23":1.319,"24":1.318,"25":1.316},
  {value:.05,"1":6.314,"2":2.92,"3":2.353,"4":2.132,"5":2.015,"6":1.943,"7":1.895,"8":1.86,"9":1.833,"10":1.812,"11":1.796,"12":1.782,"13":1.771,"14":1.761,"15":1.753,"16":1.746,"17":1.74,"18":1.734,"19":1.729,"20":1.725,"21":1.721,"22":1.717,"23":1.714,"24":1.711,"25":1.708},
  {value:.025,"1":12.71,"2":4.303,"3":3.182,"4":2.776,"5":2.571,"6":2.447,"7":2.365,"8":2.306,"9":2.262,"10":2.228,"11":2.201,"12":2.179,"13":2.16,"14":2.145,"15":2.131,"16":2.12,"17":2.11,"18":2.101,"19":2.093,"20":2.086,"21":2.08,"22":2.074,"23":2.069,"24":2.064,"25":2.06},
  {value:.01,"1":31.82,"2":6.965,"3":4.541,"4":3.747,"5":3.365,"6":3.143,"7":2.998,"8":2.896,"9":2.821,"10":2.764,"11":2.718,"12":2.681,"13":2.65,"14":2.624,"15":2.602,"16":2.583,"17":2.567,"18":2.552,"19":2.539,"20":2.528,"21":2.518,"22":2.508,"23":2.5,"24":2.492,"25":2.485},
  {value:.005,"1":63.66,"2":9.925,"3":5.841,"4":4.604,"5":4.032,"6":3.707,"7":3.499,"8":3.355,"9":3.25,"10":3.169,"11":3.106,"12":3.055,"13":3.012,"14":2.977,"15":2.947,"16":2.921,"17":2.898,"18":2.878,"19":2.861,"20":2.845,"21":2.831,"22":2.819,"23":2.807,"24":2.797,"25":2.787},
  {value:.001,"1":318.13,"2":22.327,"3":10.215,"4":7.173,"5":5.893,"6":5.208,"7":4.785,"8":4.501,"9":4.297,"10":4.144,"11":4.025,"12":3.93,"13":3.852,"14":3.787,"15":3.733,"16":3.686,"17":3.646,"18":3.61,"19":3.579,"20":3.552,"21":3.527,"22":3.505,"23":3.485,"24":3.467,"25":3.45},
  {value:.0005,"1":636.62,"2":31.599,"3":12.924,"4":8.61,"5":6.869,"6":5.959,"7":5.408,"8":5.041,"9":4.781,"10":4.587,"11":4.437,"12":4.318,"13":4.221,"14":4.14,"15":4.073,"16":4.015,"17":3.965,"18":3.922,"19":3.883,"20":3.85,"21":3.819,"22":3.792,"23":3.768,"24":3.745,"25":3.725}
]
async function pvalue(t, df) {
  if(df > 25) throw new Error('ta.js | pvalue | df too high!')
  if(df < 1) throw new Error('ta.js | pvalue | df too low!')
  for(var x = 0; x < t_table.length-1; x++) {
    if(t >= t_table[x][Number(df).toString()] && t <= t_table[Number(x)+1][Number(df).toString()]) {
      return t_table[x+1].value + (t_table[Number(x)+1].value - t_table[x].value) * (t_table[x+1][Number(df).toString()] - t) / (t_table[x][Number(df).toString()] - t_table[x+1][Number(df).toString()]);
    }
  }
  return 0.0001;
}
async function rvi(data, len=20) {
  for(var i = 3, num = [], dnom = [], rv = []; i < data.length; i++) {
    num.push((data[i][3]-data[i][0]+2*(data[i][3]-data[i-1][0])+2*(data[i][3]-data[i-2][0])+(data[i][3]-data[i-3][0]))/6);
    dnom.push((data[i][1]-data[i][2]+2*(data[i][1]-data[i-1][2])+2*(data[i][1]-data[i-2][2])+(data[i][1]-data[i-3][2]))/6);
    if(num.length >= len) {
      var sn = await module.exports.sma(num, len),
          dn = await module.exports.sma(dnom, len);
      rv.push(sn[0]/dn[0]);
      num.splice(0,1);dnom.splice(0,1);
    }
  }
  return rv;
}
async function rvi_signal(rv) {
  for(var i = 3, sig = []; i < rv.length; i++) {
    sig.push((rv[i]+2*rv[i-1]+2*rv[i-2]+rv[i-3])/6);
  }
  return sig;
}
async function rsi_divergence(data, length, rs) {
  if(!rs) rs = module.exports.wrsi;
  var rd = await rs(data, length), out = [];
  data = await module.exports.mom(data.slice(length-1, data.length), 2);
  for(var i = 0; i < data.length; i++) {
    if((data[i] > 0 && rd[i] < 0) || (data[i] < 0 && rd[i] > 0)) {
      out.push(1);
    } else {
      out.push(0);
    }
  }
  return out;
}
async function divergence(data1, data2) {
  if(data1.length > data2.length) data1.splice(0,data1.length-data2.length)
  if(data2.length > data1.length) data1.splice(0,data2.length-data1.length)
  for(var i = 1, out = []; i < data.length; i++) {
    if((data1[i] > data1[i-1] && data2[i] < data2[i-1]) || (data1[i] < data1[i-1] && data2[i] > data2[i-1])) {
      out.push(1);
    } else {
      out.push(0);
    }
  }
  return out;
}
module.exports = {
  aroon: { up: aroon_up, down: aroon_down, osc: aroon_osc},
  random: { range, pick, float, order, prng },
  rsi, tsi, fi, pr, stoch, atr, sma, smma, wma, vwma, ao, asi,
  ema, macd, lsma, don, ichimoku, bands, bandwidth, median, keltner,
  std, cor, dif, hull, mfi, roc, kst, obv, vwap, mom, mom_osc, ha, ren,
  bop, cop, kama, mad, aad, variance, ssd, pwma, hwma, kmeans, drawdown,
  normalize, denormalize, wrsi, wsma, normsinv, ncdf, sim, multi, percentile,
  envelope, chaikin_osc, fractals, recent_high, recent_low, support,
  resistance, ac, fib, alligator, gator, standardize, er, winratio,
  avgwin, avgloss, fisher, cross, se, kelly, normalize_pair, normalize_from,
  ar, zscore, log, exp, halftrend, sum, covariance, zigzag, psar, macd_signal,
  macd_bars, fibbands, supertrend, cwma, fibnumbers, permutations, martingale,
  antimartingale, mse, cum, vwwma, elderray, hv, pvalue, rvi, rvi_signal,
  rsi_divergence, divergence
}
