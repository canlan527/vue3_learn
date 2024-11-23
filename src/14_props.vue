<template>
  <div class="app-container">
    <!-- <UserCard name="张三" email="11122@gmail.com" avatar="src/assets/imgs/demo.png" />
    <user-card name="李四" email="11111@gmail.com" :avatar="avatarUrl"></user-card> -->

    <!-- 动态传值 -->
    <user-card :user="info" :size="size" :ids="ids"></user-card>
    <input type="text" placeholder="请输入修改的名字" v-model="newName">
    <button @click="info.name = newName">确认修改</button>
  </div>
</template>

<script setup>
import UserCard from '@/components/user/UserCard.vue';
import avatarUrl from '@/assets/imgs/demo2.png'
import { ref } from 'vue'

// 父组件的数据由自己维护
const info = ref({
  name: '张三',
  email: '11100@gmail.com',
  avatar: 'src/assets/imgs/demo.png'
})
const newName = ref('')
const size = ref(20)
const ids = ref('student')
 
</script>

<style lang="scss" scoped>
.app-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}
.input-group {
  display: flex;
  margin-top: 20px;
}

input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>