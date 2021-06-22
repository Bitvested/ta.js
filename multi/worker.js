const { parentPort } = require('worker_threads'),
      ta = require('../index.js');

async function simulate(ops) {
  var projected = ops.d.slice();
  for(var x = 0; x < ops.length; x++) {
    var change = [];
    for(var y = 1; y < projected.length; y++) {
      var df = await ta.dif(projected[y],projected[y-1]);
      change.push(df);
    }
    var mean = await ta.sma(change, change.length),
        std = await ta.std(change), random = await ta.normsinv(Math.random());
    projected.push(projected[projected.length-1]*Math.exp(mean[0]-(std*std)/2+std*random));
  }
  return projected;
}

parentPort.on('message', async(ops) => {
  if(ops.f < 0) process.exit(0);
  const functions = [simulate],
        result = await functions[ops.f](ops);
  parentPort.postMessage(result);
});
