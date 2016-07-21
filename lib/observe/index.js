function makeObjectObserve(obj, observer){
  var observed = {}
  var properties = {}
  var internalObj = {}
  Object.keys(obj).forEach(function(key){
    internalObj[key] = value
    properties[key] = {
      set: function(newValue){
        internalObj[key] = newValue
      },
      get: function(){
        return internalObj[key]
      }
    }
  })
  
  Object.defineProperties(observed, properties)
  return observed
}

function makeArrayObserve(array, observer){
  var observed = []
}

exports.makeObjectObserve = makeObjectObserve
exports.makeArrayObserve = makeArrayObserve