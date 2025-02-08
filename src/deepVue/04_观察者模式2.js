// proxy
const obj = {
  a: 1, 
  b: 2
}

const ob = observer(obj)

function observer(target) {
  // el
  const el = document.querySelector('#app')
  // 代理
  const proxy = new Proxy(target, { 
    get(target, prop){
      return Reflect.get(target[prop])
    },
    set(target, prop, value) {
      Reflect.set(target, prop, value)
      render()
    }
  })
  render()
  // render
  function render() {
    console.log(target)
    let html = ''
    for(let prop of Object.keys(target)) {
      html += `<p>${prop}: ${target[prop]}</p>`
    }
    el.innerHTML = html
  }

  return proxy
}