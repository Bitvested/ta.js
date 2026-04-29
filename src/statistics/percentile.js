function percentile(data, perc) {
  const cols = data[0].length;
  const final = [];
  for (let i = 0; i < cols; i++) {
    const col = new Array(data.length);
    for (let r = 0; r < data.length; r++) col[r] = data[r][i];
    col.sort((a, b) => a - b);
    final.push(col[Math.round((col.length - 1) * perc)]);
  }
  return final;
}
module.exports = percentile;
