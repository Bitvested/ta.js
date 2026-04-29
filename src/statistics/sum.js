function sum(data) {
  let s = 0;
  for (let i = 0; i < data.length; i++) s += data[i];
  return s;
}
module.exports = sum;
