var slice = Array.prototype.slice
function createSpyFn(impl){
  var impl = impl || function(){}
  var calls = []
  var fn = function(){
    var args = slice.call(arguments, 0)
    calls.push({
      args: args
    })
    return impl.apply(this, args)
  }
  fn.isCalled = function(){
    return calls.length > 0
  }
  fn.isNotCalled = function(){
    return calls.length === 0
  }
  fn.isCalledWith = function(){
    var args = slice.call(arguments, 0)
    var lastCall = calls[calls.length - 1]
    return args.every(function(arg, i){
      return lastCall && lastCall.args[i] === arg
    })
  }
  fn.isCalledTimes = function(count){
    return count === calls.length
  }
  fn.reset = function(){
    return calls.splice(0, calls.length)
  }
  return fn
}
module.exports = createSpyFn