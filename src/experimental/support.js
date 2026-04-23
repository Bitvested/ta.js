const ta = require('../_registry.js');
function support(d, hl) {
  hl = (!hl) ? ta.recent_low(d) : hl;
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
  if(index2 == d.length-1 || hl.index == d.length-1) return {calculate: (pos) => hl.value, slope: 0, lowest: hl.value, index: hl.index};
  return {calculate: (pos) => pos*lowform+hl.value, slope: lowform, lowest: hl.value, index: hl.index};
}
module.exports = support;
