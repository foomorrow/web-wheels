
function EventEmitter(){
  this._events = {}
}

Object.assign(EventEmitter.prototype, {
  on(eventName, callback){
    if(!this._events[eventName]){
      this._events[eventName] = [callback]
    }else{
      this._events[eventName].push(callback)
    }
  },
  off(eventName, callback){
    this._events[eventName] =
      this._events[eventName]
        .filter((cb) => cb !== callback)
  },
  emit(eventName, ...args){
    if(this._events[eventName]){
      this._events[eventName].forEach((cb) => {
        cb.apply(null, args)
      })
    }
  }
})

module.exports = EventEmitter
