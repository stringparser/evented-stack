/*
 * Module Dependencies
 */

var Queue = require('./lib/array-subclass');

/*
 * Expose `Queue` Array subclass
 */

exports = module.exports = Queue

/*
 * push method only for functions
 */

Queue.prototype.push = function(/* arguments */){

  this.forEach(function(fn){
    return typeof fn === 'function';
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