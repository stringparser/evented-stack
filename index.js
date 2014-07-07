
var Queue = require('./lib/array-subclass');

//
// ## Allow forEach to stop
//

Queue.prototype.forEach = function forEach(fn, scope){

  var i, len; 
  for(i = 0, len = this.length; i < len; ++i){
    if(i in this){
      var ret = fn.call(scope, this[i], i, this);

      if(!ret) break;
    }
  }
}


module.exports = Queue;