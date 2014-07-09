# Stack

 Evented, Array styled, queue for node and the browser

### Why
  I wanted an array like queue with juicy behaviour and custom flow control.

  Inspired by creationix's [stack](https://www.npmjs.org/package/stack)
  and jessetane's [queue](https://www.npmjs.org/package/queue)

### Usage

 Lets make a simple example that will measue the time of a request

```

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
```

### General idea
  You get an Array subClass out of the `module`.

  Added to the Array goodness, there is an observer pattern baked in to make
  flow control over the queue customizable.

  For iterative methods such as `forEach`, `every` and `some` events are emitted
  at the start, next, and end elements.

  <b>Note</b>: only functions can be pushed to the Stack if you are only interested
  on the evented behaviour of the array look at `/lib/EventedArray.js` instead.