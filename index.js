var Queue = require('./lib/Queue');
    methods = require('./lib/methods');

/*
 * Add methods to the prototype
 */

Queue = methods(Queue);
// > undefined

//
// > undefined
// Testing
// > undefined
//
// > undefined
var  que = new Queue(Math.random, Math.sin, Math.cos);
// > undefined


que.forEach(function(el){
  console.log('now run %s', el)
})
// > start event before function random() { [native code] }
// > now run function random() { [native code] }
// > next event function random() { [native code] }
// > now run function sin() { [native code] }
// > next event function sin() { [native code] }
// > now run function cos() { [native code] }
// > ending event after function cos() { [native code] }
// > [ [Function: random],
// >   [Function: sin],
// >   [Function: cos] ]


exports = module.exports = que;
// > [ [Function: random],
// >   [Function: sin],
// >   [Function: cos] ]
