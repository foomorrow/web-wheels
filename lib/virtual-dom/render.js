import { VNode, Component } from './element'
import { CompositeNode } from './vtree/composite'
import { instantiate } from './instantiate'

export function render(vNode: VNode, container: HTMLElement, callback: ?Function): Component {
  const initialContext = {}
  const rootNode = instantiate(vNode)
  const domNode = rootNode.mount(container, initialContext)
  return rootNode
}