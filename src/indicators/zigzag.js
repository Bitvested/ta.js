const ta = require('../_registry.js');
function zigzag(data, perc=0.05) {
  var indexes = [], min = Infinity, max = -Infinity, lmin = false, lmax = false, final = [];
  if(Array.isArray(data[0])) {
    for(var i = 0; i < data.length; i++) {
      if(lmin) {
        if(indexes[indexes.length-1].value >= data[i][1]) {
          indexes[indexes.length-1].value = data[i][1];
          indexes[indexes.length-1].index = i;
        }
        if(min >= data[i][1]) min = data[i][1];
        var hdif = (data[i][0]-min)/min;
        if(hdif > perc) {
          indexes.push({index: i, value: data[i][0]});
          lmax = true;
          lmin = false;
          min = Infinity
        }
      } else if(lmax) {
        if(indexes[indexes.length-1].value <= data[i][0]) {
          indexes[indexes.length-1].value = data[i][0];
          indexes[indexes.length-1].index = i;
        }
        if(max <= data[i][1]) max = data[i][1];
        var ldif = (max-data[i][1])/data[i][1];
        if(ldif > perc) {
          indexes.push({index: i, value: data[i][1]});
          lmin = true;
          lmax = false;
          max = -Infinity
        }
      } else {
        if(min >= data[i][1]) min = data[i][1];
        if(max <= data[i][0]) max = data[i][0];
        var hdif = (data[i][0]-min)/min,
            ldif = (max-data[i][1])/max;
        if(ldif > perc && hdif < perc) {
          lmin = true;
          indexes.push({index: 0, value: data[0][0]});
          indexes.push({index: i, value: data[i][1]});
        } else if(hdif > perc && ldif < perc) {
          lmax = true;
          indexes.push({index: 0, value: data[0][1]});
          indexes.push({index: i, value: data[i][0]});
        } else {
          if(ldif > hdif) {
            lmin = true;
            indexes.push({index: 0, value: data[0][0]});
            indexes.push({index: i, value: data[i][1]});
          } else {
            lmax = true;
            indexes.push({index: 0, value: data[0][1]});
            indexes.push({index: i, value: data[i][0]});
          }
        }
      }
    }
  } else {
    for(var i = 0; i < data.length; i++) {
      if(lmin) {
        if(indexes[indexes.length-1].value >= data[i]) {
          indexes[indexes.length-1].value = data[i];
          indexes[indexes.length-1].index = i;
        }
        if(min >= data[i]) min = data[i];
        var hdif = (data[i]-min)/min;
        if(hdif > perc) {
          indexes.push({index: i, value: data[i]});
          lmax = true;
          lmin = false;
          min = Infinity;
        }
      } else if(lmax) {
        if(indexes[indexes.length-1].value <= data[i]) {
          indexes[indexes.length-1].value = data[i];
          indexes[indexes.length-1].index = i;
        }
        if(max <= data[i]) max = data[i];
        var ldif = (max-data[i])/data[i];
        if(ldif > perc) {
          indexes.push({index: i, value: data[i]});
          lmin = true;
          lmax = false;
          max = -Infinity;
        }
      } else {
        if(min >= data[i]) min = data[i];
        if(max <= data[i]) max = data[i];
        var hdif = (data[i]-min)/min,
            ldif = (max-data[i])/max;
        if(ldif > perc && hdif < perc) {
          lmin = true;
          indexes.push({index: 0, value: data[0]});
          indexes.push({index: i, value: data[i]});
        } else if(hdif > perc && ldif < perc) {
          lmax = true;
          indexes.push({index: 0, value: data[0]});
          indexes.push({index: i, value: data[i]});
        } else {
          if(ldif > hdif) {
            lmin = true;
            indexes.push({index: 0, value: data[0]});
            indexes.push({index: i, value: data[i]});
          } else {
            lmax = true;
            indexes.push({index: 0, value: data[0]});
            indexes.push({index: i, value: data[i]});
          }
        }
      }
    }
  }
  final = [indexes[0].value]
  for(var i = 1; i < indexes.length; i++) {
    var len = indexes[i].index - indexes[i-1].index,
        delta = (indexes[i].value - indexes[i-1].value) / len;
    for(var x = 1; x <= len; x++) final.push(x*delta+indexes[i-1].value);
  }
  return final;
}
module.exports = zigzag;
