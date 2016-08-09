export class EmptyNode {
  constructor(){
    this._currentElement = null
  }
  getNativeNode(){
    return this._instance
  }
  mount(parent, context, reuse){
    this._parent = parent
    this._context = context
    this._instance = document.createComment(' ')
    parent.appendChild(this._instance)
    return this._instance
  }
  receive(nextElement, nextContext){
    // noop
  }
  unmount(){
    this._parent.removeChild(this._instance)
  }
}