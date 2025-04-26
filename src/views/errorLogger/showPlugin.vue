<template>
  <div>
    <h1>log plugin show example</h1>
    <button @click="triggerError">click to trigger error</button>
    <ErrorLogger />
  </div>
</template>

<script setup>
function triggerError() {
  throw new Error('这是一个错误')
}
</script>
