function cross(d1, d2) {
  d1.splice(0, d1.length - d2.length);
  var cross = (d1[0] > d2[0]), indexes = [];
  for(var i = 0; i < d1.length; i++) {
    if(d1[i] < d2[i] && cross) {
      indexes.push({index: i, cross: false});
      cross = false;
    }
    if(d1[i] > d2[i] && !cross) {
      indexes.push({index: i, cross: true});
      cross = true;
    }
  }
  return indexes;
}
module.exports = cross;
