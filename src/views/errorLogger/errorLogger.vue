<template>
  <div v-if="errors.length">
    <h1>error logs</h1>
    <ul>
      <li v-for="error in errors" :key="error.time">
        {{ error.time }} - {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
// 该数组用于存储错误信息
const errors = reactive([])

onMounted(() => {
  const oldConsoleError = console.error
  console.error = (...args) => {
    errors.push({
      message: args[0],
      time: new Date().toDateString()
    })
    oldConsoleError.apply(console, args)
  }
})

</script>
