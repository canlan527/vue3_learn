
<template>
  <div>
    <h1>深度监听</h1>
    <!-- reactive 数组 -->
    <div v-for="item in arr" :key="item.name">
      <p>{{ item.name }} - {{ item.age }} - {{ item.book }}</p>
      <button @click="item.age++">修改数组深度内容</button>
    </div>
    <!-- reactive 对象 -->
    <p>{{ obj.address }}</p>
    <button @click="obj.address = '太原市'">修改reactive对象</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
// reactive 数组
const arr = reactive([
  { name: 'coder1', age: 18, book: 'vue+ts完全指南' },
  { name: 'coder2', age: 18, book: 'react+ts完全指南' }
])
// reactive 对象
const obj = reactive({
  address: '北京市'
})

watch(arr, (newarr) => {
  console.log(newarr)
  console.log(newarr[0].age)
})

watch(obj, (newObj) => {
  console.log(newObj.address)
})

// 错误的方式 直接监听obj.address的话，类型为字符串，而不是响应式对象
// watch(obj.address, (value) => {
//   console.log(value)
// })

// 修改,使用getter函数可以将字符串包裹成响应式对象
watch(() => obj.address, (value) => {
  console.log(value)
})
</script>

<style lang="scss" scoped></style>