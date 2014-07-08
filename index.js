var Queue = require('./lib/Queue.js');
// > undefined

//
// > undefined
// Testing
// > undefined
//
// > undefined
var  que = new Queue(Math.random, Math.sin, Math.cos);


que.forEach(function(el){
  console.log('now run %s', el)
})


exports = module.exports = que;
