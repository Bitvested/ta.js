const { Worker } = require('worker_threads');

async function sim(d, length, sims, perc) {
  return new Promise(async(resolve, reject) => {
    var sd = [], length = (!length) ? 50 : length, sims = (!sims) ? 1000 : sims;
    let worker = new Worker(__dirname + '/worker.js');
    worker.on('message', async(result) => {
      sd.push(result);
    });
    worker.on('exit', async() => {
      if(!perc) return resolve(sd);
      var finalprojection = d.slice();
      for(var i = d.length; i < sd[0].length; i++) {
        sd.sort((a, b) => {
          if(a[i] > b[i]) return 1;
          if(a[i] < b[i]) return -1;
          return 0;
        });
        finalprojection.push(sd[Math.round(sd.length*perc)][i]);
      }
      return resolve(finalprojection);
    });
    for(var i = 0; i < sims; i++) {
      worker.postMessage({f: 0, d: d, length: length});
    }
    worker.postMessage({f: -1});
  });
}

module.exports = {sim};
