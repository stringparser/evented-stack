/*
 * Module dependencies
 *
 * Make Queue an Array Subclass
 * Who knew this was such a headeache
 *
 * Thanks to this awesome post:
 *   http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
 *
 * Here is defined the Queue constructor
 * and base methods for this Array subclass
 * some methods are changed to provide flow
 * to provide flow control plus `on` and `emit`
 * methods are added to the prototype
 */

var proto = require('./proto')

/*
 * Expose constructor `Queue`
 */

module.exports = exports = Queue;

function Queue() {

  var arr = [ ];
  arr.push.apply(arr, arguments);
  arr.__proto__ = Queue.prototype;

  proto.forEach(function(prop){
    arr.__proto__[prop.key] = prop.value
  })

  return arr;
}
Queue.prototype = new Array;

/*
 * Expose constructor `Queue`
 */

module.exports = exports = Queue;


/*
 * forEach method that stops
 * when iterator returs false
 * using next() since for loop
 * has no scope
 */

Queue.prototype.forEach = function forEach(iter, scope){

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

Queue.prototype.push = function push(/* arguments */){

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

/*
 * Event-Emitter like API
 */

Queue.prototype.on = function on(str, fn){

  var on = this.observer;

  if(typeof str !== 'string')
    return on.error('Provide a string to make an observer.')

  var obs = on[str.toLowerCase()];
  if(!obs){

    if(typeof fn !== 'function')
      on.error('Provide an observer function');
    else
      obs = fn;
  }
  else
    on.log('Overriding ' + str + ' observer');

  return this;
}

Queue.prototype.emit = function emit(str /*, obsArgs */){

  var on = this.observer;

  if(typeof str !== 'string')
    on.error('Need a string to emit an event');

  var obs = on[str.toLowerCase()];
  if(!obs)
    on.log('There is no '+str+' observer');
  else {

    var obsArgs = this.slice.call(arguments, 1)
    obs(obsArgs);
  }

  return this;
}


/*
 * define not Enumerable property helper
 */
function defineProperty(obj, name, key, value){

  Object.defineProperty(obj, key, {
    enumerable : false,
    value : value
  })
}
