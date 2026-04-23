// src/_registry.js — shared indirection for cross-function indicator calls.
// index.js populates this object; per-function files read from it so consumer
// monkey-patches (ta.sma = override) propagate into dependent indicators.
module.exports = {};
