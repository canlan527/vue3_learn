<template>
  <div>
    <!-- <h1 :class="[isActive, error]">Hello Vue 3</h1> -->
    <!-- 三元运算符 -->
    <!-- <h1 :class="[isActive? 'active': '', error]">hello vue3</h1> -->
    <!-- <h1 :style="{ color: isActive? 'green' : 'black' }">Hello Vue 3</h1> -->
    <!-- <h1 :style="[{color: isActive? 'green' : 'black'}, {fontSize: '20px'}]">Hello Vue 3</h1> -->
    <h1 :style="[styleObj1, styleObj2]">Hello Vue 3</h1>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// const isActive = ref(false)
// const isActive = ref('active')
// const error = ref('text-danger')



const styleObj1 = reactive({
  color: 'green',
  fontSize: '20px'
})

const styleObj2 = reactive({
  backgroundColor: 'blue',
  border: '1px solid red'
})

setTimeout(() => {
  // isActive.value = true
  styleObj1.color = 'black'
}, 2000)

</script>

<style lang="scss" scoped>

</style>