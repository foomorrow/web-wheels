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
    if(!nested(result)){
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
  function nested(result){
    if(result && (typeof result === 'object' || typeof result === 'function')){
      var isCalled = false
      try{
        var then = result.then 
        if(typeof then === 'function'){
          then.call(result, function(v){
            if(isCalled === false){
              resolve(v)
            }
            isCalled = true
          }, function(r){
            if(isCalled === false){
              reject(r)
            }
            isCalled = true
          })
          return ;
        }
      }catch(ex){
        if(isCalled === false){
          reject(ex)
        } 
        return ;
      }
    }
    return true;
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
  },
  race(promises){
    return new Promise(function(resolve, reject){
      promises.forEach(function(promise){
        promise.then(function(result){
          resolve(result)
        }, function(reason){
          reject(reason)
        })
      })
    })
  },
  all(promises){
    return new Promise(function(resolve, reject){
      var doneNumber = promise.length
      var results = new Array(promise.length)
      promises.forEach(function(promise, i){
        promise.then(function(result){
          results[i] = result
          doneNumber --
          if(doneNumber === 0){
            resolve(results)
          }
        }, function(reason){
          reject(reason)
        })
      })
    })
  }
})