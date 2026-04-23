const ta = require('../_registry.js');
function kmeans(data, clusters) {
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
module.exports = kmeans;
