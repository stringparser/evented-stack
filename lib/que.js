/*
 * Module Dependencies
 */

var Queue = require('./array-subclass');

/*
 * Expose `Queue` Array subclass
 * Needed for length property to work
 */

exports = module.exports = Queue;

function ins(t, a){

  console.log('this : ', this)
  console.log('args : ', arguments)
}

Queue.prototype.log = function log(key){

  console.log('%s', this[key])
}

/*
 * push method only for functions
 */

Queue.prototype.push = function push(/* arguments */){

  var self = this;
  var args = this.slice.call(arguments);

  args.forEach(function(fn){
    var isFn = (typeof fn === 'function');

    if(isFn)
      Array.prototype.push.apply(self, args);
    else {

      self.observer.error('Pushed element ' + fn + 'not a function');
      // Stop forEach
      return false;
    }
  })
}

/*
 * forEach method that stops
 */

Queue.prototype.forEach = function forEach(fn, scope){

  var i, len;
  for(i = 0, len = this.length; i < len; ++i){
    if(i in this){

      var ret = fn.call(scope, this[i], i, this);

      // end if return value is false
      if(ret !== undefined && !ret) break;
      if(i === length)
        this.onend();
    }
  }
}

