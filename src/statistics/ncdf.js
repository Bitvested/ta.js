function ncdf(x, mean, std) {
  x = (!mean && !std) ? x : (x - mean) / std;
  var t = 1 / (1+.2315419*Math.abs(x)),
      d = .3989423*Math.exp(-x*x/2),
      p = d*t*(.3193815 + t * (-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));
  return (x > 0) ? 1-p : p;
}
module.exports = ncdf;
