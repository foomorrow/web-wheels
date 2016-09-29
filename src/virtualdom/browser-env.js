

export function render(vTree, el){
  
}

export function createElement(tag, attrs, children){
  const el = document.createElement(tag)
  // TODO set attrs
  children.forEach((child) => {
    el.appendChild(child)
  })
  return el
}
export function removeChild(el){
  el.parentNode.removeChild(el)
}
export function replaceElement(el, newTag){

}
export function updateAttrs(el, newAttrs){

}
