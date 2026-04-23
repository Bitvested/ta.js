function expected_trails(n) {
  for(var i = 1, sum = 0; i <= n; i++) sum += 1 / i;
  return Math.ceil(n * sum);
}
module.exports = expected_trails;
