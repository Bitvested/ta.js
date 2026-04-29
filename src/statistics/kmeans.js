function kmeans(data, clusters) {
  const init = Math.round(data.length / (clusters + 1));
  const centers = [];
  for (let i = 0; i < clusters; i++) centers[i] = data[init * (i + 1)];
  let means = Array.from({ length: clusters }, () => []);
  let changed = true;
  while (changed) {
    changed = false;
    means = Array.from({ length: clusters }, () => []);
    for (let x = 0; x < data.length; x++) {
      let n = 0, best = Math.abs(centers[0] - data[x]);
      for (let y = 1; y < clusters; y++) {
        const r = Math.abs(centers[y] - data[x]);
        if (r <= best) { best = r; n = y; }
      }
      means[n].push(data[x]);
    }
    for (let x = 0; x < clusters; x++) {
      if (means[x].length === 0) continue;
      let sum = 0;
      for (let y = 0; y < means[x].length; y++) sum += means[x][y];
      const m = sum / means[x].length;
      if (m !== centers[x]) { centers[x] = m; changed = true; }
    }
  }
  return means;
}
module.exports = kmeans;
