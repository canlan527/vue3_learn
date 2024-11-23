<template>
  <div class="rating-container">
    <!-- <span v-for="item in 5" :key="item" class="star" @click="$emit('setStar', item)"> -->
    <span v-for="item in 5" :key="item" class="star" @click="setStar(item)">
      {{ rate >= item ? '★' : '☆' }}
    </span>
  </div>
</template>

<script setup>
defineProps(['rate'])
// 引入宏定义
// const emits = defineEmits(['changeRate'])
// 可验证的自定义事件参数
const emits = defineEmits({
  'changeRate': (value) => {
    if (value < 1 || value > 5) {
      alert('invalid value')
      return false;
    }
    return true;
  }
})

function setStar(item) {
  // 将item触发给父组件
  emits('changeRate', 111)
}

</script>

<style scoped>
.rating-container {
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