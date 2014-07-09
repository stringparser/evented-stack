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

/*
 * Event-Emitter like API
 */

obsArray.prototype.on = function on(str, fn){

  var on = this.observer;

  if(typeof str !== 'string')
    return on.error('Provide a string to make an observer.')

  var obs = on[str.toLowerCase()];
  if(!obs){

    if(typeof fn !== 'function')
      on.error('Provide an observer function');
    else
      obs = fn;
  }
  else
    on.log('Overriding ' + str + ' observer');

  return this;
}

obsArray.prototype.emit = function emit(str /*, obsArgs */){

  var on = this.observer;

  if(typeof str !== 'string')
    on.error('Need a string to emit an event');

  var obs = on[str.toLowerCase()];
  if(!obs)
    on.log('There is no '+str+' observer');
  else {

    var obsArgs = this.slice.call(arguments, 1)
    obs(obsArgs);
  }

  return this;
}