<template>
  <div>
    <h1>智能机器人</h1>
    <input type="text" v-model="question" placeholder="请输入问题">
    <div v-if="loading">加载中...</div>
    <div v-else>
      {{ answer }}
    </div>
  </div>
</template>

<script setup>
 import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('')
const loading = ref(false)

// 侦听器所对应的回调函数，接受两个参数
// 一个是依赖数据的新值，一个是依赖数据的旧值
watch(question, async (newVal) => {
  if(newVal.includes("?")) {
    loading.value = true
    answer.value = '思考中....'
    // 发送请求
    try {
      const res = await fetch('https://yesno.wtf/api')
      const result = await res.json()
      answer.value = result.answer
    } catch (err) {
      answer.value = '抱歉，我无法回答你的问题'
    } finally {
      loading.value = false
    }
  }
})

</script>

<style lang="scss" scoped>

</style>·