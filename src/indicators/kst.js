const ta = require('../_registry.js');
function kst(data, r1=10, r2=15, r3=20, r4=30, s1=10, s2=10, s3=10, s4=15, sig=9) {
  const r1s = ta.sma(ta.roc(data, r1), s1);
  const r2s = ta.sma(ta.roc(data, r2), s2);
  const r3s = ta.sma(ta.roc(data, r3), s3);
  const r4s = ta.sma(ta.roc(data, r4), s4);
  // v1.x kst started at `i = ms` (= max(r)+max(s)), one bar after the canonical
  // first-valid-bar. Subtract one to preserve that alignment.
  const len = Math.min(r1s.length, r2s.length, r3s.length, r4s.length) - 1;
  if (len <= 0) return [];
  const off1 = r1s.length - len, off2 = r2s.length - len,
        off3 = r3s.length - len, off4 = r4s.length - len;
  const ks = new Array(len);
  for (let i = 0; i < len; i++) {
    ks[i] = r1s[i + off1] + r2s[i + off2] + r3s[i + off3] + r4s[i + off4];
  }
  const sl = ta.sma(ks, sig);
  const tail = ks.length - sl.length;
  const out = new Array(sl.length);
  for (let i = 0; i < sl.length; i++) out[i] = [ks[i + tail], sl[i]];
  return out;
}
module.exports = kst;
