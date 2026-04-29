// Shared library loaders + helpers for every per-category cases file.
// If a library fails to load, its key in `loadErrs` is populated and every
// adapter that references it is omitted via the `library && { … }` truthy
// pattern in the per-category files.

let ta, ti, ts, debut, tulind;
const loadErrs = {};
try { ta     = require('../..'); }                    catch (e) { loadErrs['ta.js']               = e.message; }
try { ti     = require('technicalindicators'); }      catch (e) { loadErrs['technicalindicators']  = e.message; }
try { ts     = require('trading-signals'); }          catch (e) { loadErrs['trading-signals']      = e.message; }
try { debut  = require('@debut/indicators'); }        catch (e) { loadErrs['@debut/indicators']    = e.message; }
try { tulind = require('tulind'); }                   catch (e) { loadErrs['tulind']               = e.message; }

function tulindSync(name, inputs, options) {
  let result;
  tulind.indicators[name].indicator(inputs, options, (err, res) => {
    if (err) throw err;
    result = res;
  });
  return result;
}

const id = (x) => x;

module.exports = { ta, ti, ts, debut, tulind, loadErrs, tulindSync, id };
