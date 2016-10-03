const noop = () => {}
class Observable {
  static of(...items){
    return new Observable((observer) => {
      for (let value of items){
        observer.next(value)
      }
    })
  }
  static from(x){
    if(x === null || x === undefined) throw new TypeError()
    return new Observable((observer) => {
      for (let value of x){
        observer.next(value)
      }
    })
  }
  constructor(subscriber){
    if (typeof subscriber !== "function") {
      throw new TypeError("Observable initializer must be a function")
    }
    this._subscriber = subscriber
    this[[Symbol.observable]] = () => this
  }
  subscribe(observer, ...args){
    if (typeof observer === 'function') {
      let onNext = observer
        , onError = args[0]
        , onComplete = args[1]
      observer = new Observer(onNext, onError, onComplete)
    }
    return new Subscription(observer, this._subscriber)
  }
}
class Observer {
  constructor(onNext, onError, onComplete){
    this.onNext = onNext || noop
    this.onError = onError || noop
    this.onComplete = onComplete || noop
  }
  start(subscription){

  }
  next(value){
    this.onNext(value)
  }
  error(error){
    this.onError(error)
  }
  complete(result){
    this.onComplete(result)
  }
}
class Subscription {
  constructor(observer, subscriber){
    if (Object(observer) !== observer)
      throw new TypeError("Observer must be an object")
    if(observer.start){
      observer.start(this)
    }
    this._observer = observer
    let subscriptionObserver = new SubscriptionObserver(this)
    try {
      let cleanup = subscriber(subscriptionObserver)
      if(cleanup !== null) {
        if( typeof cleanup.unsubscribe === 'function' ){
          cleanup = () => cleanup.unsubscribe()
        } else if (typeof cleanup !== 'function') {
          throw new TypeError(`${cleanup} is not a function`)
        }
        this._cleanup = cleanup
      }
    } catch (e) {
      subscriptionObserver.error(e)
      return ;
    }
    if(this._observer === undefined){
      this.unsubscribe()
    }
    this.constructor = {}
  }
  get closed(){
    return this._observer === undefined
  }
  unsubscribe(){
    if(this._observer === undefined){
      return ;
    }
    this._observer = undefined
    let { _cleanup } = this
    if(_cleanup === undefined){
      return ;
    }else{
      this._cleanup = undefined
      _cleanup()
    }
  }
}
class SubscriptionObserver {
  constructor(subscription){
    this._subscription = subscription
    this.constructor = {}
  }
  next(value){
    let { _subscription } = this
    if(_subscription.closed){
      return undefined
    }
    let { _observer } = _subscription
    try {
      if(typeof _observer.next === 'function'){
        _observer.next(value)
      }
    } catch(e) {
      this.error(e)
    }
    
  }
  error(error){
    let { _subscription } = this
    if(_subscription.closed){
      return undefined
    }
    let { _observer } = _subscription
    try {
      if(typeof _observer.error === 'function'){
        _observer.error(error)
      } else {
        // throw error
      }
    } catch(e) {
      this.error(e)
    }
  }
  complete(result){
    let { _subscription } = this
    if(_subscription.closed){
      return undefined
    }
    let { _observer } = _subscription
    try {
      if(typeof _observer.complete === 'function'){
        _observer.complete(result)
      }
    } catch(e) {
      this.error(e)
    }
    _subscription._observer = undefined
  }
  get closed(){
    return this._observer === undefined
  }
}

module.exports = Observable;