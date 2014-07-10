
var http = require('http'),
   Stack = require('./index.js');
// > undefined


//
// > undefined
var stack = new Stack();
// > undefined
stack
// > []

// Stack inherits from event emitter
// > undefined
stack.push(function stackFn1(req, res){

  stack.set('request time', new Date())
  res.write('There is no dark side of the Moon.')

  return 'Layer 1!';

}).push(function stackFn2(req, res){

  res.write('\nAs a matter of fact ')
  return 'Layer 2!';

}).once('start', function onStart(req, res){ // Once call back

  console.log('onStart: Next time I won\'t be here')

}).on('next', function onNext(req, res){

  console.log('onNext: In between layers of the stack')

}).on('end', function onEnd(req, res){

  console.log('onEnd: finished!')
  var time = ( new Date() - stack.get('request time') ).toString();

  res.write('it\'s all dark.');
  res.write('\n');
  res.end('The request took ' + time + ' ms');
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

  // stack.run is like [].forEach but fires 3 events: `start`, `next` and `end`
  // spec: stack.run(stackArgs [,callback(lasRet, index, allReturns)])

  stack.run(req, res, function(lastReturn, index, returns){
    console.log('\nstack[' + index-1 + '] returned ', lastReturn, '\n');
  })
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
