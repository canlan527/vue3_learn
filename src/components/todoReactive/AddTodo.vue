<template>
  <div class="add-todo">
    <input type="text" placeholder="请输入" v-model="newTodo">
    <button @click="addTodo">添加任务</button>
  </div>
</template>

<script setup>
import { store } from '@/store/todoReactive'
import { ref } from 'vue'

const newTodo = ref('')

function addTodo() {
  if(newTodo.value.trim() === '') {
    return
  }
  store.addTodo({
    id: Date.now(),
    text: newTodo.value,
    completed: false
  })
  newTodo.value = ''
}


</script>


<style scoped>
.add-todo {
  display: flex;
  margin-top: 20px;
}

.add-todo input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  flex: 1;
}

.add-todo button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-todo button:hover {
  background-color: #0056b3;
}
</style>
