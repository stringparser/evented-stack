
/*
 * Module dependencies
 * var stack = new require('./lib/EventedArray')(1,2,3)
 */

var evArray = require('./ArraySubClass')
  , proto = require('./observerInstanceProps')
  , EventEmitter = require('events').EventEmitter
  , merge = require('utils-merge');

/*
 * Inherit from EventEmitter
 */

merge(evArray.prototype, EventEmitter.prototype)

proto.forEach(function(prop){

  Object.defineProperty(evArray.prototype, prop.key, {
    enumerable : false,
    value : prop.value
  })
})


/*
 * Expose the `evArray`
 */

exports = module.exports = evArray;

/*
 * Evented forEach
 * when iterator returns false stops
 */

evArray.prototype.forEach = function forEach(iterator){

  this.break = false;
  this.continue = false;

  var index = 0
    , len = this.length
    , cont = true
    , self = this
    , ret = []
    , args = this.slice.call(arguments, 1);

  args.unshift('start');
  self.emit.apply(this, args);
  next();

  function next(){

    ret.push(
      iterator.call(self, self[index], index, self)
    );

    index++;
    cont = self.break ? false : (
      self[index] ? true : false
    );

    if(cont){

      args[0] = 'next';

      self.silent ?
        true : self.emit.apply(self, args);

      if(index < len && self.continue)  index++;
      next();
    }
    else {

      args[0] = 'end';

      self.silent ?
        true : self.emit.apply(self, args);
    }

  }
  return this;
}

/*
 * Chainable push
 */

evArray.prototype.push = function(/* arguments */){

  Array.prototype.push.apply(this, this.slice.call(arguments))

  return this;
}

evArray.prototype.set = function(key, value){

  if(key && value)
    this._state[key] = value;
}

evArray.prototype.get = function(key){

  if(key)
    return this._state[key];
}