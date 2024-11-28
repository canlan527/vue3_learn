<template>
  <div>
    <h1>watch第三个参数</h1>
    <div v-for="task in tasks" :key="task.id" @click="selectTask(task)">
      {{ task.title }} ( {{ task.completed ? 'completed' : 'pending' }} )
    </div>
    <hr>
    <div v-if="selectedTask">
      <h3>Edit Task</h3>
      <input type="text" v-model="selectedTask.title" placeholder="Edit title">
      <label>
        <input type="checkbox" v-model="selectedTask.completed">
        Completed
      </label>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const tasks = reactive([
  {id:1, title: 'learn vue', completed: false},
  {id:2, title: 'study react', completed: false},
  {id:3, title: 'update project', completed: false},
])

const selectedId = reactive({id:null})

// 计算属性
const selectedTask = computed(() => {
  return tasks.find(item => item.id === selectedId.id)
})

watch(() => selectedTask.value, (newValue) => {
  console.log(newValue)
},{
  deep:true
})

function selectTask(task) {
  selectedId.id = task.id
}

</script>

<style lang="scss" scoped>

</style>