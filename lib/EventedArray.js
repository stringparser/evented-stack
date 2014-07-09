
/*
 * Module dependencies
 */

var evArray = require('./ArrayObserver');

/*
 * Expose the `evArray`
 */

exports = module.exports = evArray;

/*
 * forEach method that stops
 * when iterator returs false
 * using next() since for loop
 * has no scope
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

    if(i < len)
      self.emit('next', self[i]);
    else
      self.emit('end', self[i]);

    i++;
    if(cont && i < len)
      next();

  }

  return this;
}

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