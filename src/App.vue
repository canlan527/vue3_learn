<template>
  <div>
    <h1>事件处理</h1>
    <!-- 绑定事件 -->
    <!-- <button @click="handleClick">点击</button> -->
    <!-- 内联 -->
    <!-- <button @click="count++">点击</button> -->
    <!-- 传递参数 -->
    <!-- <button @click="handleClick('hello vue3')">点击</button> -->
    
    <!-- <button @click="handleClick('message hello', $event)">点击</button> -->
     <button @click="(event) => handleClick('message hello', event)">点击</button>
    <p>点击次数: {{ count }}</p>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

// 事件处理：事件对象
function handleClick(msg,event) {
  console.log(msg)
  console.log(event)
  console.log(event.target)
  console.log(event.x, event.y)
  count.value++
}

// 参数
// function handleClick(msg) {
//   console.log(msg) // hello vue3
//   count.value++
// }
// function handleClick() {
//   count.value++
// }
</script>

<style lang="scss" scoped></style>