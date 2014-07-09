var Queue = require('./lib/Queue');
    methods = require('./lib/methods');

/*
 * Add methods to the prototype
 */

Queue = methods(Queue);

//
// Testing
//
var  que = new Queue(Math.random, Math.sin, Math.cos);


que.forEach(function(el){
  console.log('now run %s', el)
})


exports = module.exports = que;
