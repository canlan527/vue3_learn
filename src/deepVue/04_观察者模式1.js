// Object.defineProperty()

const obj = {
  a: 1,
  b: 2
}
const ob = observer(obj)

function observer(target) {
  // 获取html
  const el = document.querySelector('#app')
 
  // 代理对象
  const ob = {}

  // target props
  const props = Object.keys(target)
  
  // 遍历target对象，进行数据劫持
  for(const prop of props) {
    Object.defineProperty(ob, prop, {
      get() {
        return target[prop]
      },
      set(value) {
        target[prop] = value;
        // 触发更新
        render();
      },
      enumerable: true
    })
  }
  render()

  // render
  function render() {
    let html = ''
    console.log(ob)
    for(let prop of Object.keys(ob)) {
      html += `<p>${prop}: ${ob[prop]}</p>`
    }

    el.innerHTML = html;
  }
  return ob;
}

