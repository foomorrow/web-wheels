var assert = require('assert')
var eventEmitterMixin = require('../lib/event-emitter')
var observe = require('../lib/observe')
var createSpyFn = require('./spy')

describe('observe', function(){
  it('should notify get', function(){
    var observer = eventEmitterMixin.call({})
    var spy = createSpyFn()
    observer.on('get:prop1', spy)
    var obj = observe.makeObjectObserve({
      prop1: 1
    })
    var a = obj.prop1
    assert(spy.isCalled())
  })
  it('should notify set', function(){
    var observer = eventEmitterMixin.call({})
    var spy = createSpyFn()
    observer.on('set:prop1', spy)
    var obj = observe.makeObjectObserve({
      prop1: 1
    })
    obj.prop1 = 2
    assert(spy.isCalled())
  })
})