module.exports = Promise

var PENDING = 0
var FULFILLED = 1
var REJECTED = 2

var nextTick = process ? process.nextTick.bind(process) : setTimeout 


function Promise(executor){
  var state = PENDING
  var value = undefined
  var handlers = []
  this.__handle = function __handle(doFulfilled, doRejected, resolve, reject){
    if(state === PENDING){
      handlers.push(function(){
        __handle(doFulfilled, doRejected, resolve, reject)
      })
      return ;
    }else{
      var invoke = state === FULFILLED ? doFulfilled : doRejected
      nextTick(function(){
        try {
          invoke(value)
        } catch (ex) {
          reject(ex)
        }
      })
    }
  }
  function resolve(result){
    if(state !== PENDING){
      return ;
    }
    state = FULFILLED
    value = result
    while (handlers.length) {
      handlers.shift()()
    }
  }
  function reject(reason){
    if(state !== PENDING){
      return ;
    }
    state = REJECTED
    value = reason
    while (handlers.length) {
      handlers.shift()()
    }
  }
  try {
    executor(resolve, reject)
  }catch(ex){
    reject(ex)
  }
}

Object.assign(Promise.prototype, {
  then: function (onFulfilled, onRejected){
    var __handle = this.__handle
    var promise = new Promise(function(resolve, reject){
      __handle(function(result){
        if(typeof onFulfilled === "function"){
          var ret = onFulfilled(result)
          if(ret === promise){
            throw new TypeError
          }
          resolve(ret)
        }else{
          resolve(result)
        }
      }, function(reason){
        if(typeof onRejected === "function"){
          var ret = onRejected(reason)
          if(ret === promise){
            throw new TypeError
          }
          resolve(ret)
        }else{
          reject(reason)
        }
      }, resolve, reject)
    })
    return promise
  }
})

Object.assign(Promise, {
  isPromise(value){
    return typeof value.then === 'function'
  },
  resolve(value){
    return new Promise(function(resolve, reject){
      resolve(value)
    })
  },
  reject(error){
    return new Promise(function(resolve, reject){
      reject(error)
    })
  }
})