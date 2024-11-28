<template>
  <div>
    <!-- <h1>{{ obj.name }}</h1>
    <h1>{{ obj.age }}</h1>
    <h1>{{ obj.nested.number }}</h1> -->
    <h1 class="content">{{ name }}</h1>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted, nextTick } from 'vue'

// 定义一个响应式变量
const name = ref('Canlan')
let content = null
// setTimeout(async() => {
//   name.value = 'Canlanshaw' // 修改响应式

//   await nextTick() // 等待更新完成
//   console.log("第二次打印： ",content.innerHTML) // 第二次打印： Canlanshaw
// }, 2000)

setTimeout(() => {
  name.value = 'Canlanshaw' // 修改响应式

  nextTick(()=> {
    console.log("第二次打印： ",content.innerHTML) // 第二次打印： Canlanshaw
  })
}, 2000)

onMounted(() => {
  content = document.querySelector('.content')
  console.log('第一次打印： ',content.innerHTML) // 第一次打印：  Canlan
})

// 定义一个响应式数组
// const arr = ref([1, 2, 3, 4, 5])
// console.log(arr.value)

// setTimeout(() => {
//   arr.value.push(6)
//   console.log(arr.value)
// }, 2000)

// 定义一个响应式对象
// const obj = shallowRef({
//   name: 'Canlan2',
//   age:18,
//   nested: {
//     number: 100
//   }
// })

// console.log(obj.value.nested.number)

// setTimeout(() => {
//   // 不会触发更新
//   obj.value.name = 'Canlanshaw2'
//   obj.value.age = 20,
//   obj.value.nested.number = 150
//   obj.value.nested = {
//     number: 200
//   }
//   // 会触发更新
//   obj.value = {
//     name: 'Canlan3',
//     age: 21,
//     nested: {
//       number: 300
//     }
//   }

//   console.log(obj.value.nested.number)
// }, 2000)

// setTimeout(() => {
//   obj.value.nested.number = 200
//   console.log(obj.value.nested.number)
// },2000)

// console.log(obj.value.name)
// console.log(obj.value.age)

// setTimeout(() => {
//   obj.value.name = 'Canlanshaw2'
//   obj.value.age += 1
//   console.log(obj.value.name)
//   console.log(obj.value.age)
// }, 2000)


// const name = ref('Canlan')

// console.log(name)
// console.log(name.value)


// setTimeout(() => {
//   name.value = 'Canlanshaw'
//   console.log(name)
//   console.log(name.value)
// }, 2000)

</script>

<style lang="scss" scoped>

</style>