// 组件就是一组DOM 的封装
const MyComponent = function() {
  return {
    tag: 'div',
    props: {
      onClick: () => console.log('hello component')
    },
    // children: 'click me'
    children: [
      {
        tag: 'h1',
        props: {
          onClick: () => console.log('hello h1')
        },
        children: 'click me'
      }
    ]
  }
}

const vnode = {
  tag: MyComponent
}

function renderer(vnode, container) {
  typeof vnode.tag === 'string' ? mountElement(vnode, container) : mountComponent(vnode, container) 
}

function mountElement(vnode,  container) {
  // 创建DOM
  const el = document.createElement(vnode.tag)
  // 处理props
  for(const key in vnode.props) {
    if(/^on/.test(key)) {
      const prop = key.substring(2).toLowerCase() // onClick => click
      console.log(prop)
      el.addEventListener(prop, vnode.props[key])
    }
  }
  // 处理children
  if(typeof vnode.children === 'string') {
    const cnode = document.createTextNode(vnode.children)
    el.appendChild(cnode)
  } else if(Array.isArray(vnode.children)) {
    for(const child of vnode.children) {
      renderer(child, el)
    }
  } 
  // 挂载DOM
  container.appendChild(el)
}

function mountComponent(vnode, container) {
  const subTree = vnode.tag()
  renderer(subTree, container)
}

renderer(vnode, document.body)