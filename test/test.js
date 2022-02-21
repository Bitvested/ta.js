const ta = require('../index.js'), assert = require('assert'), parameters = require('./parameters.js');
for(let x in ta) {
  if(x == 'sim' || x == 'multi') continue;
  if(x == 'support') {
    ta[x].apply(null, parameters[x].in).then((res) => { try { res.calculate(9).then((res) => { try { assert.deepEqual(res, parameters[x].out); } catch(e) { console.error("Test failed @ " + x + "\n"); } }); } catch(e) { console.error("Test failed @ " + x + "\n"); } });
    continue
  }
  if(x == 'resistance') {
    ta[x].apply(null, parameters[x].in).then((res) => { try { res.calculate(4).then((res) => { try { assert.deepEqual(res, parameters[x].out); } catch(e) { console.error("Test failed @ " + x + "\n"); } }); } catch(e) { console.error("Test failed @ " + x + "\n"); } });
    continue
  }
  if(x == 'aroon') {
    for(let y in ta[x]) {
      ta[x][y].apply(null, parameters[x + '_' + y].in).then((res) => { try { assert.deepEqual(res, parameters[x + '_' + y].out); } catch(e) { console.error('Test failed @ ' + x + '_' + y); } });
    }
    continue;
  }
  ta[x].apply(null, parameters[x].in).then((res) => { try { assert.deepEqual(res, parameters[x].out); } catch(e) { console.log(res);console.error(parameters[x].out);console.error('Test failed @ ' + x + '\n'); } })
}
