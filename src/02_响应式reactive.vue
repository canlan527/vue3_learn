<template>
  <div>
    <!-- <h1>{{ state.count }}</h1> -->
    <!-- <h1>{{ state.nested.count }}</h1> -->
     <!-- <h1>{{ count }}</h1> -->

     <h1> {{ state.name }}</h1>
  </div>
</template>

<script setup>
import { ref, reactive, shallowReactive } from 'vue'

// 解包细节
const name = ref('canlan')

const state = shallowReactive({ name })

setTimeout(() => {
  name.value = 'canlanshaw'
}, 2000)


// const name = ref('canlan')

// const state = shallowReactive({ name })

// console.log(state.name) // Ref<'canlan'>

// console.log(state.name.value) // canlan




// const name = ref('canlan')

// const state = reactive({ name })


// console.log(state.name) // canlan

// name.value = 'canlanshaw'

// console.log(state.name) // canlanshaw
// console.log(name.value) // canlanshaw




//  let state = reactive({ count: 0})
//  // 下面的操作会让上面的对象引用不再被追踪，从而导致上面对象的响应式追踪丢失
//   state = reactive({ count: 1 })

// 丢失响应性
// let state = reactive({ count: 0 })

// let { count } = state

// setTimeout(() => {
//   count ++
// }, 1000)


//  const state = shallowReactive({
//    count: 0,
//    nested: {
//      count: 1
//    }
//  })

//  setTimeout(() => {
//   state.count ++;
//  }, 2000)

//  setTimeout(() => {
//   state.nested.count ++;
//  }, 4000)

//  const state = reactive({
//   count: 0,
//   nested: {
//     count: 1
//   }
//  })

//  setTimeout(() => {
//   state.count ++;
//   state.nested.count ++;
//  }, 2000)
</script>

<style lang="scss" scoped>

</style>