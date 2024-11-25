<template>
  <div class="rate-container">
    <span  class="star" v-for="item in 5" :key="item" @click="setStar(item)">
     {{ item <= rate ?  '★' : '☆'  }}
    </span>
    <input type="text" v-model="rate">
  </div>
</template>

<script setup>
// 0. 基本使用
// const model = defineModel()

// 1.表示必传
// const model = defineModel({
//   required: true
// })

// 2. 接收参数
// const title = defineModel('title')

// 3. 接收修饰符
const [rate, modifiers] = defineModel({
  set(value) {
    console.log(value)
    console.log(modifiers) // {number: true}
    if(modifiers.number) {
      if(value > 5) return 5;
      if(value < 0) return 0;
    }
    return value
  }
})

function setStar(item) {
  rate.value = item
}
</script>

<style scoped>
.rate-container {
  display: flex;
  font-size: 24px;
  cursor: pointer;
}
.star {
  margin-right: 5px;
  color: gold;
}
.star:hover {
  color: orange;
}
</style>