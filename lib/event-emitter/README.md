Event Emitter Mixin
----

Usage:
```javascript
var obj = {}
var callback = function(value){
  console.log('change: ' + value)
}
eventEmitterMixin.call(obj)

obj.on('change', callback)
obj.emit('change', 1) // change: 1
obj.off('change', callback)
obj.emit('change', 1) // nothing happened

```