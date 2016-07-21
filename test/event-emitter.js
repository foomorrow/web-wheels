var assert = require('assert')
var eventEmitterMixin = require('../lib/event-emitter')
var createSpyFn = require('./spy')
describe('event emitter mixin', function(){
  it('should call all spy when emit and not call other event callback', function(){
    var obj = {}
    eventEmitterMixin.call(obj)
    var spy1 = createSpyFn()
    var spy2 = createSpyFn()
    var spy3 = createSpyFn()
    obj.on('e1', spy1)
    obj.on('e1', spy2)
    obj.on('e2', spy3)
    obj.emit('e1')
    assert.ok(spy1.isCalled())
    assert.ok(spy2.isCalled())
    assert.ok(spy3.isNotCalled())
  })
  it('should not call spy when spy has been offed', function(){
    var obj = {}
    eventEmitterMixin.call(obj)
    var spy1 = createSpyFn()
    obj.on('e1', spy1)
    obj.off('e1', spy1)
    obj.emit('e1')
    assert.ok(spy1.isNotCalled())
  })
  it('should call spy with args', function(){
    var obj = {}
    eventEmitterMixin.call(obj)
    var spy1 = createSpyFn()
    obj.on('e1', spy1)
    obj.emit('e1', 1, 2, 3)
    assert.ok(spy1.isCalledWith(1, 2, 3))
  })
})