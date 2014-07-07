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


function Queue() {

  var arr = [ ];
  arr.push.apply(arr, arguments);
  arr.__proto__ = Queue.prototype;

  arr.__proto__.observer = {
    error : function onError(str){
      throw new Error(str);
    },
    end : function onEnd(str){
      console.log(str + ' finished ');
    }
  };

  return arr;
}

Queue.prototype = new Array;

/*
 * event-emitter like behaviour
 */

Queue.prototype.on = function on(str, fn){

  var o = this.observer;

  if(typeof str !== 'string')
    return o.error('Provide a string to make an observer.')

  var obs = o[str.toLowerCase()];
  if(!obs){

    if(typeof fn !== 'function')
      o.error('Provide an observer function');
    else
      obs = fn;
  }
  else
    o.error('Overriding ' + str + ' observer');
}

Queue.prototype.emit = function emit(str){

  var o = this.observer;

  if(typeof str !== 'string')
    o.error('Need a string to emit an event');

  var obs = o[str.toLowerCase()];
  if(!obs){

    if(typeof fn !== 'function')
      o.error('Provide an observer function');
    else
      obs();
  }
  else
    o.error('Overriding ' + str + ' observer');
}