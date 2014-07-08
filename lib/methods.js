/*
 * Module Dependencies
 */

exports = module.exports = function QueueMethods(Queue){

  Queue.prototype.log = function log(key){
    console.log('%s', this[key])

    return this;
  }

  return Queue;
};


