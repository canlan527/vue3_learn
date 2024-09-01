<template>
  <div>
    <h1>{{ count+1 }}</h1>
    <h2>{{ state.id.value + 1}}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const state = {
  id: ref(1000)
}
</script>

<style lang="scss" scoped>

</style>