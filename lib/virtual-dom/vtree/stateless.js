import { VElement, Component } from '../element'
import { instantiate } from '../instantiate'


export class StatelessNode {
  constructor(el: VElement){
    this._currentElement = el
  }
  getNativeNode(){
    return this._rendered._instance
  }
  mount(parent, context){
    const nextProps = Object.assign({}, this._currentElement.type.defaultProps, this._currentElement.props)
    const render = this._currentElement.type
    this._rendered = new instantiate(render(nextProps, context))
    this._rendered.mount(parent, context)
    return this._rendered
  }
  receive(nextElement, nextContext){
    const render = this._currentElement.type
    const nextRendered = render(nextElement.props, nextContext)
    this._rendered.receive(nextRendered, nextContext)
  }
  unmount(){
    if(this._currentElement.type.componentWillUnmount){
      this._currentElement.type.componentWillUnmount()
    }
    this._rendered.unmount()
  }
}