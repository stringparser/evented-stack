# que

 Array styled queue for node and the browser

### Why
  I wanted an array like queue with juicy behaviour.

### Usage
  What you get out of the module is an Array subClass. Inhertance from Array
  gives you all the array goodness. Besides some event emitter like logic in
  order to make control flow of the Queue possible. Events are fired on iterative `forEach`, `every` and `some` at the beginning, in between and end of each function evaluation.


  Note: you only can push functions to the array.