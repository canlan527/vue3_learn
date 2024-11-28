<template>
  <div>

  </div>
</template>

<script setup>
import { ref, toValue } from 'vue'
// import { reactive, shallowReactive, readonly, shallowReadonly, isProxy } from 'vue'
// 响应式常用 API
const count = ref(10)
const number = 20
const getter = () => 30

console.log(toValue(count)) // 10
console.log(toValue(number)) // 20
console.log(toValue(getter)) // 30

// isProxy

// // 创建 reactive 代理对象
// const reactiveObj = reactive({ message: 'Hello Vue3' })
// // 创建 shallowReactive 对象
// const shallowReactiveObj = shallowReactive({ message: 'Hello Vue3' })
// // 创建 readonly 对象
// const readonlyObj = readonly({ message: 'Hello Vue3' })
// // 创建 shallowReadonly 对象
// const shallowReadonlyObj = shallowReadonly({ message: 'Hello Vue3' })
// // 创建普通对象
// const obj = { message: 'Hello Vue3' }

// console.log('reactiveObj: ', reactiveObj) // Reactive<Object>
// console.log('shallowReactiveObj: ', shallowReactiveObj) // ShallowReactive<Object>
// console.log('readonlyObj: ', readonlyObj) // Readonly<Object>Object>
// console.log('shallowReadonlyObj: ', shallowReadonlyObj) // ShallowReadonly<Object>

// 判断是否是响应式对象
// console.log('isProxy(reactiveObj): ', isProxy(reactiveObj)) // true
// console.log('isProxy(shallowReactiveObj): ', isProxy(shallowReactiveObj)) // true
// console.log('isProxy(readonlyObj): ', isProxy(readonlyObj)) // true
// console.log('isProxy(shallowReadonlyObj): ', isProxy(shallowReadonlyObj)) // true
// console.log('isProxy(obj): ', isProxy(obj)) // false

// 判断 isRef 和 isReactive API
// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     d: 3,
//     e: 4,
//   },
// }

// const state1 = ref(obj)
// const state2 = shallowRef(obj)
// const state3 = reactive(obj)
// const state4 = shallowReactive(obj)

// console.log('isRef(state1): ', isRef(state1)) // true
// console.log('isRef(state2): ', isRef(state2)) // true
// console.log('isRef(state1.value.c): ', isRef(state1.value.c)) // false
// console.log('isRef(state2.value.c): ', isRef(state2.value.c)) // false

// console.log('isReactive(state1.value.c): ', isReactive(state1.value.c)) // true
// console.log('isReactive(state2.value.c): ', isReactive(state2.value.c)) // false

// console.log('isReactive(state3): ', isReactive(state3)) // true
// console.log('isReactive(state4): ', isReactive(state4)) // true

// console.log('isReactive(state3.c): ', isReactive(state3.c)) // true
// console.log('isReactive(state4.c): ', isReactive(state4.c)) // false




// readonly
// const count = ref(20)
// const readonlyCount = readonly(count)

// console.log(readonlyCount.value ++) 
// 给出警告：App.vue:14 [Vue warn] Set operation on key "value" failed: target is readonly. Ref<20>
// 20

// unref
// const count = ref(20)
// const number = 30

// console.log(unref(count)) // 20
// console.log(unref(number)) // 30


// const state = reactive({
//   count: 0,
//   message: 'Hello Vue3',
// })

// const stateRef = toRefs(state)

// console.log(stateRef) // {count: ObjectRefImpl, message: ObjectRefImpl}
// console.log(stateRef.count) // Ref<0>
// console.log(stateRef.count.value) // 0

// console.log(stateRef.message.value) // Hello Vue3

// const state = reactive({
//   count: {
//     value: 0,
//   }
// })

// console.log('isReactive(state): ', isReactive(state)) // true
// console.log('isReactive(state.count): ', isReactive(state.count)) // true
// console.log('isReactive(state.count.value): ', isReactive(state.count.value)) // false

// // 转count为ref对象
// const countRef = toRef(state, 'count')
// // 相当于 const countRef = ref(state.count)
// console.log(countRef) // Ref<Object>
// console.log(countRef.value) // Reactive<Object>
// console.log(countRef.value.value) // 0

// const state = reactive({ count: 0 })
// const countRef = toRef(state, 'count')
// 上面的代码等同于：const countRef = ref(state.count)
// console.log(countRef)// Ref<0>
// console.log(countRef.value)// 0

</script>

<style lang="scss" scoped>

</style>