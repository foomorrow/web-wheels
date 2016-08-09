import { h } from '../h'
import { VElement } from '../element'

function createVNode(type, props = null, children = []){
  return {
    type,
    children,
    props,
    key: props && props.key,
    ref: props && props.ref
  }
}

describe('hyperscript', () => {
  it('should return a VNode', () => {
    let r = h('foo')
    expect(typeof r).toBe('object')
    expect(r instanceof VElement).toBeTruthy()
    expect(r).toHaveProperty('type', 'foo')
    expect(r).toHaveProperty('attributes', undefined)
    expect(r).toHaveProperty('children', [])
  })
  it('should perserve raw attributes', () => {
    let attrs = { foo: 'bar', baz: 10, fun(){} }
    let r = h('foo', attrs)
    expect(typeof r).toBe('object')
    expect(r).toHaveProperty('props', attrs)
  })
  // it('should support element children', () => {
  //   let r = h(
  //     'foo',
  //     null,
  //     h('bar'),
  //     h('baz')
  //   )

  //   expect(typeof r).toBe('object')
  //   expect(r).toHaveProperty('children', [
  //     createVNode('bar'),
  //     createVNode('baz')
  //   ])
  // })
  // it('should support multiple element children, given as arg list', () => {
  //   let r = h(
  //     'foo',
  //     null,
  //     h('bar'),
  //     h(
  //       'baz', 
  //       null, 
  //       h('child')
  //     )
  //   )
  //   expect(typeof r).toBe('object')
  //   expect(r).toHaveProperty('children', [
  //     createVNode('bar'),
  //     createVNode('baz', undefined, [
  //       createVNode('child')
  //     ])
  //   ])
  // })
  // it('should handle multiple element children, given as an array', () => {
  //   let r = h(
  //     'foo',
  //     null,
  //     h('bar'),
  //     [
  //       h('child0', null, h('test')),
  //       h('child1', null, h('test'))
  //     ]
  //   )
  //   expect(typeof r).toBe('object')
  //   expect(r).toHaveProperty('children', [
  //     createVNode('bar'),
  //     createVNode('child0', undefined, [
  //       createVNode('test')
  //     ]),
  //     createVNode('child1', undefined, [
  //       createVNode('test')
  //     ])
  //   ])
  // })
  // it('should handle multiple children, flattening one layer as needed', () => {
  //   let r = h(
  //     'foo',
  //     null,
  //     h('bar'),
  //     [
  //       h('baz', null, h('test'))
  //     ]
  //   )

  //   expect(typeof r).toBe('object')
  //   expect(r).toHaveProperty('children', [
  //     createVNode('bar'),
  //     createVNode('baz', undefined, [
  //       createVNode('test')
  //     ])
  //   ])
  // })
  // it('should support nested children', () => {
  //   const m = x => h(x)

  //   expect(
  //     h('foo', null, m('a'), [ m('b'), m('c'), m('d') ])
  //   ).toHaveProperty('children', ['a', 'b', 'c', 'd'].map(m))

  //   expect(
  //     h('foo', null, [ m('a'), m('b'), m('c'), m('d') ])
  //   ).toHaveProperty('children', ['a', 'b', 'c', 'd'].map(m))

  //   expect(
  //     h('foo', { children: [ m('a'), [ m('b'), m('c'), m('d') ]] })
  //   ).toHaveProperty('children', ['a', 'b', 'c', 'd'].map(m))

  //   expect(
  //     h('foo', { children: [[ m('a'), [ m('b'), m('c') ], m('d') ]] })
  //   ).toHaveProperty('children', ['a', 'b', 'c', 'd'].map(m))

  //   expect(
  //     h('foo', { children: m('a') })
  //   ).toHaveProperty('children', [m('a')])

  //   expect(
  //     h('foo', { children: 'a' })
  //   ).toHaveProperty('children', ['a'])

  // })
  // it('should support text children', () => {
  //   let r = h(
  //     'foo',
  //     null,
  //     'textstuff'
  //   )
  //   expect(typeof r).toBe('object')
  //   expect(r).toHaveProperty('children', ['textstuff'])
  // })
  // it('should merge adjacent text children', () => {
  //   let r = h(
  //     'foo',
  //     null,
  //     'one',
  //     'two',
  //     h('bar'),
  //     'three',
  //     h('baz'),
  //     h('baz'),
  //     'four',
  //     null,
  //     'five',
  //     'six'
  //   )
  //   expect(typeof r).toBe('object')
  //   expect(r).toHaveProperty('children', [
  //     'onetwo',
  //     createVNode('bar'),
  //     'three',
  //     createVNode('baz'),
  //     createVNode('baz'),
  //     'fourfivesix'
  //   ])
  // })
})

