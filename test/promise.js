const MyPromise = require('../lib/promise')
describe("Promises/A+ Tests", function () {
  require("promises-aplus-tests").mocha({
    resolved:(value) => MyPromise.resolve(value),
    rejected:(reason) => MyPromise.reject(reason),
    deferred:() => {
      var resolve, reject
      var promise = new MyPromise((res, rej) => {
        resolve = res
        reject = rej
      })
      return {
        promise,
        resolve,
        reject
      }
    }
  })
})