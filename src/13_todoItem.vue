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
        <li class="todo" :class="{ completed: item.completed, editing: item === editTodo }" v-for="item in showtodoList"
          :key="item.id">
          <div class="view">
            <input type="checkbox" class="toggle" v-model="item.completed">
            <label @dblclick="editItem(item)">{{ item.title }}</label>
            <button class="destroy" @click="delItem(item.id)"></button>
          </div>
          <!-- 编辑区域 -->
          <input type="text" class="edit" v-if="item === editTodo" v-model="item.title" @keyup.enter="doneEdit(item)"
            @blur="doneEdit(item)" @vue:mounted="({ el }) => el.focus()" @keyup.escape="cancelEdit(item)">
        </li>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer">
      <span class="todo-count">
        <span>剩余 {{ activeItemLength }} 项</span>
      </span>
      <ul class="filters">
        <li :class="{ selected: defaultStatus === 'all' }">
          <a href="#/all">全部</a>
        </li>
        <li :class="{ selected: defaultStatus === 'active' }">
          <a href="#/active">未完成</a>
        </li>
        <li :class="{ selected: defaultStatus === 'completed' }">
          <a href="#/completed">已完成</a>
        </li>
      </ul>
      <button class="clear-completed" v-show="compltedItemLength > 0" @click="delAllComplted">清除已完成</button>
    </footer>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'

const STORAGE_KEY = 'todo-list-vue3' // 定义本地存储key
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) // 初始化todos
const defaultStatus = ref('all')
// todos:  {id, title, completed,}
const editTodo = ref() // 存储正在编辑的todo
let beforeEditCache = '' // 缓存编辑前的todo.title用于取消操作还原

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
//编辑 某一项 todo
function editItem(item) {
  editTodo.value = item
  beforeEditCache = item.title
}

// 完成编辑
function doneEdit(item) {
  if (editTodo.value) {
    editTodo.value = null; // 置空editTodo，只有置空才会退出编辑样式
    // 如果标题为空，删除此项
    item.title = item.title.trim()  // 去空格
    if (!item.title) delItem(item.id)
  }
}
// 取消编辑，还原item.title+退出编辑样式
function cancelEdit(item) {
  item.title = beforeEditCache
  editTodo.value = null
}
// 删除所有completed
function delAllComplted() {
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
</style>