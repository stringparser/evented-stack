# Stack

 Evented, Array styled, queue for node and the browser

### Why
  I wanted an array like queue with juicy behaviour and custom flow control.

  Inspired by creationix's [stack](https://www.npmjs.org/package/stack)
  and jessetane's [queue](https://www.npmjs.org/package/queue)

### General idea
  You get an Array subClass out of the `module`.

  Added to the Array goodness, there is an observer pattern baked in to make
  flow control over the queue customizable.

  For iterative methods such as `forEach`, `every` and `some` events are emitted
  at the start, next, and end elements.

  <b>Note</b>: only functions can be pushed to the Stack if you are only interested
  on the evented behaviour of the array look at `/lib/EventedArray.js` instead.

### Usage

 Lets make a simple example that will measue the time of a request

```
var http = require('http');
var Stack = require('stack'); // Array subClass - EventEmitter
var stack = new Stack();

// elements of the stack
stack.push(function stackFn1(req, res){

    stack.set('request time', new Date());
    res.write('Hello ');

  }).push(function stackFn2(req, res){

    res.write(' there!');
  })

// events
stack.once('start', function onStart(req, res){ // A once callback

    console.log('Next time I won\'t be here');

  }).on('next', function onNext(req, res){

    console.log('In between layers of the stack')

  }).on('end', function onEnd(req, res){

    var time = ( new Date() - stack.get('request time') ).toString();
    res.write('\n')
    res.end('Request time: ' + time + ' ms');
  })

```

At this point the stack is
```
stack =
// > [ [Function: stackFn1],
// >   [Function: stackFn2] ]
stack._events =
// > { start: { [Function: g] listener: [Function: onStart] },
// >   next: [Function: onNext],
// >   end: [Function: onEnd] }
```

Now we can hook it up to the server
```
var Server = http.createServer(function(req, res){

  stack.silent = true;  // We can choose to keep events quiet
  stack.silent = false; // Or listen on demand

  stack.forEach(function(layer, index){ // stack.forEach fires events:
    layer(req, res);                    //  `start`, `next` and `end`

  }, req, res) // Pass arguments to event callbacks
               // might change
})

Server.listen(3000, function(){
  console.log('Server running on port '+3000);
})
```