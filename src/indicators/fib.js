const fib = (start, end) => [start, (end-start)*.236+start, (end-start)*.382+start, (end-start)*.5+start, (end-start)*.618+start, (end-start)*.786+start, end, (end-start)*1.618+start, (end-start)*2.618+start, (end-start)*3.618+start, (end-start)*4.236+start];
module.exports = fib;
