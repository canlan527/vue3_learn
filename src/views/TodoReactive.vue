<template>
  <div id="todoReactive">
    <h1>任务管理器</h1>
    <AddTodo/>
    <Todolist/>
  </div>
</template>

<script setup>
import Todolist from '@/components/todoReactive/Todolist.vue';
import AddTodo from '@/components/todoReactive/AddTodo.vue';
</script>

<style lang="scss" scoped>
#todoReactive {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #343a40;
}

.todo-container {
  width: 400px;
  margin: 0 auto;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #495057;
}
</style>