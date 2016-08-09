import { VElement, Component } from './element'

export function h(
  type: typeof Component | (props: {}, context: {}) => VElement | string, 
  props: {}, 
  ...children: [VElement]
){
  return new VElement(type, props, children)
}

