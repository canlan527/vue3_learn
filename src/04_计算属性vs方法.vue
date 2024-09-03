<template>
  <div>
    <div>
      <button @click="a++">A++</button>
      <button @click="b++">B++</button>
    </div>

    <p> 
      <span>computedA: {{ computedA }}</span> 
      <span>computedB: {{ computedB }}</span>
    </p>
    
    <p>
      <span>methedA: {{ incrementA() }}</span>
      <span>methedB: {{ incrementB() }}</span>
    </p>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const a = ref(1)
const b = ref(100)

// computed
const computedA = computed(() => {
  console.log('computedA 执行了')
  return a.value + 1;
})

const computedB = computed(() => {
  console.log('computedB 执行了')
  return b.value + 1;
})  

// methods
const incrementA = () => {
  console.log('incrementA 执行了')
  return a.value + 1;
}
const incrementB = () => {
  console.log('incrementB 执行了')
  return b.value + 1;
}
</script>

<style lang="scss" scoped>

</style>