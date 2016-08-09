export class TextNode {
  constructor(content){
    this._currentElement = String(content)
  }
  getNativeNode(){
    return this._instance
  }
  mount(parent, context, reuse){
    this._parent = parent
    this._context = context
    this._instance = document.createTextNode(this._currentElement)
    parent.appendChild(this._instance)
    return this._instance
  }
  unmount(){
    this._parent.removeChild(this._instance)
  }
  receive(nextElement, nextContext){
    nextElement = String(nextElement)
    this._context = nextContext
    if (this._currentElement !== nextElement) {
      this._currentElement = nextElement
      this._instance.textContent = nextElement
    }
  }
}