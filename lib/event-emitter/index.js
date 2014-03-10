var slice = Array.prototype.slice

function eventEmitterMixin(){
  var self = this
  var _events = {} // private
  this.on = function on(eventName, callback){
    var callbacks = (_events[eventName] || []).slice(0)
    callbacks.push(callback)
    _events[eventName] = callbacks
  }
  this.off = function off(eventName, callback){
    _events[eventName] = (_events[eventName] || []).filter(function(cb){
      return cb !== callback
    })
  }
  this.emit = function emit(eventName){
    var args = slice.call(arguments, 1)
    var callbacks = (_events[eventName] || []).slice(0)
    while(callbacks.length){
      callbacks.shift().apply(self, args)
    }
  }
}

module.exports = eventEmitterMixin