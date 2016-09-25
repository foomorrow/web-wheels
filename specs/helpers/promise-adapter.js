const Promise = require('../../src/promise')

module.exports = {
  deferred(){
    var resolve = null
    var reject = null
    var promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return {
      promise, resolve, reject
    }
  }
}
