
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

evArray.prototype.forEach = function forEach(iterator, scope){

  scope = scope || this;
  this.break = false;
  this.continue = false;

  var index = 0
    , len = this.length
    , cont = true
    , self = this
    , ret = [];

  self.emit('start');
  next();

  function next(){

    ret.push(
      iterator.call(scope, self[index], index, self)
    );
    console.log('index ', index)
    index++;

    cont = self.break ? false : (
      self[index] ? true : false
    );

    console.log(' cont ', cont)

    if(cont){

      self.silent ?
        true : self.emit('next', ret[index-1], ret);

      if(index < len && self.continue)
        index++;

      next();
    }
    else {
      self.silent ?
        true : self.emit('end', ret[index-1], ret);
    }

  }

  return this;
}