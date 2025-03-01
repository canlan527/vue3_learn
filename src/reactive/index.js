// 用于测试
import { reactive } from "./reactive.js";

const obj = {
  a: 1,
  b: 2,
  c: {
    name: 'sam',
    age:30
  }
}

// const proxyObj = reactive(obj)

// proxyObj.a = 10
// proxyObj.c.name = 'cok'
// proxyObj.d = 40

// delete proxyObj.a
// console.log(proxyObj)
// delete proxyObj.d

// 'a' in proxyObj

// for(let key in proxyObj) {

// }

// 测试数组
const arr = [1 , obj, 3]
const proxyArr = reactive(arr)

// 测试读取行为
// proxyArr[0]
// proxyArr.length
// for (const key in proxyArr) {
//  proxyArr[key]
// }

for(let i = 0; i< proxyArr.length; i++) {
  proxyArr[i]
}