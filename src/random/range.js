const range = (min, max, rng) => Math.floor((rng) ? rng()*(Math.floor(max)-Math.ceil(min))+Math.ceil(min) : Math.random()*(Math.floor(max)-Math.ceil(min))+Math.ceil(min));
module.exports = range;
