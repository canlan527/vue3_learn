// 用于测试
// import { RAW } from "./handlers/behaviors/operatorTypes.js";
import { effect } from "./effect/effect.js";
import { reactive } from "./reactive.js";

// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     name: 'sam',
//     age:30
//   }
// }

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
// const arr = [1 , obj, 3]
// const proxyArr = reactive(arr)

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

// proxyArr.push(10)

// console.log(proxyArr)

// const proxyObj = reactive(obj)



// lazy 的effect 自己控制执行时间
// const obj2 = {
//   a: 1,
//   b: 2,
// };
// const state = reactive(obj2);
// function fn() {
//   console.log("fn");
//   state.a = state.a + 1;
// }
// const effectFn = effect(fn, {
//   lazy: true,
// });
// state.a = 100;
// effectFn(); // 只有在执行了这个函数之后，才会建立依赖关系

// const obj2 = {
//   a: 1,
//   b: 2,
// };
// const state = reactive(obj2);
// function fn() {
//   console.log(state.a);
//   state.a = state.a + 1;
// }
// let isRun = false;
// const effectFn = effect(fn, {
//   lazy: true,
//   scheduler: (eff) => {
//     // 由我用户来决定如何处理依赖的函数
//     Promise.resolve().then(() => {
//       if (!isRun) {
//         isRun = true;
//         eff();
//       }
//     });
//   },
// });
// effectFn(); // 只有在执行了这个函数之后，才会建立依赖关系
// state.a++;
// state.a++;
// state.a++;
// state.a++;
// state.a++;
// console.log('结束了')
// 测试 1
// const obj2 = {
//   a: 1,
//   b: 2,
// };
// const state = reactive(obj2);
// function fn() {
//   console.log("fn");
//   state.a = state.a + 1;
// }
// effect(fn);
// state.a = 100;


const data = {foo: 1, bar: 2}
const proxy = reactive(data)
effect(() => {
  // console.log(proxy.foo)
  // console.log('foo' in proxy) // true
  for(const prop in proxy) {
    console.log(prop, proxy[prop])
  }
  console.log('--------')

})

// proxy.foo++
// proxy.bar++
// in
// 'foo' in proxy
proxy.baz  = 3 // 新增
// ['get', 'iterate', 'has']
