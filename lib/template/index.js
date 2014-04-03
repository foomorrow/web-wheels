var escapeRegex = /[\n\r\u2028\u2029\\"]/g
var escapeMapping = {
  '\\': '\\',
  "\"": "\"",
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
}
function escapeReplace(c){
  return '\\'+ escapeMapping[c]
}
var defaultSettings = {
  escape: ['{-', '-}'],
  evaluate: ['{%', '%}'],
  interpolate: ['{{', '}}']
}

function createTemplate(str, settings){
  var codes = '([\\s\\S+]+?)'
  var delimiters = new RegExp(
    settings.escape.join(codes) + '|' +
    settings.interpolate.join(codes) + '|' +
    settings.evaluate.join(codes) + '|'+
    '$', 
    'g'
  )
  var body = ''
  var index = 0
  str
    .replace(delimiters, function(match, escapeValue, interpolateValue, evaluateValue, offset){
      body += str.slice(index, offset).replace(escapeRegex, escapeReplace)

      if(interpolateValue){
        body += '" + ' + interpolateValue + ' + "'
      }
      if(evaluateValue){
        body += '";\n' + evaluateValue + '\n__r += "'
      }
      
      index = offset + match.length

      return match
    })
  body = '__r +="' + body + '";\n'
  body = '__r = "";\nwith(__v){'+ body + '};return __r;'
  return new Function('__v', body)
}



module.exports = function template(settings, str, ...data){
  var localSettings
  if(typeof arguments[0] === 'string'){
    localSettings = defaultSettings
    str = arguments[0]
    if(arguments.length === 1){
      return createTemplate(str, localSettings)
    }else{
      return createTemplate(str, localSettings)(Object.assign.apply(Object, [].slice.call(arguments, 1)))
    }
  }else{
    localSettings = Object.assign({}, defaultSettings, settings)
    if(arguments.length === 2){
      return createTemplate(str, localSettings)
    }else{
      return createTemplate(str, localSettings)(Object.assign.apply(Object, [].slice.call(arguments, 1)))
    }
  }
}