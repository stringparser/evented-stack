/*
 * proto for the `Queue` constructor
 * will be added using Obect.defineProperty
 * to make them not enumerable
 */

var inst = [
  { key : 'name', value : undefined },
  { key : 'break', value : true },
  { key : 'continue', value : false },
  {
    key : '_events', value : {
      start : function onStart(str){

        str = str || this[0];
        console.log('start event before ' + str )
      },
      next : function onNext(str){
        console.log('next event ' + str)
      },
      end : function onEnd(str){

        str = str || this[this.length-1];
        console.log('ending event after ' + str );
      },
      error : function onError(str){
        throw new Error(str);
      },
      log : function onLog(str){
        console.log(str);
      }
    }
  }
]

exports = module.exports = inst;