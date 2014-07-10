# evented stack

 Evented, Array styled, stack for node

  ```shell
  npm install evented-stack
  ```

### Why
  Wanted an Array like queue with juicy behaviour and custom flow control.

  Inspired by creationix's [stack](https://www.npmjs.org/package/stack)
  and jessetane's [queue](https://www.npmjs.org/package/queue)

### General idea

On mind:

Get an Array subClass out of the `module` after which one can add flow control.

 * See `./lib/ArraySubClass.js` or the awesome [kangax post](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/) on how to do that.

Have the thing inherit from EventEmitter so one can plug flow control on the known array methods.

Niceness:

  * One should be able to switch the events on and of.
  * setState method provided to store simple data between layers of the stack.

Defaults:

  * For iterative methods such as `forEach`, events are emitted. See below for
  more information on this.

<b>Note</b>: right you can push everything to the stack. In the future
that might change.

### Usage

 Lets make a simple example that will measue the time of a request

```javascript
var http = require('http');
var Stack = require('stacked'); // Array subClass - EventEmitter
var stack = new Stack();

// Elements of the stack
stack.push(function stackFn1(req, res){

    stack.set('request time', new Date());
    res.write('Hello ');

  }).push(function stackFn2(req, res){

    res.write(' there!');
  })

// Events
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
```js
console.log(stack)
 [ [Function: stackFn1],
  [Function: stackFn2] ]
console.log(stack._events)
 { start: { [Function: g] listener: [Function: onStart] },
    next: [Function: onNext],
     end: [Function: onEnd] }
```

Now we can hook it up to a http.Server
```js
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

### API

At this point the package is still on flux. Right know you can expect, `Array`
and `EventEmitter` like api.

### License
 MIT