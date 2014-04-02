var assert = require('assert')
var template = require('../lib/template')
describe('Regex Based Template Engine', () => {
  var locals = {
    number: 42,
    string: 'Hello',
    truly: true,
    falsy: false,
    object: {a:1,b:{c:2}},
    array: [0,1,2],
    fn: function (v){ return v.toString() }
  }
  it('create render function with defaultSetting start with comment', () => {
    var renderer = template(
      '<%- comment head %>'+
      '<p class="c" \n><%=string%></p>'+
      '<ul>'+
        '<%array.forEach((item) => {%>'+
        '<li><%=item%></li>'+
        '<%})%>'+
      '</ul>'+
      '<%- comment foot%>'
    )
    assert.equal(renderer(locals), '<p class="c" \n>Hello</p><ul><li>0</li><li>1</li><li>2</li></ul>')
  })
  it('create render function with defaultSetting start with interpolate', () => {
    var renderer = template(
      '<%=string%>'+
      '<ul>'+
        '<%array.forEach((item) => {%>'+
        '<li><%=item%></li>'+
        '<%})%>'+
      '</ul>'+
      '<%- comment foot%>'
    )
    assert.equal(renderer(locals), 'Hello<ul><li>0</li><li>1</li><li>2</li></ul>')
  })
})