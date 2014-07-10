
var http = require('http'),
   Stack = require('./index.js');
// > undefined


//
// > undefined
var stack = new Stack();
stack

// Stack inherits from event emitter
// > undefined
stack.push(function stackFn1(req, res){

  stack.set('request time', new Date())
  res.write('Hola mama! ')

}).push(function stackFn2(req, res){

  res.write(' there!')

}).once('start', function onStart(req, res){ // Once call back

  console.log('Next time I won\'t be here')

}).on('next', function onNext(req, res){

  console.log('In between layers of the stack')

}).on('end', function onEnd(req, res){

  var time = ( new Date() - stack.get('request time') ).toString();
  res.write('\n')
  res.end('Tiempo de respueta del servidor: ' + time + ' ms');
})
// > TypeError: Object [object Object] has no method 'push'
// >     at repl:1:8
// >     at REPLServer.self.eval (repl.js:112:21)
// >     at Interface.<anonymous> (repl.js:239:12)
// >     at Interface.emit (events.js:95:17)
// >     at Interface._onLine (readline.js:202:10)
// >     at Interface._line (readline.js:531:8)
// >     at Interface._ttyWrite (readline.js:767:16)
// >     at ReadStream.onkeypress (readline.js:99:10)
// >     at ReadStream.emit (events.js:98:17)
// >     at emitKey (readline.js:1095:12)

stack
stack._events

var Server = http.createServer(function(req, res){


  // We can choose to keep events quiet
    stack.silent = true;
  // Or listen on demand
    stack.silent = false;

  //
  // stack.run is like [].forEach but fires 3 events:
  //  `start`, `next` and `end`
  stack.run(function(layer, index, retArray){

  })
})

Server.listen(3000, function(){
  console.log('Server running on port '+3000);
})
