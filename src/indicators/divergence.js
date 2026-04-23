function divergence(data1, data2) {
  if(data1.length > data2.length) data1.splice(0,data1.length-data2.length);
  if(data2.length > data1.length) data2.splice(0,data2.length-data1.length);
  for(var i = 1, out = []; i < data1.length; i++) {
    if((data1[i] > data1[i-1] && data2[i] < data2[i-1]) || (data1[i] < data1[i-1] && data2[i] > data2[i-1])) {
      out.push(1);
    } else {
      out.push(0);
    }
  }
  return out;
}
module.exports = divergence;
