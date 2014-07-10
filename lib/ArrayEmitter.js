
/*
 * Module dependencies
 */

var EventEmitter = require('events').EventEmitter
  , subArray = require('./ArraySubClass')
  , merge = require('./utils').merge
  , defineProperty = require('./utils').defineProperty;

/*
 * Construct the Evented Array or Array Emitter
 *  - Inherit from Array
 *  - Inherit from EventEmitter
 *
 * Expose the constructor `ArrayEmitter`
 */

function ArrayEmitter(){

  var self = new subArray;

  self.__proto__ = ArrayEmitter.prototype;

  defineProperty(self, instance);
  if(arguments.length > 0)
    self.push.apply(self, arguments);

  return self;
}
ArrayEmitter.prototype = new subArray;
merge(ArrayEmitter.prototype, EventEmitter.prototype);

exports = module.exports = ArrayEmitter;

/*
 * Instance properties of the ArrayEmitter
 */

var instance = [
  { key : 'break', value : false },
  { key : 'continue', value : false },
  { key : 'silent', value : false },
  {
    key : '_events', value : {
      /*start : function onStart(str){

        str = str || this[0];
        console.log('start: ' + str )
      },
      next : function onNext(str){

        console.log('next: ' + str)
      },
      end : function onEnd(str){

        str = str || this[this.length-1];
        console.log('end: ' + str );
      },
      error : function onError(str){
        throw new Error(str);
      },
      log : function onLog(str){

        if(this[str])
          console.log('%s ', this[str]);
        else if(str)
          console.log(str);
        else
          console.log('');
      }*/
    }
  }
]