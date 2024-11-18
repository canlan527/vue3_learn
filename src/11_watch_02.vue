<template>
  <div>
    名：<input type="text" v-model="firstName">
    姓：<input type="text" v-model="lastName">
    <p>你的名字是：{{ fullName }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const firstName = ref('')
const lastName = ref('')

const fullName = computed(() => `${lastName.value} - ${firstName.value}`)
// watch的数据源可以是计算属性
watch(fullName, (newVal, oldVal) => {
  console.log(`${newVal}: ${oldVal}`)
})


</script>

<style lang="scss" scoped>

</style>