var Queue = require('./lib/Queue.js');
// > undefined

//
// > undefined
// Testing
// > undefined
//
// > undefined
var  que = new Queue(Math.random, Math.sin, Math.cos);
// > undefined
var methods = Object.getOwnPropertyNames;
// > undefined

que.forEach(function(el){
  console.log('now run %s', el)
})
// > starts with function random() { [native code] }
// > function random() { [native code] }
// > There is no after observer
// > function sin() { [native code] }
// > There is no after observer
// > function cos() { [native code] }
// > function cos() { [native code] } finished
// > [ [Function: random],
// >   [Function: sin],
// >   [Function: cos] ]


exports = module.exports = que;
// > [ [Function: random],
// >   [Function: sin],
// >   [Function: cos] ]
