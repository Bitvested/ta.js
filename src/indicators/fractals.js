const ta = require('../_registry.js');
function fractals(data, price=false) {
  var fractals = (!price) ? [[false, false], [false, false]] : [[-1,-1],[-1,-1]];
  for(var i = 2; i < data.length-2; i++) {
    var up = (data[i-2][0] < data[i][0] && data[i-1][0] < data[i][0] && data[i][0] > data[i+1][0] && data[i][0] > data[i+2][0]) ? (!price) ? true : data[i][0] : (!price) ? false : -1,
        down = (data[i-2][1] > data[i][1] && data[i-1][1] > data[i][1] && data[i][1] < data[i+1][1] && data[i][1] < data[i+2][1]) ? (!price) ? true : data[i][1] : (!price) ? false : -1;
    fractals.push([up, down]);
  }
  (!price) ? fractals.push([false,false], [false, false]) : fractals.push([[-1,-1],[-1,-1]]);
  return fractals;
}
module.exports = fractals;
