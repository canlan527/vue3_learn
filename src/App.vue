<template>
  <div class="app-container">
    <h1>组件v-model</h1>
    <!-- 组件的v-model -->
    <!-- <Rate v-model="rateNumber" /> -->
    <!-- 重命名 -->
     <!-- <Rate v-model:title="rateNumber" /> -->
      <Rate v-model.number="rateNumber" />
    <p>您当前的评价是：{{ rateNumber }}</p>
  </div>
</template>

<script setup>
import Rate from './components/rating/Rate.vue';
import {ref} from 'vue'

const rateNumber = ref(0)
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>