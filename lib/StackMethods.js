/*
 * Module Dependencies
 */

var Stack = require('./EventedArray')

exports = module.exports = function StackMethods(Stack){

  Stack.prototype.log = function log(key){
    console.log('%s', this[key])

    return this;
  }

  return Stack;
};


