//
//  Array Subclass
//  Who knew this was such a headeache.
//
//  Thanks to this awesome post:
//    http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
//

function SubArray() {

  var arr = [ ];
  arr.push.apply(arr, arguments);
  arr.__proto__ = SubArray.prototype;

  arr.__proto__.observer = {
    error : function(str){
      throw new Error(str);
    },
    end : function(str){
      console.log(str + ' finished ');
    }
  };

  return arr;
}

SubArray.prototype = new Array;

SubArray.prototype.emit = function emit(str){

  var o = this.observer;

  if(typeof str !== 'string')
    o.error('provide a string to emit');

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

module.exports = exports = SubArray;