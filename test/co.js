var assert = require('assert')
var co = require('../lib/co')
var createSpyFn = require('./spy')

describe('co', () => {
  function delayPromise(fn, timeout){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fn())
      }, timeout)
    })
  }
  it('should return latest value', () => {
    const actual = co(function * (){
      const a = yield delayPromise(() => 1, 1000)
      const b = yield delayPromise(() => 2, 1000)
      const c = yield delayPromise(() => 3, 1000)
      return [a,b,c]
    })
    expect(actual).resolves.toEqual([1, 2, 3])
  })
  it('should throw error', () => {
    const err = new Error()
    const fn = createSpyFn()
    const actual = co(function * (){
      const a = yield delayPromise(() => 1, 1000)
      const b = yield Promise.reject(err)
      fn()
      const c = yield delayPromise(() => 3, 1000)
      return [a,b,c]
    })
    assert(fn.isNotCalled())
    expect(actual).rejects.toBe(err)
  })
})