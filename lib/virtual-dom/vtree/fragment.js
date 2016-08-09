import { VElement } from '../element'
import { NativeNode } from './native'
export class FragmentNode extends NativeNode {
  constructor(element: [VElement]){
    super(element)
    this._currentElement = element
  }
  getNativeNode(){
    return this._rendered.map((child) => {
      return child._instance
    })
  }
  mount(parent, context){
    this._parent = parent
    this._context = context
    this.mountChildren(parent, context)
  }
  receive(nextElement, nextContext){
    this._currentElement = nextElement
    this.receiveChildren(this._currentElement.children, nextContext);
  }
  unmount(){
    this.unmountChildren()
  }
}