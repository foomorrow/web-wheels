Template
----
Usage:
```javascript
var render = template(
  '<h1>{{title}}</h1>' +
  '{% if(description){ %}' +
  '<p>{{description}}</p>' +
  '{% } %}' + 
  '<ul>' + 
  '{% items.forEach(function(item){%}' +
    '<li>{{item.name}}</li>'
  '{% }) %}'
  '</ul>'
)
var html = render({
  title: 'Title',
  items: [{name: 'Tom'}, {name: 'Jerry'}]
})

html // <h1>Title</h1><ul><li>Tom</li><li>Jerry</li></ul>
```