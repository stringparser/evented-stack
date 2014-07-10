
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

  var args = self.slice.call(arguments);
  var len = args.length;
  var cb = typeof args[len-1] === 'function' ?
    args[len-1] : false;

  if(cb) args.pop();

  len = self.length;
  self.silent ? true : self.emit('start', args);

  self.forEach(function(layer, index, lastRet, rets){

    layer.apply(self, args);

    if(cb) cb(lastRet, rets);

    if(!self.silent){

      if(index < len) self.emit('next', args);
      else            self.emit('end', args);
    }
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
    , ret = [];

  next();
  function next(){

    cont = self.break ? false : (
      self[index] ? true : false
    );

    //
    // Keep and feed return values to iterator
    ret.push(
      iterator.call(scope, self[index], index, ret[index], ret)
    );

    index++;
    if(self.continue){

      (i < len) ? index++ : false;
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