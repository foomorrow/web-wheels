const EventEmitter = require('..')

describe('EventEmitter', () => {
  it('should execute callbacks when emit registered event', () => {
    var fn1 = jest.fn()
    var fn2 = jest.fn()
    var emitter = new EventEmitter()
    emitter.on('a', fn1)
    emitter.on('a', fn2)
    emitter.emit('a')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
  })
  it('should execute callback 3 times when emit registered event 3 times', () => {
    var fn = jest.fn()
    var emitter = new EventEmitter()
    emitter.on('a', fn)
    emitter.emit('a')
    emitter.emit('a')
    emitter.emit('a')
    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('should execute callback with args when emit registered event with args', () => {
    var fn = jest.fn()
    var arg1 = {o:1}
    var arg2 = 2
    var emitter = new EventEmitter()
    emitter.on('a', fn)
    emitter.emit('a', arg1, arg2)
    expect(fn).toHaveBeenLastCalledWith(arg1, arg2)
    emitter.emit('a', arg1)
    expect(fn).toHaveBeenLastCalledWith(arg1)
  })
  it('should not execute callback when off', () => {
    var fn = jest.fn()
    var emitter = new EventEmitter()
    emitter.on('a', fn)
    emitter.emit('a')
    emitter.off('a', fn)
    emitter.emit('a')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
