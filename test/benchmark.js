const ta = require('../index.js'), parameters = require('./parameters.js');
let benchmark = [];
(async() => {
  for(let x in ta) {
    await new Promise(async(resolve) => {
      if(x == 'sim' || x == 'multi') return resolve();
      if(x == 'aroon') {
        for(let y in ta[x]) {
          await new Promise(async(res) => {
            let args = parameters[x + '_' + y],
                start = new Date().getTime();
            for(let i = 0; i < 5e5; i++) {
              let t = await ta[x][y].apply(null, args);
            }
            let elapsed = new Date().getTime() - start,
                ops = elapsed / 5e5;
            benchmark.push({function: x + '_' + y, elapsed: elapsed / 1e3, ops: Math.floor(5e5 / (elapsed / 1e3))});
            return res();
          });
        }
        return resolve();
      }
      let args = parameters[x],
          start = new Date().getTime();
      for(let i = 0; i < 5e5; i++) {
        await ta[x].apply(null, args);
      }
      let elapsed = new Date().getTime() - start,
          ops = elapsed / 5e5;
      benchmark.push({function: x, elapsed: elapsed / 1e3, ops: Math.floor(5e5 / (elapsed / 1e3))});
      return resolve();
    });
  }
  console.table(benchmark);
  console.log('benchmark passed')
})();
