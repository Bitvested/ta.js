async function rsi(data, len) {
  var length = (!len) ? 13 : len - 1;
  var pl = [], arrsi = [];
  for(var i = 1; i < data.length; i++) {
    var diff = (data[i] - data[i - 1]) / data[i] * 100;
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
      var diff = (data[i] - data[i - 1]) / data[i] * 100;
      pl.push(diff);
      pl.splice(0, 1);
    }
  }
  return arrsi;
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
      for(q in pl) {
        average += pl[q];
      }
      sma.push(average / length);
      pl.splice(0, 1);
    }
  }
  return sma;
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
async function ema(data, len) {
  var length = (!len) ? 12 : len;
  var pl = [], ema = [], prevema = 0,
  weight = 2 / (length + 1);
  for(var i = 0; i < data.length; i++) {
    pl.push(data[i]);
    var average = 0;
    if(prevema == 0 && pl.length >= length) {
      for(q in pl) {
        average += pl[q];
      }
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
async function obv(data) {
  var obv = [0];
  for(var i = 1; i < data.length; i++) {
    if(data[i][1] > data[i - 1][1]) obv.push(obv[obv.length - 1] + data[i][0])
    if(data[i][1] < data[i - 1][1]) obv.push(obv[obv.length - 1] - data[i][0])
    if(data[i][1] == data[i - 1][1]) obv.push(obv[obv.length - 1])
  }
  return obv;
}

module.exports = {
  rsi: rsi,
  stoch: stoch,
  atr: atr,
  sma: sma,
  wma: wma,
  ema: ema,
  macd: macd,
  bands: bands,
  bandwidth: bandwidth,
  std: std,
  aroon: {
    up: aroon_up,
    down: aroon_down,
    osc: aroon_osc,
  },
  mfi: mfi,
  roc: roc,
  obv: obv
}
