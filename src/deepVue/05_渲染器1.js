// 渲染器的作用：虚拟DOM => 渲染器 => 真实DOM

// vnode结构
const vnode = {
  tag: 'div',
  props: {
    onClick: () => console.log('hello renderer')
  },
  children: 'click me'
}

// 渲染器
function renderer(vnode, container) {
  // 创建DOM
  const el = document.createElement(vnode.tag)
  // 处理props
  for(const key in vnode.props) {
    if(/^on/.test(key)) { 
      el.addEventListener(
        key.substring(2).toLowerCase(), // onClick => click
        vnode.props[key]
      )
    }
  }
  // children: 文本/数组
  if(typeof vnode.children === 'string') {
    const cnode= document.createTextNode(vnode.children)
    el.appendChild(cnode)
  } else if(Array.isArray(vnode.children)) {
    for(let child in vnode.children) {
      renderer(child, el)
    }
  }
  // 挂载DOM
  container.appendChild(el)
}

renderer(vnode, document.body)