function fractals(data, price=false) {
  const padBool = [false, false];
  const padPrice = [-1, -1];
  const out = [price ? padPrice : padBool, price ? padPrice : padBool];
  for (let i = 2; i < data.length - 2; i++) {
    const isUp = data[i-2][0] < data[i][0]
              && data[i-1][0] < data[i][0]
              && data[i][0]   > data[i+1][0]
              && data[i][0]   > data[i+2][0];
    const isDown = data[i-2][1] > data[i][1]
                && data[i-1][1] > data[i][1]
                && data[i][1]   < data[i+1][1]
                && data[i][1]   < data[i+2][1];
    if (price) {
      out.push([isUp ? data[i][0] : -1, isDown ? data[i][1] : -1]);
    } else {
      out.push([isUp, isDown]);
    }
  }
  out.push(price ? padPrice : padBool, price ? padPrice : padBool);
  return out;
}
module.exports = fractals;
