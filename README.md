# Stack

 Evented, Array styled, queue for node and the browser

### Why
  I wanted an array like queue with juicy behaviour and custom flow control.

  Inspired by creationix's [stack](https://www.npmjs.org/package/stack)
  and jessetane's [queue](https://www.npmjs.org/package/queue)

### Usage
  You get an Array subClass out of the `module`.

  Added to the Array goodness, there is an observer pattern baked in to make
  flow control over the queue customizable.

  For iterative methods such as `forEach`, `every` and `some` events are emitted
  at the start, next, and end elements.

  <b>Note</b>: only functions can be pushed to the Stack if you are only interested
  on the evented behaviour of the array look at `/lib/EventedArray.js` instead.