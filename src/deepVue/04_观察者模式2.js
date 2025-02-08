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


// proxy 验证参数
function sum (a, b) {
  return a+b;
}
function validate(target, ...types) {
  const proxy = new Proxy(target, {
    apply(target, thisBinding, args) {
      types.forEach((type, index) => {
        if(typeof args[index] !== type ) {
          throw new TypeError(`第${index+1}参数 ${args[index]} 的类型应该为${type}`)
        }
      })
      return Reflect.apply(target, thisBinding, args)
    }
  })
  return proxy
}
// 高阶函数实现参数验证
function validate2(fn, ...types) {
  return (...args) => {
    types.forEach((type, index) => {
      if(typeof args[index] !== type) {
        throw new TypeError(`第${index+1}项参数 ${args[index]} 的类型应该为 ${type}`)
      }
    })
    return fn(...args)
  }
}


const sumProxy = validate2(sum, 'number', 'number')
console.log(sumProxy(1, 2))