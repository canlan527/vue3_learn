// mini版的ref和reactive实现
function isObject(val) {
  return (typeof val === 'object') && val !== null
}

class RefImpl{
  constructor(value) {
    // 简单判断value是否是对象
    this._value = isObject(value) ? reactive(value) : value
  } 

  get value() {
    console.log('拦截到了 value 的 get 操作')
    return this._value
  }

  set value(val) {
    console.log('拦截到了 value 的 set 操作')
    this._value = val
  }
}

// 深层代理
function deepProxy(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log(`拦截到了 ${key} 属性的 get 操作`)
      if(isObject(target[key])) {
        return deepProxy(target[key])
      }
      return target[key];
    },
    set(target, key, value) {
      console.log(`拦截到了 ${key} 属性的 set 操作`)
      if(isObject(target[key])) {
        return deepProxy(target[key])
      }
      target[key] = value;
      return true;
    },
    deleteProperty(target, key) {
      console.log(`拦截到了 ${key} 属性的 delete 操作`)
      delete target[key]
      return true
    }
  })
}

function reactive(obj) {
  // 进行代理
  return deepProxy(obj)
}

function ref(value) {
  return new RefImpl(value)
}


// 测试
// let state = ref(1)
// state // 不会拦截
// console.log(state) // 不会拦截
// console.log(state.value) // 拦截到了 value 的 get 操作
// console.log(state.a) // 不会拦截， a为undefined
// state.a = 3 // 不会拦截
// state.value = 3 // 拦截到了 value 的 set 操作
// delete state.value // 不会拦截，因为等价于Object.defineProperty,只能对特定属性的读取和设置操作进行拦截，
// state = 3 // 不会拦截

// let state = ref({a: 1})
// state // 不会拦截
// console.log(state) // 不会拦截
// console.log(state.value) // 拦截到了 value 的 get 操作
// console.log(state.a) // 不会拦截
// console.log(state.value.a) 
// 拦截到了 value 的 get 操作
// 拦截到了 a 属性的 get 操作
// state.a = 3 // 不会拦截
// state.value.a = 3 
// 拦截到了 value 的 get 操作
// 拦截到了 a 属性的 set 操作
// delete state.value.a
// 拦截到了 value 的 get 操作
// 拦截到了 a 属性的 delete 操作
// state.value = 3 // 拦截到了 value 的 set 操作
// delete state.value // 不会拦截，因为state.value不属于proxy代理对象的成员
// state = 3 // 不会拦截

// let state = reactive({})
// state // 不会拦截
// console.log(state) // 不会拦截
// console.log(state.a) // 拦截到了 a 属性的 get 操作
// state.a = 3 // 拦截到了 a 属性的 set 操作
// state.a = {
//   b: {
//     c: 3
//   }
// }
// 拦截到了 a 属性的 set 操作
// console.log(state.a.b.c)
// 拦截到了 a 属性的 get 操作
// 拦截到了 b 属性的 get 操作
// 拦截到了 c 属性的 get 操作
// delete state.a.b
// 拦截到了 a 属性的 get 操作
// 拦截到了 b 属性的 delete 操作

// let state = ref({ a:1 })
// const k = state.value // 拦截到了 value 的 get 操作
// console.log('-------')
// console.log(k) // 不会拦截，因为 k 相当于是一个 proxy 对象，没有针对成员进行操作
// k.a = 3 // 拦截到了 a 属性的 set 操作
// k.b = 4 // 拦截到了 b 属性的 set 操作
// const n = k.a // 拦截到了 a 属性的 get 操作
// console.log(k.a) // 拦截到了 a 属性的 get 操作
// console.log(n) // 不会拦截, 因为 a 是一个普通值了
// k.c = { city: '深圳' } // 拦截到了 c 属性的 set 操作
// console.log(k.c) // 拦截到了 c 属性的 get 操作
// let m = k.c // 拦截到了 c 属性的 get 操作
// console.log(m) // 没有拦截，m只是k.c的值（又一个代理对象）的引用，独立于k，它已经不再需要触发 k 的拦截器。
// k.c 是什么？
// 这是对 k 的 c 属性的访问，触发了代理对象 k 的 get 拦截器，返回了 k.c 的值。

// m 是什么？
// m 是一个变量，用来存储 k.c 的返回值。这个返回值可能是一个普通值，也可能是一个代理对象。

// 关键点：
// 赋值操作 m = k.c 的结果是，m 仅存储了 k.c 返回的值。此时，m 本身已经不再与 k 的 c 属性存在直接关联了。对 m 的操作，与 k 无关，也不会触发 k 的代理拦截。

// const arr = reactive([1,2,3])
// arr; // 不会拦截
// arr.length // 拦截到了 length 属性的 get 操作
// arr[0] // 拦截到了 0 属性的 get 操作
// arr[0] = 3 // 拦截到了 0 属性的 set 操作
// arr.push(4)
// 拦截到了 push 属性的 get 操作
// 拦截到了 length 属性的 get 操作
// 拦截到了 3 属性的 set 操作
// 拦截到了 length 属性的 set 操作