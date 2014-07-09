# Stack

 Evented, Array styled, queue for node and the browser

### Why
  I wanted an array like queue with juicy behaviour and custom flow control.

### Usage
  You get an Array subClass out of the `module`.

  Added to the Array goodness, there is an observer pattern baked in to make
  flow control over the queue customizable.

  For iterative methods such as `forEach`, `every` and `some` events are emitted.

  Note: you only can push functions to the array.