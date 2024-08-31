<template>
  <div>
    <div>{{ number + 1}}</div>
    
    <div>{{ message }}</div>


    <div>{{ window.a }}</div>
    <div v-html="htmlstr"></div>
    <div :newId>newId</div>

    <!-- 正确的写法 -->
    <div v-bind="arrProps">arrProps</div>
    <!-- 错误的写法 -->
    <div :arrProps="arrProps">arrProps</div>

    <!-- js表达式 -->
    <div>{{ word.split('').reverse().join('') }}</div>
    <div>{{ ok ? 'Sunny': 'Rainy' }}</div>
    <div :id="`list-${id}`">{{ id + 100}}</div>

    <!-- 不允许访问的全局属性 -->
    <div>{{ window.message }}</div>
    <div>{{ window.Test.name }}</div>
    <div>{{ window.location.href }}</div>

    <!-- 允许访问的全局变量 -->
    <div>{{ Math.random() }}</div>
    <div>{{ new Date().toLocaleString() }}</div>
    <div>{{ parseInt(100.555) }}</div>
  </div>
</template>

<script setup>
const number = 1
const ok = true
const message = 'Hello Vue 3'
const id = 1
// window.a = 100
// window.message = 'This is a global variable'
// window.Test =  {
//     name: 'test'
// }
// htmlstr
const htmlstr = '<div style="color:red">This is a HTML string</div>'
const newId = 10000 // vue3.4.0新增
const arrProps = {
  name: 'content',
  class: 'content-page'
}
const word = 'vue3'
</script>

<style lang="scss" scoped>

</style>