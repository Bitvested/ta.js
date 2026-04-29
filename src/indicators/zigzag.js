function zigzag(data, perc=0.05) {
  const indexes = [];
  let min = Infinity, max = -Infinity, lmin = false, lmax = false;
  if (Array.isArray(data[0])) {
    for (let i = 0; i < data.length; i++) {
      if (lmin) {
        if (indexes[indexes.length-1].value >= data[i][1]) {
          indexes[indexes.length-1].value = data[i][1];
          indexes[indexes.length-1].index = i;
        }
        if (min >= data[i][1]) min = data[i][1];
        if ((data[i][0] - min) / min > perc) {
          indexes.push({ index: i, value: data[i][0] });
          lmax = true; lmin = false; max = data[i][0];
        }
      } else if (lmax) {
        if (indexes[indexes.length-1].value <= data[i][0]) {
          indexes[indexes.length-1].value = data[i][0];
          indexes[indexes.length-1].index = i;
        }
        if (max <= data[i][0]) max = data[i][0];
        if ((max - data[i][1]) / data[i][1] > perc) {
          indexes.push({ index: i, value: data[i][1] });
          lmin = true; lmax = false; min = data[i][1];
        }
      } else {
        if (min >= data[i][1]) min = data[i][1];
        if (max <= data[i][0]) max = data[i][0];
        const hdif = (data[i][0] - min) / min;
        const ldif = (max - data[i][1]) / max;
        if (ldif > perc && hdif < perc) {
          lmin = true;
          indexes.push({ index: 0, value: data[0][0] });
          indexes.push({ index: i, value: data[i][1] });
        } else if (hdif > perc && ldif < perc) {
          lmax = true;
          indexes.push({ index: 0, value: data[0][1] });
          indexes.push({ index: i, value: data[i][0] });
        } else if (ldif > hdif) {
          lmin = true;
          indexes.push({ index: 0, value: data[0][0] });
          indexes.push({ index: i, value: data[i][1] });
        } else {
          lmax = true;
          indexes.push({ index: 0, value: data[0][1] });
          indexes.push({ index: i, value: data[i][0] });
        }
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (lmin) {
        if (indexes[indexes.length-1].value >= data[i]) {
          indexes[indexes.length-1].value = data[i];
          indexes[indexes.length-1].index = i;
        }
        if (min >= data[i]) min = data[i];
        if ((data[i] - min) / min > perc) {
          indexes.push({ index: i, value: data[i] });
          lmax = true; lmin = false; max = data[i];
        }
      } else if (lmax) {
        if (indexes[indexes.length-1].value <= data[i]) {
          indexes[indexes.length-1].value = data[i];
          indexes[indexes.length-1].index = i;
        }
        if (max <= data[i]) max = data[i];
        if ((max - data[i]) / data[i] > perc) {
          indexes.push({ index: i, value: data[i] });
          lmin = true; lmax = false; min = data[i];
        }
      } else {
        if (min >= data[i]) min = data[i];
        if (max <= data[i]) max = data[i];
        const hdif = (data[i] - min) / min;
        const ldif = (max - data[i]) / max;
        if (ldif > perc && hdif < perc) {
          lmin = true;
          indexes.push({ index: 0, value: data[0] });
          indexes.push({ index: i, value: data[i] });
        } else if (hdif > perc && ldif < perc) {
          lmax = true;
          indexes.push({ index: 0, value: data[0] });
          indexes.push({ index: i, value: data[i] });
        } else if (ldif > hdif) {
          lmin = true;
          indexes.push({ index: 0, value: data[0] });
          indexes.push({ index: i, value: data[i] });
        } else {
          lmax = true;
          indexes.push({ index: 0, value: data[0] });
          indexes.push({ index: i, value: data[i] });
        }
      }
    }
  }
  if (indexes.length === 0) return [];
  const final = [indexes[0].value];
  for (let i = 1; i < indexes.length; i++) {
    const len = indexes[i].index - indexes[i-1].index;
    const delta = (indexes[i].value - indexes[i-1].value) / len;
    for (let x = 1; x <= len; x++) final.push(x * delta + indexes[i-1].value);
  }
  return final;
}
module.exports = zigzag;
