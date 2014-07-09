/*
 * Module dependencies
 */

var obsArray = require('./ArraySubClass');
var instance = require('./observerInstanceProps');

/*
 * Add instance properties
 * to the Array subClass
 */

instance.forEach(function(prop){
  Object.defineProperty(obsArray.prototype, prop.key, {
    enumerable : false,
    value : prop.value
  })
})

/*
 * Expose `obsArray`
 */
exports = module.exports = obsArray;