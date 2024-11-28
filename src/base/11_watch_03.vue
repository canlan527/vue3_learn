<template>
  <div>
    姓名：<input type="text" v-model="messageObj.name">
    年龄：<input type="text" v-model="messageObj.age">
    <p>你的信息是： {{ messageObj.name }} - {{ messageObj.age }}</p>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const messageObj = reactive({
  name: '言战',
  age: 20,
})

watch(messageObj, (newValue, oldValue) => {
  console.log(newValue.name, newValue.age)
})

</script>

<style lang="scss" scoped>

</style>