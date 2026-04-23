function rvi_signal(rv) {
  for(var i = 3, sig = []; i < rv.length; i++) {
    sig.push((rv[i]+2*rv[i-1]+2*rv[i-2]+rv[i-3])/6);
  }
  return sig;
}
module.exports = rvi_signal;
