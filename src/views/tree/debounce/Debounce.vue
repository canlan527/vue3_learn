<template>
  <div class="container">
    <input type="text" v-model="text">
    <p class="result">{{ text }}</p>
  </div>
</template>

<script setup>

import { debounceRef } from '@/tools/debounceRef'
const text = debounceRef('',300)


</script>

<style  scoped>
.container {
  width: 80%;
  margin: 1em auto;
}
.result {
  color:#333;
}
.container input {
  width: 100%;
  height: 30px;
}
</style>