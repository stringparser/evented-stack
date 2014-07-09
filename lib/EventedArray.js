
/*
 * Module dependencies
 * var stack = new require('./lib/EventedArray')()
 */

var evArray = require('./ArrayObserver')
  , EventEmitter = require('events').EventEmitter
  , merge = require('utils-merge');

/*
 * Inherit from EventEmitter
 */

merge(evArray.prototype, EventEmitter.prototype);

/*
 * Expose the `evArray`
 */

exports = module.exports = evArray;

/*
 * Evented forEach
 * when iterator returns false stops
 */

evArray.prototype.forEach = function forEach(iter, scope){

  var i = 0
    , len = this.length
    , cont = true
    , ret = undefined
    , self = this;

  self.break = false;
  self.continue = false;
  self.emit('start');
  next();

  function next(){

    ret = iter.call(self, self[i], i, self);

    if(self.break){
      cont = false;
    }
    else if(self.continue) {
      i++;
      self.continue = false;
    }

    if(i < len && cont){
      i++;
      self.emit('next', ret);
      next();
    }
    else
      self.emit('end', ret);

  }

  return this;
}