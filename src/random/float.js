const float = (min, max, rng) => (rng) ? rng()*(max-min)+min : Math.random()*(max-min)+min;
module.exports = float;
