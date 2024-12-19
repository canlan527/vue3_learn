<template>
  <div>
    <nav>
      <button @click="toggle">切换组件</button>
    </nav>
    <component :is="currentComp" />
  </div>
</template>

<script setup>
import CompA from './components/componet/CompA.vue';
import CompB from './components/componet/CompB.vue';

import { shallowRef } from 'vue'

const currentComp = shallowRef(CompA)
const currentLabel = shallowRef('A') 

const toggle = () => {
  if(currentComp.value === CompA) {
    currentComp.value = CompB
    currentLabel.value = 'B'
  }else {
    currentComp.value = CompA
    currentLabel.value = 'A'
  }
}

</script>

<style lang="scss" scoped>

</style>