function co(genCtor, args){
  return new Promise((resolve, reject) => {
    const gen = genCtor.apply(this, args)

    onFulfilled()

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
    function next(ret) {
      if (ret.done) return resolve(ret.value);
      return Promise.resolve(ret.value).then(onFulfilled, onRejected);
    }
  })
}

function wrap(genCtor){
  return (...args) => {
    return co(genCtor, args)
  }
}
function isPromise(obj){
  return typeof obj.then === 'function' 
}
co.wrap = wrap
module.exports = co