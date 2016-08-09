import { VElement, Component } from '../element'
import { Updater } from '../updater'
import { instantiate } from '../instantiate'
export class CompositeNode {
  constructor(element: VElement){
    this._currentElement = element
    this._parent = null
    this._context = null
    this._instance = null
    this._rendered = null
    this._pendingUpdate = false
    this._pendingStates = []
    this._callbacks = []
  }
  _processState(){
    let state = this._instance.state
    while (this._pendingStates.length){
      state = Object.assign({}, state, this._pendingStates.shift())
    }
    return state
  }
  _runCallbacks(){
    while(this._callbacks.length){
      let cb = this._callbacks.shift()
      cb()
    }
  }
  getNativeNode(){
    return this._rendered._instance
  }
  mount(parent, context){
    this._parent = parent
    const props = Object.assign({}, this._currentElement.type.defaultProps, this._currentElement.props, {
      children: this._currentElement.children
    })
    const Ctor = this._currentElement.type
    const updater = new Updater(this)
    this._instance = new Ctor(props, context, updater)
    this._instance.updater = updater

    if(this._instance.componentWillMount){
      this._instance.componentWillMount()
    }
    this._instance.state = this._processState()
    this._rendered = instantiate(this._instance.render())
    const element = this._rendered.mount(parent, context)
    if(this._instance && this._instance.componentDidMount){
      this._instance.componentDidMount()
    }
    return element
  }
  receive(nextElement, nextContext){
    this._pendingUpdate = true
    let prevElement = this._currentElement
    if(this._instance.componentWillReceiveProps){
      this._instance.componentWillReceiveProps(nextElement.props, prevElement.props)
    }
    let shouldUpdate = true
    let nextState = this._processState()
    if(this._instance.shouldComponentUpdate){
      shouldUpdate = this._instance.shouldComponentUpdate(nextState, this._instance.state)
    }
    if(shouldUpdate){
      if(this._instance.componentWillUpdate){
        this._instance.componentWillUpdate(nextElement.props, nextState)
      }
    }
    this._currentElement = nextElement
    this._context = nextContext
    this._instance.props = nextElement.props
    this._instance.state = nextState
    this._instance.context = nextContext

    if(shouldUpdate){
      this._rendered.receive(this._instance.render(), this._instance.context)
      if(this._instance.componentDidUpdate){
        this._instance.componentDidUpdate()
      }
    }
    this._pendingUpdate = false
    this._runCallbacks()
  }
  unmount(){
    if(this._instance.componentWillUnmount){
      this._instance.componentWillUnmount()
    }
    this._rendered.unmount()
  }

}