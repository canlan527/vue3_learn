<template>
  <div>
    <p>停止侦听器</p>
    <p>{{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>

<script setup>
import {ref, watch, watchEffect} from 'vue'
const count = ref(1)

// const unwatch = watch(count, (value) => {
//   if(value >= 5) {
//     unwatch()
//   }
//   console.log(value)
// })

const unwatch = watchEffect(() => {
  console.log(count.value)
  if(count.value >= 5) {
    unwatch()
  }
})

</script>

<style lang="scss" scoped>

</style>