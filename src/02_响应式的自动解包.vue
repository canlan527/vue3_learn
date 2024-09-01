<template>
  <div>

  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const books = reactive([ref('vue3设计与实现'), ref('深入理解Vue3.0')])
  console.log(books[0]) // Ref<"vue3设计与实现">
  console.log(books[0].value) // vue3设计与实现

  const name = ref('canlan')
  // map
  const mapCollection = new Map([['name', name], ['age', 25]])

  // 获取第一项,.value获取值
  console.log(mapCollection.get('name')) // Ref<"canlan">
  console.log(mapCollection.get('name').value) // canlan
  // 对于普通值，可以直接获取，不需要.value
  console.log(mapCollection.get('age')) // 25

  const score = ref(100)

  const state = reactive({
    name,
    score: [score] // 数组里是ref响应式数据
  })

  console.log(state.name) // canlan
  console.log(state.score[0]) // Ref<100>
  console.log(state.score[0].value) // 100
</script>

<style lang="scss" scoped>

</style>