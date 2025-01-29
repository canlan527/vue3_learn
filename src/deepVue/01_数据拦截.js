// 数据拦截的本质
// 1.Object.defineProperty(obj, prop, descriptor)
// obj:要定义属性的对象
// prop:一个字符串或者Symbol，制定了 要定义或修改的属性键
// descriptor：属性描述符，一个对象。
// 对象中的参数
// - value：设置属性值，默认为undefined
// - writable：设置属性值是否可写，默认为false
// enumerable：设置属性是否可枚举，默认为false
// configurable：是否可以配置该属性，默认为 false，这里的配置主要针对以下几点：
// - - 该属性的类型是否能在数据属性和访问器属性之间修改
// - - 该属性是否可以删除
// - - 描述符的其他属性能否被更改
// 
// get 取值函数，默认undefined
// set 存值函数，默认undefined

// 数据属性：value， writable
// 访问器属性：getter、setter

// 数据属性和访问器属性是互斥的
// 在默认情况下，使用Object.defineProperty添加的属性是不可写，不可枚举和不可配置的
// function Student() {
//   let stuName = '张三'
//   Object.defineProperty(this, 'name', {
//     get() {
//       return stuName
//     },
//     set(value) {
//       if(!isNaN(value)) {
//         // 如果输入的是数字，就将stuName设置成张三
//         stuName = '张三'
//       } else {
//         stuName = value
//       }
//     }
//   })
// }

// const s1 = new Student()
// console.log(s1.name) // 张三
// s1.name = '李四'
// console.log(s1.name) // 李四
// s1.name = 1000
// console.log(s1.name) // 张三


// 2.Proxy() *建代理对象的方式来实现拦截

// const p = new Proxy(target, handler)
// target 目标对象，可以是任何类型的对象，包括数组、函数
// handler：定义代理对象的行为
// 返回值：返回的就是一个代理对象，之后外部对属性的读写都是针对代理对象来做的

// function Student() {
//   const obj = {
//     name: '张三'
//   }
//   return new Proxy(obj, {
//     get(obj, prop) {
//       return obj[prop] + '是个好学生'
//     },
//     set(obj, prop, newValue) {
//       if(!isNaN(newValue)) {
//         obj[prop] = '张三'
//       } else {
//         obj[prop] = newValue
//       }
//       return true
//     }
//   })
// }

// const s = new Student() // s拿到的就是代理对象
// console.log(s.name) 
// s.name = '大树'
// console.log(s.name)
// s.name = 1000
// console.log(s.name)

// const obj = {
//   data: 'inner data'
// }
// let _data = '一些数据'

// Object.defineProperty(obj, "data", {
//   get() {
//     console.log('读取data的操作被拦截了')
//     return _data;
//   },
//   set(newVal) {
//     console.log('设置data的操作被拦截了')
//     return newVal
//   }
// })

// obj.data = '新的数据'
// console.log(obj.data)


// const p = new Proxy(obj, {
//   get(obj, prop) {
//     console.log('读取data的操作被拦截了')
//     return obj[prop]
//   }, 
//   set(obj, prop, value) {
//     console.log('设置data的操作被拦截了')
//     obj[prop] = value;
//     return true
//   }
// })

// // console.log(p.data)
// p.data = '新的数据'
// console.log(p.data)


// 深度拦截
const user = {
  vip: {
    svip: {
      date: 3
    }
  }
}


function deepDefineProperty(obj) {
  // 递归循环
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
      deepDefineProperty(obj[key])
    }
    // 缓存一下属性值
    let _value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        console.log(`读取 ${key} 属性`)
        return _value
      },
      set(value) {
        console.log(`设置 ${key} 属性`)
        _value = value
      },
      configurable: true,
      enumerable: true
    })
  }
}

// deepDefineProperty(user)
// console.log(user.vip.svip.date)

// 读取了 vip 属性
// 读取了 svip 属性
// 读取了 date 属性
// 3

// function deepProxy(obj, ) {
//   return new Proxy(obj, {
//     get(obj, key) {
//       console.log(`读取了 ${key} 属性`)
//       // 递归get
//       if(typeof obj[key] === 'object') {
//         return deepProxy(obj[key])
//       }
//       return obj[key]
//     },
//     set(obj, key, value) {
//       console.log(`设置了 ${key} 属性`)
//       // 递归set
//       if(typeof value === 'object') {
//         return deepProxy(value)
//       }
//       obj[key] = value
//       return true
//     }
//   })
// }

// const u = deepProxy(user)

// console.log(u.vip.svip.date)
// console.log("----------------");
// u.vip.svip.date = 300

/**
  读取了 vip 属性
  读取了 svip 属性
  读取了 date 属性
  3
  ----------------
  读取了 vip 属性
  读取了 svip 属性
  设置了 date 属性
 */

//   如果是使用 Object.defineProperty ，一旦后期给对象新增属性，是无法拦截到的，因为 Object.defineProperty 在设置拦截的时候是针对的特定属性，所以新增的属性无法被拦截。

// 但是 Proxy 就不一样，它是针对整个对象，后期哪怕新增属性也能够被拦截到。

function deepProxy(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      console.log(`读取 ${prop} 属性的拦截操作`)
      if (typeof obj[prop] === 'object') {
        return deepProxy(obj[prop])
      }
      return obj[prop]
    },
    set(obj, prop, value) {
      console.log(`设置 ${prop} 属性的拦截操作`)
      obj[prop] = value
      if (typeof value === 'object') {
        deepProxy(value)
      }
      return true
    },
    deleteProperty(obj, prop) {
      console.log(`删除了 ${prop} 属性的拦截操作`)
      delete obj[prop]
      return true
    },
    getPrototypeOf(obj) {
      console.log('拦截获取原型')
      return Object.getPrototypeOf(obj)
    },
    setPrototypeOf(obj, prop) {
      console.log('拦截设置原型')
      return Object.setPrototypeOf(obj, prop)
    }
  })
}

const userProxy = deepProxy(user)
// 读取
console.log(userProxy.vip.svip.date)
/**
  读取 vip 属性的拦截操作
  读取 svip 属性的拦截操作
  读取 date 属性的拦截操作
  3
 */
// 新增
userProxy.name = '张三'
console.log(userProxy)
/**
  设置 name 属性的拦截操作
  { vip: { svip: { date: 3 } }, name: '张三' }
 */

// 删除
delete userProxy.name
console.log(userProxy)
/**
 删除了 name 属性的拦截操作
{ vip: { svip: { date: 3 } } }
 */


// 获取原型
console.log(Object.getPrototypeOf(userProxy))

/**
 拦截获取原型
[Object: null prototype] {}
 */

// 设置原型
Object.setPrototypeOf(userProxy, { custom: 'proto' })

// 获取原型
console.log(Object.getPrototypeOf(userProxy))
/**
 拦截设置原型
拦截获取原型
{ custom: 'proto' }

 */