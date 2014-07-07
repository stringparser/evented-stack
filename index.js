
//
//  Queue as Array subclass
//  Who knew this wa such a headeache. 
//
//  Thanks to this awesome post: 
//    http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
//
function Queue() {
  var arr = [ ];
  arr.push.apply(arr, arguments);
  arr.__proto__ = SubArray.prototype;
  return arr;
}
Queue.prototype = new Array;



module.exports = Queue;