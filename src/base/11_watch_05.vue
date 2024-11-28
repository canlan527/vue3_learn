<template>
  <div>
    标题：<input type="text" v-model="title">
    <br>
    <br>
    描述：<textarea cols="30" rows="10" v-model="desc"></textarea>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'

const title = ref('')
const desc = ref('')

// 这里侦听的是多个数据源所组成的数组
// 数组里面任何一个数据发生变化，都会触发回调函数
watch([title, desc], (newValue) => {
  console.log(newValue)
})
</script>

<style lang="scss" scoped>

</style>