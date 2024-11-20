<template>
  <!-- 最外层容器 -->
  <section class="todoapp">
    <!-- 头部 -->
    <header class="header">
      <h1>待办事项</h1>
      <input type="text" class="new-todo" placeholder="添加新的待办事项" @keyup.enter="addTodo" />
    </header>
    <!-- 代办列表 -->
    <section class="main">
      <!-- 全选按钮 -->
      <input type="checkbox" id="toggle-all" class="toggle-all" />
      <label for="toggle-all">全部完成</label>
      <!-- 待办事项列表 -->
      <ul class="todo-list">
        <li class="todo" :class="{ 'completed': item.completed }" v-for="item in showtodoList" :key="item.id">
          <div class="view">
            <input type="checkbox" class="toggle" v-model="item.completed">
            <label>{{ item.title }}</label>
            <button class="destroy" @click="delItem(item.id)"></button>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect} from 'vue'

const STORAGE_KEY = 'todo-list-vue3' // 定义本地存储key
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) // 初始化todos
const defaultStatus = ref('all')
// todos:  {id, title, completed,}

// 数据列表状态 all active completed
const filterFn = {
  'all': (todos) => todos,
  'active': (todos) => todos.filter(item => !item.completed),
  'completed': (todos) => todos.filter(item => item.completed)
}
// 定义展示的列表数据
const showtodoList = computed(() => {
  return filterFn[defaultStatus.value](todos.value)
})
// 新增一项todo
function addTodo(event) {
  const title = event.target.value.trim()
  if (title) {
    todos.value.unshift({
      id: Date.now(),
      title,
      completed: false,
    })
    // 清空输入框
    event.target.value = '';
  }
}

// 删除 某一项todo
function delItem(id) {
  todos.value = todos.value.filter(item => item.id !== id)
}

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})
</script>

<style scoped>
@import './assets/todo.css';
</style>