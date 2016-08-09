import { VElement } from '../element'
import { instantiate, shouldUpdateNode } from '../instantiate'


// function 

export class NativeNode {
  constructor(el: VElement){
    this._currentElement = el
    this._parent = null
    this._context = null
    this._nativeNode = null
    this._renderedChildren = {}
    this._childrenIndices = {}
  }
  getNativeNode(){
    return this._nativeNode
  }
  mount(parent, context){
    this._parent = parent
    this._context = context
    this._nativeNode = document.createElement(this._currentElement.type)
    this.mountProps(this._currentElement.props)
    this.mountChildren(this._currentElement.children)
    parent.appendChild(this._nativeNode)
    return this._nativeNode
  }
  receive(nextElement, nextContext){
    this._context = nextContext
    this.receiveProps(nextElement.props)
    this.receiveChildren(nextElement.children, nextContext)
  }
  unmount(){
    this.unmountProps()
    this._parent.removeChild(this._instance)
    this.unmountChildren()
  }

  mountProps(props){

  }
  receiveProps(nextProps){

  }
  unmountProps(){

  }
  mountChildren(children, context){
    return children.map((child, index) => {
      let renderedChild = instantiate(child)
      let name = child.key !== undefined ? child.key :  index 
      this._renderedChildren[name] = renderedChild
      this._childrenIndices[name] = index
      return renderedChild.mount(this._nativeNode, context)
    })
  }
  receiveChildren(nextChildren, nextContext){
    let prevChildren = this._renderedChildren
    let nextRenderedChildren = {}
    let nextPatches = nextChildren.map((nextElement, index) => {
      let name = nextElement.key !== undefined ? nextElement.key :  index 
      let prevChild = prevChildren[name]
      let prevElement = prevChild && prevChild._currentElement
      if(shouldUpdateNode(prevElement, nextElement)){
        prevChild.receive(nextElement, nextContext)
        nextRenderedChildren[name] = prevChild
      }else{
        if (prevChild) {
          prevChild.unmount()
          prevChildren[name] = null
        }
        nextRenderedChildren[name] = instantiate(nextElement)
      }
      return {
        node: nextRenderedChildren[name],
        prevIndex: this._childrenIndices[name] || null,
        nextIndex: index
      }
    })
    Object.keys(prevChildren).forEach((prevChild) => {
      if (prevChild !== null) {
        prevChild.unmount()
      }
    })
    nextPatches.forEach((patch) => {
      if (patch.prevIndex === null) {
        patch.node.mount(this._nativeNode, this._context)
      } else if (patch.prevIndex !== patch.nextIndex) {
        let lastChildNativeNode = nextPatches[patch.nextIndex - 1].node.getNativeNode().nextSilbing
        this._parent.insertBefore(patch.node.getNativeNode(), lastChildNativeNode)
      }
    })
    this._renderedChildren = nextRenderedChildren
  }
  unmountChildren(){
    Object.keys(this._renderedChildren).forEach((name) => {
      this._renderedChildren[name].unmount()
    })
    this._renderedChildren = {}
  }

}