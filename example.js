
var http = require('http');
// > undefined
var Stack = require('stack');
// > undefined

// Let's make a logger middleware
// > undefined
var stack = new Stack();
// > undefined

// Stack inherits from event emitter
// > undefined

stack.push(function stackFn1(req, res){

  stack.set('request time', new Date())
  res.write('Hello ')

}).push(function stackFn2(req, res){

  res.write(' there!')

}).once('start', function onStart(req, res){ // Once call back

  console.log('Next time I won\'t be here')

}).on('next', function onNext(req, res){

  console.log('In between layers of the stack')

}).on('end', function onEnd(req, res){

  var time = ( new Date() - stack.get('request time') ).toString();
  res.write('\n')
  res.end('Request time: ' + time + ' ms');
})
// > [ [Function: stackFn1],
// >   [Function: stackFn2] ]

stack
// > [ [Function: stackFn1],
// >   [Function: stackFn2] ]
stack._events
// > { start: { [Function: g] listener: [Function: onStart] },
// >   next: [Function: onNext],
// >   end: [Function: onEnd] }

var Server = http.createServer(function(req, res){


  // We can choose to keep events quiet
    stack.silent = true;
  // Or listen on demand
    stack.silent = false;

  //
  // stack.forEach fires custom events:
  //  `start`, `next` and `end`
  stack.forEach(function(layer, index){
    layer(req, res);

  }, req, res) // Pass arguments to event emitters
})
// > undefined

Server.listen(3000, function(){
  console.log('Server running on port '+3000);
})
// > { domain: null,
// >   _events:
// >    { request: [Function],
// >      connection: [Function: connectionListener],
// >      clientError: [Function],
// >      listening: { [Function: g] listener: [Function] } },
// >   _maxListeners: 10,
// >   _connections: 0,
// >   connections: [Getter/Setter],
// >   _handle: null,
// >   _usingSlaves: false,
// >   _slaves: [],
// >   allowHalfOpen: true,
// >   httpAllowHalfOpen: false,
// >   timeout: 120000 }
