// 用于测试
// import { RAW } from "./handlers/behaviors/operatorTypes.js";
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

// for(const item of Array.from(proxyArr)) {
//   console.log(item)
// }

// for(let i = 0; i< proxyArr.length; i++) {
//   proxyArr[i]
// }

// 测试读取行为
// console.log(proxyArr.includes(1))
// console.log(proxyArr.indexOf(1)) 
// console.log(proxyArr.lastIndexOf(1))

// 测试读取对象
// console.log(proxyArr.includes(obj))
// console.log(proxyArr.indexOf(obj))
// console.log(proxyArr.lastIndexOf(obj))

// proxy 暗门机制
// console.log(proxyArr[RAW] === arr)

// 写入操作

// 测试 length
// console.log(proxyArr.length)
// proxyArr[5] = 100 // 当length发生隐式变化，需要派发更新

// 显示变化
// proxyArr.length = 5
// 当新值小于旧值，需要做删除操作
// proxyArr.length = 1

proxyArr.push(10)

console.log(proxyArr)