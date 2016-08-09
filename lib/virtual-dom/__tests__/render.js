import { h } from '../h'
import { Component } from '../element'
import { render } from '../render'
import { inspect } from 'util'


describe('render()', () => {
  const vdom = (
    h('div', null, h('h1', null), h('p', null), h('ul', null, []))
  )
  const stateless = (
    h((props) => {
      return (
        h('p', null, 'stateless')
      )
    }, {})
  )

  it('should mount virtual dom to a real dom and update when state change', () => {
    class Child extends Component {
      render(){
        return null
      }
    }
    class Root extends Component {
      state = {
        foo: 'bar'
      }
      render(){
        return (
          h('div', null, 
            this.state.foo, 
            stateless, 
            h('div', null, 
              h(Child, null)
            )
          )
        )
      }
    }
    const component = (
      h(Root, null)
    )

    const parent = document.createElement('div')
    const rootComponent = render(component, parent)
    expect(parent.innerHTML).toBe('<div>bar<p>stateless</p><div><!-- --></div></div>')
    rootComponent._instance.setState({foo: 'baz'})
    expect(parent.innerHTML).toBe('<div>baz<p>stateless</p><div><!-- --></div></div>')
  })
})

// function pickKeys(vTree){
//   return {
//     id: vTree._id,
//     currentElement: vTree._currentElement ? (typeof vTree._currentElement.type === 'function' ? vTree._currentElement.type.name : vTree._currentElement.type) : null,
//     renderedElement: vTree._renderedElement.constructor.name,
//     instance: vTree._instance,
//     internalInstance: vTree._internalInstance ? pickKeys(vTree._internalInstance) : null,
//     childNodes: vTree._childNodes.map((c) => pickKeys(c))
//   }
// }