
var http = require('http');
var Stack = require('stack');

// Let's make a logger middleware
var stack = new Stack();

// Stack inherits from event emitter

stack.push(function stackFn(req, res){

  stack.set('request time', new Date())
  res.write('Hello ')

}).push(function stackFn(req, res){

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

Server.listen(3000, function(){
  console.log('Server running on port '+3000);
})
