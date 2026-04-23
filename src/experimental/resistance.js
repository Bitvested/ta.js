const ta = require('../_registry.js');
function resistance(d, hl) {
  hl = (!hl) ? ta.recent_high(d) : hl;
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
  if(index2 == d.length-1 || hl.index == d.length-1) return {calculate: (pos) => hl.value, slope: 0, highest: hl.value, index: hl.index};
  return {calculate: (pos) => pos*-highform+hl.value, slope: highform, highest: hl.value, index: hl.index};
}
module.exports = resistance;
