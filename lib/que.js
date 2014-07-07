/*
 * Module Dependencies
 */

var Queue = require('./array-subclass');

/*
 * Expose `Queue` Array subclass
 */

exports = module.exports = Queue

/*
 * push method only for functions
 */

Queue.prototype.push = function(/* arguments */){

  var self = this;
  var args = arguments;

  this.forEach(function(fn){
    var isFn = typeof fn === 'function';

    if(isFn)
      Array.prototype.push.apply(self, args);
    else
      return false;
  })
}

/*
 * forEach method that stops
 */

Queue.prototype.forEach = function (fn, scope){

  var i, len;
  for(i = 0, len = this.length; i < len; ++i){
    if(i in this){
      var ret = fn.call(scope, this[i], i, this);

      // end if return value is false
      if(!ret) break;
    }
  }
}