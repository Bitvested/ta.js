function normalize_pair(data1, data2) {
  for(var i = 1, f = (data1[0] + data2[0]) / 2, ret = [[f,f]]; i < data1.length; i++) ret.push([ret[ret.length-1][0]*((data1[i]-data1[i-1])/data1[i-1]+1),ret[ret.length-1][1]*((data2[i]-data2[i-1])/data2[i-1]+1)]);
  return ret;
}
module.exports = normalize_pair;
