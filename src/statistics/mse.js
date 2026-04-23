function mse(data1, data2) {
  for(var i = 0, err = 0; i < data1.length; i++) err += Math.pow((data2[i] - data1[i]), 2);
  return err / data1.length;
}
module.exports = mse;
