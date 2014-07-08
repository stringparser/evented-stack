//
//  Make Queue an Array Subclass
//  Who knew this was such a headeache.
//
//  Thanks to this awesome post:
//    http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
//

/*
 * Expose constructor `Queue`
 */

module.exports = exports = Queue;

var proto = [
  { key : 'name', value : undefined },
  {
    key : 'observer', value : {
      start : function onStart(str){
        console.log('starts with ' + str)
      },
      next : function onNext(str){
        console.log('after ' + str)
      },
      end : function onEnd(str){
        console.log(str + ' finished ');
      },
      error : function onError(str){
        throw new Error(str);
      },
      log : function onLog(str){
        console.log(str);
      }
    }
  }
]

function Queue() {

  var arr = [ ];
  arr.push.apply(arr, arguments);
  arr.__proto__ = Queue.prototype;

  proto.forEach(function(prop){

    Object.defineProperty(
      arr.__proto__, prop.key, {
      enumerable : false,
      value : prop.value
    })
  })

  return arr;
}
Queue.prototype = new Array;

/*
 * forEach method that stops
 * when iterator returs false
 */

Queue.prototype.forEach = function forEach(iter, scope){

  var i = 0
    , len = this.length
    , cont = true
    , ret = undefined
    , self = this;

  function next(){

    ret = iter.call(scope, self[i], i, self);

    if(ret !== undefined && !ret)
      cont = false;
    if(i === len-1)
      self.emit('end', self[i]);
    else
      self.emit('next', self[i]);

    i++;
    if(cont && i < len)
      next();

  }

  self.emit('start', self[i]);
  next();

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