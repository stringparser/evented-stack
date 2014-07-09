
/*
 * Here is defined the Stack constructor
 * and base methods for this Array subclass
 * some methods are changed to provide flow
 * to provide flow control plus `on` and `emit`
 * methods are added to the prototype
 */

var merge = require('utils-merge');
var evArray = require('./EventedArray')

function Stack(){
  var stack = new evArray;
  return stack;
}


/*
 * Stack only admits functions
 */

Stack.prototype.push = function push(/* arguments */){

  var self = this;
  var args = this.slice.call(arguments);

  args.forEach(function(fn){
    var isFn = (typeof fn === 'function');

    if(isFn)
      Array.prototype.push.apply(self, args);
    else {
      self.emit('error', 'Pushed element ' + fn + 'not a function');
      return false;
    }
  })

  return this;
}


exports = module.exporst = Stack
