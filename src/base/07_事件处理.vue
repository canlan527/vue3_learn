<template>
  <div>
    <h1>事件处理</h1>
    <!-- 绑定事件 -->
    <!-- <button @click="handleClick">点击</button> -->
    <!-- 内联 -->
    <!-- <button @click="count++">点击</button> -->
    <!-- 传递参数 -->
    <!-- <button @click="handleClick('hello vue3')">点击</button> -->
    <!-- 必须显式的使用 $event 来向事件处理器传递事件对象 -->
    <!-- <button @click="handleClick('message hello', $event)">点击</button> -->
      <!-- 如果是箭头函数，那么事件对象需要作为参数传入 -->
  <!-- 此时参数没有必须是 $event 的限制了 -->
    <button @click="(event) => handleClick('message hello', event)">点击</button>
    <p>点击次数: {{ count }}</p>

    <h1>键盘事件</h1>
    <!-- 按enter 触发 -->
    <input type="text" :value="value" @keydown.enter="handleInput('输入了', $event)">

  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const value = ref('')

// 事件处理：事件对象
function handleClick(msg,event) {
  console.log(msg)
  console.log(event)
  console.log(event.target)
  console.log(event.x, event.y)
  count.value++
}
// 键盘事件
function handleInput(msg, event) {
  console.log(msg)
  console.log(event)
  console.log(event.target)
  console.log(event.target.value)
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