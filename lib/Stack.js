
/*
 * Stack constructor definition
 */

var evArray = require('./ArrayEmitter')
  , merge = require('./utils').merge
  , defineProperty = require('./utils').defineProperty
  , methods = require('./utils').objectMethods;

/*
 * Construct the stack
 *  - Inherit from Array Emitter
 *  - Expose the `Stack` constructor
 *  - Write instance not enumerable properties
 */

function Stack(){

  var self = new evArray
  self.__proto__ = Stack.prototype;

  defineProperty(self, instance);
  if(arguments.length > 0)
    self.push.apply(self, arguments);

  return self;
}
Stack.prototype = new evArray;

exports = module.exports = Stack;

var instance = [{
  key : '_state', value : {}
}]


/*
 * Stack methods:
 *
 * - set: add/change value of this._state object.
 * - get: get a value from this._state object.
 * - run: wraps this.forEach method and emits custom events.
 */

Stack.prototype.set = function(key, value){

  if(key && value)
    this._state[key] = value;
}

Stack.prototype.get = function(key){

  if(key)
    return this._state[key];
}

Stack.prototype.run = function(/* arguments */){

  var self = this;

  var ret;
  var args = self.slice.call(arguments);
  var len = args.length;
  var cb = typeof args[len-1] === 'function' ?
    args.pop() : false;


  len = self.length;

  args.unshift('start');

  self.silent ?
    true : self.emit.apply(self, args);

  self.forEach(function(layer, index, lastRet, rets){

    ret = layer.apply(self,
      args.slice(1)   // Don't forget to slice them! arg[0] is the event
    );

    if(cb)
      cb(lastRet, index, rets);

    if(!self.silent){

      if(index < len-1) args[0] = 'next';
      else              args[0] = 'end';

      self.emit.apply(self, args);
    }

    return ret;
  })

}

/*
 * Overriden Array like methods:
 *
 *  - Chainable methods:
 *    `forEach`, `push`
 *    (at the expense of loosing the original functionality)
 *
 *  - forEach with continue and break control that feeds previous returns
 *
 * Note: aside of the return value, only functionality should be added
 * respecting the original behavior of the method.
 */

//----
// forEach
//  - continue and break flow control
//  - feeds previous returns values to the iterator
//
Stack.prototype.forEach = function forEach(iterator, scope){

  this.break = false;
  this.continue = false;

  scope = scope || this;
  // This is better than undefined

  var index = 0
    , len = this.length
    , cont = true
    , self = this
    , rets = []
    , ret;

  next();
  function next(){

    //
    // Keep and feed return values to iterator

    ret = iterator.call(scope, self[index], index, ret, rets)
    rets.push(ret);

    console.log(ret, rets);
    index++;

    cont = self.break ? false : (
      self[index] ? true : false
    );

    if(self.continue){

      index++;
      self.continue = false;
    }

    if(cont) next();

  }
  return this;
}

//----
// push
//  - Chainable
//
Stack.prototype.push = function(/* arguments */){

  Array.prototype.push.apply(this, this.slice.call(arguments))

  return this;
}