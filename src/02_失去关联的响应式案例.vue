<template>
  <div>
    <h1>{{ state.name }}</h1>
  </div>
</template>

<script setup>
import { ref, shallowReactive } from 'vue'

// 失去关联的例子
const name = ref('canlan')
const stuName = ref('灿烂')

const state = shallowReactive({ name })

state.name = stuName.value

setTimeout(() => {
  state.name = '小哀'
}, 2000)

</script>

<style lang="scss" scoped>

</style>