import { ref, reactive, watchEffect, watch } from 'vue'
// 响应式的本质
// 依赖收集：收集一些函数，当数据发生变化的时候，需要重新执行这些函数，因此需要提前收集起来。
// 派发更新：通知被收集了的函数：现在数据更新了，你们需要重新执行一遍。

// 数据：
// 当数据发生变化，通知函数执行，这里的数据指的是响应式数据。
// 在Vue里，指的是
// - ref
// - reactive
// - computed
// - props
// 这几种方式所得到的数据就是响应式数据

// 依赖
// 谁和谁之间的依赖
// 响应式数据与函数之间的依赖。
// 当函数在运行期期间用到了响应式数据，那么我们可以称之为两者之间有依赖
// 所谓用到，是指在函数运行期间，出现了读取其成员被拦截的情况，这样才是用到
// 完整表述：函数在运行期间，出现了读取某响应式数据成员被拦截的情况，我们就称两者之间产生了依赖，这个依赖（就是这个对应关系）是会被收集的，方便响应式数据发生变化时重新执行对应的函数。

// 函数
// 函数，必须是被监控的函数
// - effect
// - watchEffect
// - watch
// - 组件渲染函数render

// 最后总结一下：只有被监控的函数，它的同步代码运行期间，读取某个响应式数据成员被拦截的情况，才会建立依赖，建立了依赖之后，响应式数据发生变化，对应的函数才会重新执行

// 练习
// 1.
// const state = ref({a : 1})
// const k = state.value
// const n = k.a
// watchEffect(() => {
//   // 首先判断依赖关系
//   console.log('运行')
//   state // 没有产生依赖
//   state.value // 会产生依赖关系，函数依赖 value
//   state.value.a // 会产生依赖关系，函数依赖 value 属性和 a 属性
//   n // 不会产生依赖关系，因为只是一个值的引用值
// })
// setTimeout(() => {
//   state.value = { a: 3 }
// }, 500)


// 2.
// let state = ref({a : 1})
// const k = state.value
// let n = k.a
// watchEffect(() => {
//   // 依赖关系
//   console.log('运行')
//   state  // 无
//   state.value // value 
//   state.value.a // value、a
//   n // 无
// })
// setTimeout(() => {
//   // state.value // 没有修改响应式数据，所以不会重新执行
//   // state.value.a = 1 // // 没有修改响应式数据，所以不会重新执行
  
//   // k.a = 2 // 这里相当于操作返回的proxy对象，所以会重新执行
  
//   // n++;
//   // 因为操作的变量对上面的函数而言，没有形成依赖关系，所以这个值的改变不会引起该函数的重新执行

//   // state.value.a = 100; // 会重新运行

//   // state = 100  // 没有针对成员的读取操作，不会重新运行

// }, 500)

// 3.
// const state = ref({ a: 1 })
// const k = state.value
// const n = k.a

// watchEffect(() => {
//   // 依赖关系
//   console.log('运行')
//   state // 无
//   state.value // value
//   n // 无
// })

// setTimeout(() => {
//   state.value.a = 100 
//   // 这个操作，包含对value属性的读取，和a属性的设置
//   // a属性没有在函数中设置依赖关系，因此a属性的修改不会引起函数的重新执行
// }, 500)

// 4.
// const state = ref({ a: 1 })
// const k = state.value
// const n = k.a

// watchEffect(() => {
//   console.log('运行')
//   state.value.a // value 、 a
// })

// setTimeout(() => {
//   state.value = { a: 1} // 会重新执行，引用地址已经不同
// }, 500)

// 5.
// const state = ref({ a: 1 })
// const k = state.value
// const n = k.a

// watchEffect(() => {
//   console.log('运行')
//   state.value.a = 3 
//   // 对 value 属性有依赖关系
//   // a 是set操作，所以没有形成依赖
// })

// setTimeout(() => {
//   state.value = {} // 会重新执行
// }, 500)

// 6.
// const state = ref({ a: 1 })
// const k = state.value
// const n = k.a

// watchEffect(() => {
//   console.log('运行')
//   state
//   state.value
//   // state.value.a
//   n
// })

// setTimeout(() => {
//   state.value.a = 2 // 要重新执型
// }, 500)

// setTimeout(() => {
  
//   // 如果依赖关系没有a属性就不会重新执行

//   // k.a = 3 // 要重新执行
//   // k.a = 2 // 因为值没有改变，所以不会重新执行
// }, 1000)

// 7.
// const state = ref({ a: 1 })
// const k = state.value
// const n = k.a

// watchEffect(() => {
//   console.log('运行')
//   state.value.a // value 、a
// })

// setTimeout(() => {
//   state.value = { a : 1} // 会重新执行
// }, 500)
// setTimeout(() => {
//   // state.value.a = 1 // 不会重新执行， 因为值没有改变
//   state.value.a = 2 // 会重新执行
// }, 1000)

// 8.
// const state = ref({ a: 1 })
// const k = state.value
// const n = k.a

// watchEffect(() => {
//   console.log('运行') 
//   state.value.a // value 、a
//   k.a
// })

// setTimeout(() => {
//   state.value = { a: 1 } // 会重新执行
// }, 500)
// setTimeout(() => {
//   k.a = 3 // 会重新执行
// }, 1000)
// setTimeout(() => {
//   state.value.a = 4 // 会重新执行
// }, 1500)

