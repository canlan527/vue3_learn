<template>
  <div class="user-card">
    <img :src="user.avatar" alt="用户头像" class="avatar">
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <!-- 使用组件自己的数据 -->
      <p>{{ innerSize }}</p>
      <p>{{ innerIds }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// const user = defineProps({
//   name: String,
//   email: String,
//   avatar: String,
// })
const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && value.email && value.avatar;
    }
  },
  size: {
    type: [Number, String],
    default() {
      return 20
    }
  },
  ids: {
    type: String,
    default() {
      return 'Student'
    }
  }
})
// 基于传递过来的参数二次操作
const innerSize = ref(props.size + 20)
const innerIds = computed(() => props.ids.toUpperCase())



</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 16px;
  color: #666;
}
</style>
