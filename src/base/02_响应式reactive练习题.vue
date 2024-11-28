<template>
  <h1>{{ obj.name }}</h1>
</template>

<script setup>
import { ref, shallowReactive } from 'vue'
const name = ref('Bill') // name 是一个 ref 值
const obj = shallowReactive({
  name
})
setTimeout(() => {
  obj.name = 'John'
}, 1000)
setTimeout(() => {
  name.value = 'Smith'
}, 2000)
</script>

<style lang="scss" scoped></style>