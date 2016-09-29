function VNode(tag, props, children){
  this.tag = tag
  this.props = props
  this.children = children
  const { key } = props
}
<<<<<<< HEAD
function Component(props, context){
=======
function VComponent(props, context){
>>>>>>> 9f94f10abb008b1f2e154105e29b7d5bb61e2f4a

}
function createElement(tag, props, ...children){
  if(typeof tag === 'function'){
<<<<<<< HEAD
    return new tag(Object.assign({}, props, { children }), context)
=======
    return new tag(Object.assign({}, props, { children }))
>>>>>>> 9f94f10abb008b1f2e154105e29b7d5bb61e2f4a
  }else{
    return new VNode(tag, props, children)
  }
}
Object.assign(VComponent.prototype, {
  setState(){

<<<<<<< HEAD
  }
  replaceState(){

  }
  forceUpdate(){

  }
  componentWillMount(){

  }
  componentDidMount(){

  }
=======
  },
  replaceState(){

  },
  forceUpdate(){

  },
  componentWillMount(){

  },
  componentDidMount(){

  },
>>>>>>> 9f94f10abb008b1f2e154105e29b7d5bb61e2f4a
  render(){
    throw new Error('must impl')
  }
})
export {
  VNode,
  VComponent,
  createElement
}
