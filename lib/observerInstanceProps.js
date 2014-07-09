/*
 * proto for the `Queue` constructor
 * will be added using Obect.defineProperty
 * to make them not enumerable
 */

var inst = [
  { key : 'break', value : false },
  { key : 'continue', value : false },
  { key : 'silent', value : false },
  { key : '_state', value : {} },
  {
    key : '_events', value : {
      /*start : function onStart(str){

        str = str || this[0];
        console.log('start: ' + str )
      },
      next : function onNext(str){

        console.log('next: ' + str)
      },
      end : function onEnd(str){

        str = str || this[this.length-1];
        console.log('end: ' + str );
      },
      error : function onError(str){
        throw new Error(str);
      },
      log : function onLog(str){

        if(this[str])
          console.log('%s ', this[str]);
        else if(str)
          console.log(str);
        else
          console.log('');
      }*/
    }
  }
]

exports = module.exports = inst;