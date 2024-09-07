<template>
  <!-- <h1 v-if="type === 1">晴天</h1>
  <h1 v-else-if="type === 2">阴天</h1>
  <h1 v-else-if="type === 3">雨天</h1>
  <h1 v-else-if="type === 4">雪天</h1>
  <h1 v-else>未知</h1> -->

  <!-- 渲染多个元素 -->
  <!-- <template v-if="type === 1">
    <h1>晴天</h1>
    <p>今天是个好天气！</p>
    <p>天气很好，适合出去玩！</p>
  </template>
  <template v-else-if="type === 2">
    <h1>阴天</h1>
    <p>今天是个不太好的天气！</p>
    <p>建议宜待在室内，防止感冒！</p>
  </template>
  <template v-else-if="type === 3">
    <h1>雨天</h1>
    <p>今天是个大雨天气！</p>
    <p>建议打伞出行！</p>
  </template>
  <template v-else-if="type === 4">
    <h1>雪天</h1>
    <p>今天是个冷雪天气！</p>
    <p>建议穿厚外套，戴帽子保暖！</p>
  </template>
  <template v-else>
    <h1>未知</h1>
    <p>Bad Robot! </p>
    <p>怪兽破坏了该地区的网络建设，请修复后再试！</p>
  </template> -->

  <!-- v-show -->
   <h1 v-show="isShow">君不见黄河之水天上来</h1>

  
</template>

<script setup>
  import { ref } from 'vue'
  const type = ref(1)
  const isShow = ref(true)

  setInterval(() => {
    const randomType = Math.floor(Math.random() * 5 + 1)
    type.value = randomType
  }, 1000)

  setTimeout(() => {
    isShow.value = false
  }, 2000)
</script>

<style lang="scss" scoped>

</style>