/*
 * Make an Array Subclass
 * Who knew this was such a headeache
 *
 * Thanks to this awesome post:
 *   http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
 *
 */

function ArraySubClass() {

  var arr = [ ];
  arr.push.apply(arr, arguments);
  arr.__proto__ = ArraySubClass.prototype;

  return arr;
}

ArraySubClass.prototype = new Array;
/*
 * Expose constructor `ArraySubClass`
 */

exports = module.exports = ArraySubClass;
