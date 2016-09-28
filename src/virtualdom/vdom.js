function VNode(tag, props, children){
  this.tag = tag
  this.props = props
  this.children = children
  const { key } = props
}
function VComponent(props, context){

}
function createElement(tag, props, ...children){
  if(typeof tag === 'function'){
    return new tag(Object.assign({}, props, { children }))
  }else{
    return new VNode(tag, props, children)
  }
}
Object.assign(VComponent.prototype, {
  setState(){

  },
  replaceState(){

  },
  forceUpdate(){

  },
  componentWillMount(){

  },
  componentDidMount(){

  },
  render(){
    throw new Error('must impl')
  }
})
export {
  VNode,
  VComponent,
  createElement
}
