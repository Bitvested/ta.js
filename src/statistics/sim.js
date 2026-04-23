const ta = require('../_registry.js');
function sim(d, length=50, sims=1000, perc) {
  for(var i = 0, sd = []; i < sims; i++) {
    var projected = d.slice();
    for(var x = 0; x < length; x++) {
      var change = [];
      for(var y = 1; y < projected.length; y++) {
        var df = ta.dif(projected[y],projected[y-1]);
        change.push(df);
      }
      var mean = ta.sma(change, change.length),
          std = ta.std(change), random = ta.normsinv(Math.random());
      projected.push(projected[projected.length-1]*Math.exp(mean[0]-(std*std)/2+std*random));
    }
    sd.push(projected);
  }
  return (!perc) ? sd : ta.percentile(sd, perc);
}
module.exports = sim;
