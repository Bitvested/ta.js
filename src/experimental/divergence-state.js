const ta = require('../_registry.js');
function divergence_state(data1, data2, length, lb, smoother=1, threshold_ex=0.03, threshold_nm=0.01) { // [close]
  if(data1.length > data2.length) data1.splice(0,data1.length-data2.length);
  if(data2.length > data1.length) data2.splice(0,data2.length-data1.length);
  for(var i = length, out = []; i < data1.length; i++) {
    var pl1 = data1.slice(i-length,i+1);
    var support1 = ta.support(pl1, ta.recent_low(pl1, lb));
    var support1_delta = support1.slope / support1.lowest;
    var resistance1 = ta.resistance(pl1, ta.recent_high(pl1, lb));
    var resistance1_delta = resistance1.slope / resistance1.highest;
    var pl2 = data2.slice(i-length,i+1);
    var support2 = ta.support(pl2, ta.recent_low(pl2, lb));
    var support2_delta = support2.slope / support2.lowest;
    var resistance2 = ta.resistance(pl2, ta.recent_high(pl2, lb));
    var resistance2_delta = resistance2.slope / resistance2.highest;
    if((data1[i] > data1[i-smoother] && data2[i] < data2[i-smoother]) || (data1[i] < data1[i-smoother] && data2[i] > data2[i-smoother])) {
      var obj = [];
      if(resistance1_delta < -threshold_ex && resistance2_delta > -threshold_nm) obj.push('exaggerated_bearish');
      if(support1_delta < threshold_nm && support2_delta > threshold_ex) obj.push('exaggerated_bullish');
      if(resistance1_delta < -threshold_nm && resistance2_delta < threshold_nm) obj.push('hidden_bearish');
      if(support1_delta > threshold_nm && support2_delta < -threshold_nm) obj.push('hidden_bullish');
      if(resistance1_delta > threshold_nm && resistance2_delta < -threshold_nm) obj.push('regular_bearish');
      if(support1_delta < -threshold_nm && support2_delta > threshold_nm) obj.push('regular_bullish');
      if(obj.length <= 0) obj.push('divergence')
      out.push(obj);
    } else {
      out.push(['convergence'])
    }
  }
  return out;
}
module.exports = divergence_state;
