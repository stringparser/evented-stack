var stack = new require('./lib/EventedArray')(1,2,3)

stack.forEach(function(el){
  console.log(el)
})

exports = module.exports = stack;
