const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

function Promise(resolver){
  var _state = PENDING
    , _data
    , _queue = [];
  function resolve(value){
    if(_state !== PENDING){
      return ;
    }
    var then, isCalled = false
    if(value && (typeof value === 'object' || typeof value === 'function')){
      try{
        then = value.then
        if(typeof then === 'function'){
          then.call(value, (v) => {
            isCalled || resolve(v)
            isCalled = true
          }, (r) => {
            isCalled || reject(r)
            isCalled = true
          })
          return ;
        }
      }catch(e){
        isCalled || reject(e)
        return ;
      }
    }
    _state = FULFILLED
    _data = value
    while (_queue.length) {
      _queue.shift()()
    }
  }
  function reject(reason){
    if(_state !== PENDING){
      return ;
    }
    _state = REJECTED
    _data = reason
    while (_queue.length) {
      _queue.shift()()
    }
  }
  try{
    resolver(resolve, reject)
  }catch(e){
    reject(e)
  }
  this.invoke = function invoke(fulfill, reject){
    switch (_state) {
      case FULFILLED:
        process.nextTick(() => fulfill(_data))
        break;
      case REJECTED:
        process.nextTick(() => reject(_data))
        break;
      default:
        _queue.push(() => invoke(fulfill, reject))
    }
  }
}

Promise.prototype.then = function then(onFulfilled, onRejected){
  var resolve, reject
  var promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  this.invoke((value) => {
    try{
      if(typeof onFulfilled === "function"){
        var ret = onFulfilled(value)
        if(ret === promise){
          throw new TypeError
        }
        resolve(ret)
      }else{
        resolve(value)
      }
    }catch(e){
      reject(e)
    }
  }, (reason) => {
    try {
      if(typeof onRejected === "function"){
        var ret = onRejected(reason)
        if(ret === promise){
          throw new TypeError
        }
        resolve(ret)
      }else{
        reject(reason)
      }
    } catch (e) {
      reject(e)
    }
  })
  return promise
}
Promise.resolve = (value) => new Promise((resolve) => resolve(value))
Promise.reject = (reason) => new Promise((resolve, reject) => reject(reason))

module.exports = Promise
