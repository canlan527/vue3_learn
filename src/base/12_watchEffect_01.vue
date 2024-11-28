<template>
  <div>
      <h1>watch part2</h1>
      <h2 @click="todoId++">todo things</h2>

      <div v-if="data">
        <p>{{ data.userId }} - {{ data.title }} - {{ data.completed }}</p>
      </div>

  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
const todoId = ref(1)
const data = ref(null)

// watch(todoId, async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
//   data.value = await res.json()
// }, {
//   immediate: true
// })

watchEffect(async () => {
  // 不再需要显式的指定响应式数据依赖
  // 在回调函数中用到了哪个响应式数据，该数据就会成为一个依赖
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  data.value = await res.json()
})

</script>

<style lang="scss" scoped></style>