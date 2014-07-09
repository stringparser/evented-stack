var obsArray = require('./lib/EventedArray');
// > undefined
    obs = obsArray(1,2,3);
// > [ 1, 2, 3 ]

console.log('%s', obs.forEach)
// > function forEach() { [native code] }
// > undefined

exports = module.exports = que;
// > ReferenceError: que is not defined
// >     at repl:1:28
// >     at REPLServer.self.eval (repl.js:112:21)
// >     at repl.js:249:20
// >     at REPLServer.self.eval (repl.js:122:7)
// >     at Interface.<anonymous> (repl.js:239:12)
// >     at Interface.emit (events.js:95:17)
// >     at Interface._onLine (readline.js:202:10)
// >     at Interface._line (readline.js:531:8)
// >     at Interface._ttyWrite (readline.js:767:16)
// >     at ReadStream.onkeypress (readline.js:99:10)
