<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <div v-if="isShow" ref="divRef">
      《Vue.js设计与实现》
    </div>
    <p>上面div的高度是: {{ height }}px</p>
  </div>
</template>

<script setup>
import { ref, watch, watchPostEffect } from 'vue'

const isShow = ref(false)
const divRef = ref(null)
const height = ref(0)

// watch(isShow, () => {
//   height.value = divRef.value ? divRef.value.offsetHeight : 0;
//   console.log(height.value)
// }, {
//   flush: 'post'
// })
watchPostEffect(() => {
  height.value = divRef.value ? divRef.value.offsetHeight : 0;
  console.log(height.value)
})

</script>

<style lang="scss" scoped>

</style>