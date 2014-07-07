var inherits = require('inherits');

function Queue(){
}

Queue.prototype = [];
Queue.prototype.__proto__ = {};

inherits(Queue, Array)

module.exports = exports = Queue;


var que = new Queue([1,2,3]);
console.log(que)