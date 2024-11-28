<template>
  <section class="todoapp">
    <Header v-model:todos="todos" />
    <List v-model:todos="todos" v-model:showtodoList="showtodoList" />
    <Footer v-model:defaultStatus="defaultStatus" v-model:activeItemLength="activeItemLength"
      v-model:compltedItemLength="compltedItemLength" @delAllComplted="handleDelAllComplted" />
  </section>
</template>

<script setup>
import Header from './components/todo/Header.vue';
import List from './components/todo/List.vue';
import Footer from './components/todo/Footer.vue';

import { ref, computed, watchEffect } from 'vue'

const STORAGE_KEY = 'todo-list-vue3' // 定义本地存储key
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) // 初始化todos
const defaultStatus = ref('all')

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
// active 的 item条数
const activeItemLength = computed(() => {
  return filterFn.active(todos.value).length;
})
// completed 的item条数
const compltedItemLength = computed(() => {
  return filterFn.completed(todos.value).length;
})
// 删除所有completed
function handleDelAllComplted() {
  if (window.confirm('确认要删除所有已完成的事项吗')) {
    todos.value = filterFn.active(todos.value)
  }
}

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})
// 监听 hash 变化
window.addEventListener('hashchange', onHashChange)
function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, '')
  if (filterFn[route]) {
    defaultStatus.value = route
  } else {
    window.location.hash = ''
    defaultStatus.value = 'all'
  }
}
</script>
<style scoped>
@import './assets/todo.css';

.todoapp {
  background: #fff;
  margin: 130px auto;
  position: relative;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
  width: 800px;
}
</style>