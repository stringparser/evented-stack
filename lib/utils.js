/*
 * Better way to manage utility dependencies
 * if one wants to change anything of the below code in the future
 * that provides better/faster way of doing things
 */


exports = module.exports = {};


exports.defineProperty = function defineProperty(obj, instance){

  instance.forEach(function(prop){

    Object.defineProperty(obj, prop.key, {
      enumerable : false,
      value : prop.value
    })
  })
};

exports.objectMethods = function objectMethods(obj){

    var names = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function')
        names.push(key);
    }
    return names.sort();
};

exports.merge = require('utils-merge');