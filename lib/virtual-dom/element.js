export class VElement {
  constructor(type, props, children){
    this.type = type
    this.props = props
    this.children = children
    this.key = (props && props.key) || null
    this.ref = props && props.ref
  }
}

export class Component {
  constructor(props, context, updater){
    this.props = props
    this.context = context
    this.refs = {}
    this.updater = updater
  }
  setState(partialState, callback){
    let nextState 
    if (typeof partialState === 'function') {
      nextState = partialState(this.state)
    } else {
      nextState = Object.assign({}, this.state, partialState)
    }
    this.updater.enqueueUpdate(nextState, callback)
  }
  replaceState(nextState, callback){
    this.updater.enqueueUpdate(nextState, callback)
  }
  forceUpdate(){
    this.updater.enqueueUpdate(this.state)
  }
}

export function cloneElement(vNode: VElement, props: {}): VElement {
  // TODO 
}
