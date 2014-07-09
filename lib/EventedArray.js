
/*
 * Module dependencies
 */

var evArray = require('./ArrayObserver')
  , EventEmitter = require('events').EventEmitter
  , inherits = require('inherits');

    inherits(evArray, EventEmitter.prototype);

/*
 * Expose the `evArray`
 */

exports = module.exports = evArray;

/*
 * Evented forEach that stops
 */

evArray.prototype.forEach = function forEach(iter, scope){

  var i = 0
    , len = this.length
    , cont = true
    , ret = undefined
    , self = this;

  self.emit('start', self[i]);
  next();

  function next(){

    ret = iter.call(scope, self[i], i, self);

    if(ret !== undefined && !ret)
      cont = false;

    if(i < len && cont){
      i++;
      self.emit('next', self[i]);
      next();
    }
    else
      self.emit('end', self[i]);

  }

  return this;
}

/*
 * Evented ifEach
 */

/*
 * push method only for functions
 */

evArray.prototype.push = function push(/* arguments */){

  var self = this;
  var on = this.observer;
  var args = this.slice.call(arguments);

  args.forEach(function(fn){
    var isFn = (typeof fn === 'function');

    if(isFn)
      Array.prototype.push.apply(self, args);
    else {
      on.error('Pushed element ' + fn + 'not a function');
      return false;
    }
  })

  return this;
}
