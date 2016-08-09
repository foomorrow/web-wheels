import { VElement, Component } from './element'
import { EmptyNode } from './vtree/empty'
import { FragmentNode } from './vtree/fragment'
import { NativeNode } from './vtree/native'
import { TextNode } from './vtree/text'
import { CompositeNode } from './vtree/composite'
import { StatelessNode } from './vtree/stateless'


export function instantiate(el: VElement){
  if (el === undefined || el === null || typeof el === 'boolean'){
    return new EmptyNode()
  } else if (Array.isArray(el)) {
    return new FragmentNode(el)
  } else if (typeof el === 'string' || typeof el === 'number') {
    return new TextNode(el)
  } else if (el instanceof VElement) {
    if (typeof el.type === 'string' ) {
      return new NativeNode(el)
    } else if (typeof el.type === 'function') {
      if (el.type.prototype instanceof Component) {
        return new CompositeNode(el)
      } else {
        return new StatelessNode(el)
      }
    } else {
      throw new TypeError(`Invalid element type: ${el}`)
    }
  } else {
    throw new TypeError(`Invalid element type: ${el}`)
  }
}

export function shouldUpdateNode(prevElement: VElement, nextElement: VElement){
  if( prevElement === undefined || prevElement === null || typeof prevElement === 'boolean') {
    return nextElement === undefined || nextElement === null || typeof nextElement === 'boolean'
  } else if (Array.isArray(prevElement)) {
    return Array.isArray(nextElement)
  } else if (typeof prevElement === 'string' || typeof prevElement === 'number') {
    return typeof nextElement === 'string' || typeof nextElement === 'number'
  } else if (prevElement instanceof VElement) {
    // TODO vElement.key
    return nextElement instanceof VElement && prevElement.type === nextElement.type
  } else {
    return true
  }
}