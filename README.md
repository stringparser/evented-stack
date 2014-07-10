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

  * One should be able to switch the events on and off.
  * set and get methods to store simple data between layers of the stack.

Defaults:

  * For iterative methods such as `forEach`, events are emitted. See below example for
  more information on this.

<b>Note</b>: right you can push everything to the stack. In the future
that might change.

### Usage

 Lets make a simple example that will measue the time of a request

```js
var http = require('http');
var Stack = require('evented-stack'); // Array subClass - EventEmitter
var stack = new Stack();

// Elements of the stack
stack.push(function stackFn1(req, res){

    stack.set('request time', new Date())
    res.write('')

    return 'There is no dark side of the Moon.';

  }).push(function stackFn2(req, res){

    res.write('\n As a matter of fact.')
    return 'Second layer return';

  })

// Events
stack.once('start', function onStart(req, res){ // Once call back

    console.log('onStart: Next time I won\'t be here')

  }).on('next', function onNext(req, res){

    console.log('onNext: In between layers of the stack')

  }).on('end', function onEnd(req, res){

    console.log('onEnd: finished!')
    var time = ( new Date() - stack.get('request time') ).toString();

    res.write('It\'s all dark.');
    res.write('\n');
    res.end('The request took ' + time + ' ms');
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

  // We can choose to keep events quiet
    stack.silent = true;
  // Or listen on demand
    stack.silent = false;

  // We could use stack.forEach but we'll use the build-in method #run
  // is like [].forEach but fires 3 events: `start`, `next` and `end`
  // spec: stack.run(stackArgs [,callback(lasRet, index, allReturns)])
  stack.run(req, res, function(lastReturn, index, returns){
    console.log('\nstack[' + index-1 + '] returned ', lastReturn, '\n');
  })
})

Server.listen(3000, function(){
  console.log('Server running on port '+3000);
})
```

### API

At this point the package is still on flux. Right know you can expect, `Array`
and `EventEmitter` like api.

If you are curious look at `./lib/Stack.js`. In any case this might change

### License
 MIT