import { VElement } from '../element'
import { instantiate, shouldUpdateNode } from '../instantiate'

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
  receive(nextChild, nextContext){
    this._context = nextContext
    this.receiveProps(nextChild.props)
    this.receiveChildren(nextChild.children, nextContext)
  }
  unmount(){
    this.unmountProps()

    this._parent.removeChild(this._nativeNode)
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
      let name = key(child, index)
      this._renderedChildren[name] = renderedChild
      this._childrenIndices[name] = index
      return renderedChild.mount(this._nativeNode, context)
    })
  }
  receiveChildren(nextChildren, nextContext){
    let prevChildren = this._renderedChildren
    let nextRenderedChildren = {}
    let nextPatches = nextChildren.map((nextChild, index) => {
      let name = key(nextChild, index)
      let prevChild = prevChildren[name]
      let prevElement = prevChild && prevChild._currentElement
      if(shouldUpdateNode(prevElement, nextChild)){
        prevChild.receive(nextChild, nextContext)
        nextRenderedChildren[name] = prevChild
      }else{
        if (prevChild) {
          prevChild.unmount()
          prevChildren[name] = null
        }
        nextRenderedChildren[name] = instantiate(nextChild)
      }
      return {
        node: nextRenderedChildren[name],
        prevIndex: this._childrenIndices.hasOwnProperty(name) ? this._childrenIndices[name] : null,
        nextIndex: index
      }
    })
    nextPatches.forEach((patch) => {
      if (patch.prevIndex === null) {
        patch.node.mount(this._nativeNode, this._context)
      } else if (patch.prevIndex !== patch.nextIndex) {
        let lastChildIndex = patch.nextIndex - 1
        if(lastChildIndex >= 0){
          let lastChildNativeNode = nextPatches[lastChildIndex].node.getNativeNode().nextSilbing
          this._parent.insertBefore(patch.node.getNativeNode(), lastChildNativeNode)
        }else {
          let lastChildNativeNode = nextPatches[lastChildIndex].node.getNativeNode()
          this._parent.insertBefore(patch.node.getNativeNode(), lastChildNativeNode)
        }
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



function diffChildren(prevElements, renderedChildren, nextElements){
  let nextChildren = {}
  nextElements.forEach((nextChild) => {
    const name = key(nextChild)
    if(prevElements[name]){
      const prevChild = prevElements[name]
      if(prevChild === nextChild){

      }
    }else{

    }
  })
}

function key(el: VElement, index){
  return String(el.key && (el.key !== undefined || el.key !== null) ? el.key : index)
}

// function reorder(){
//   let lastIndex = 0
//   let nextIndex = 0
//   for(let i = lastIndex; i < )
// }