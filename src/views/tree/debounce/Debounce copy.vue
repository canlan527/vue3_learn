<template>
  <div class="container">
    <input type="text" @input="handleDebounceInput">
    <p class="result">{{ text }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash';
const text = ref('')
function handleInput(e) {
  text.value = e.target.value;
}
const handleDebounceInput = debounce(handleInput, 300)

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