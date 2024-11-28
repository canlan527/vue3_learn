<template>
  <div class="app-container">
    <h1>请对本次服务作出评分：</h1>
    <!-- <Rating :rate @setStar="setStar" /> -->
     <rating  :rate @changeRate="setStar" />
    <p>你当前的评价为 {{rate}} 颗星</p>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Rating from './components/rating/rating.vue';

const rate = ref(0)

function setStar(star) {
  rate.value = star
}
</script>

<style scoped>
.app-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

p {
  font-size: 18px;
  color: #333;
}
</style>