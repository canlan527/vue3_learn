<template>
  <div class="phantom-list-container">
    <VirtualList :data="data" :itemHeight="100" :estimated-item-height="100" />
  </div>
</template>

<script setup>
import VirtualList from '@/components/virtualList/ VirtualList.vue';
import { faker } from '@faker-js/faker';
import { ref} from 'vue' 
// 构造数据
const d = []
for(let i = 0; i< 10000; i++) {
  d.push({
    id:i+1,
    // value: `第${i + 1}条数据`
    value: faker.lorem.sentences() // 随机生成句子
  })
}

const data = ref(d)
</script>

<style lang="scss" scoped>
.phantom-list-container {
  width: 100%;
  height: 100vh;
}
</style>