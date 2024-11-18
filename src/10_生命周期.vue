<template>
  <div>
    <h1>用户列表</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index">{{ user.name }} - {{ user.email }}</li>
    </ul>
    <div v-if="loading">加载中...</div>
    <div v-if="error">出错了...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if(res.ok) {
      users.value = await res.json()
    }else {
      throw new Error('请求失败')
    }
  } catch(e) {
    error.value = e.message
  } finally {
    loading.value = false
  }

})

</script>

<style lang="scss" scoped>

</style>