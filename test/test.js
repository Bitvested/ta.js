const ta = require('../index.js'), assert = require('assert'), parameters = require('./parameters.js');
for(let x in ta) {
  if(x == 'zigzag_close') {
    try { assert.deepEqual(ta['zigzag'].apply(null, parameters[x].in), parameters[x].out); } catch(e) { console.error('Test failed @ ' + x + '\n'); }
    continue
  }
  if(x == 'sim' || x == 'multi' || x == 'random' || x == 'fibnumbers' || x == 't_table') continue;
  if(x == 'support') {
    try { assert.deepEqual((ta[x].apply(null,parameters[x].in)).calculate(9), parameters[x].out); } catch(e) { console.error('Test failed @ ' + x + "\n"); }
    continue
  }
  if(x == 'resistance') {
    try { assert.deepEqual((ta[x].apply(null,parameters[x].in)).calculate(4), parameters[x].out); } catch(e) { console.error('Test failed @ ' + x + '\n'); }
    continue
  }
  if(x == 'aroon') {
    for(let y in ta[x]) {
      try { assert.deepEqual(ta[x][y].apply(null,parameters[x + '_' + y].in), parameters[x + '_' + y].out); } catch(e) { console.error('Test failed @ ' + x + '_' + y); }
    }
    continue;
  }
  try { assert.deepEqual(ta[x].apply(null, parameters[x].in), parameters[x].out); } catch(e) { console.error('Test failed @ ' + x + '\n'); }
}
