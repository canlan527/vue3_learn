<template>
  <div>
    <p>count1: {{ count1 }}</p>
    <p>是否为偶数：{{ isEven() }}</p>
    <button @click="count1++">count1 +1</button>
    <p>count2: {{ count2 }}</p>
    <button @click="count2++">count2 + 1</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const count1 = ref(0)
const count2 = ref(1)

function isEven() {
  console.log('isEven函数重新执行了')
  if(count2.value > 5) {
    return `count2过大`
  }

  return count1.value % 2 == 0
}

// 侦听getter函数的返回值
watch(isEven, () => {
  console.log('触发了侦听器')
})

</script>

<style lang="scss" scoped>

</style>