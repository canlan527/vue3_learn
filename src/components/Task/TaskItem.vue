<template>
  <div>
    <li :class="[task.completed ? 'completed' : 'pending']">
      <span @click="toggleTask">{{ task.title }}</span>
      <button @click="deleteTask">删除</button>
    </li>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useTaskStore from '@/store/useTaskStore'

const { task } = defineProps({
  task: {
    type: Object,
    required: true,
  }
})

const taskStore = useTaskStore()

const toggleTask = async () => {
  await taskStore.toggleTaskStatus(task.id)
}

const deleteTask = async () => {
  await taskStore.deleteTask(task.id)
}

</script>


<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: #fafafa;
  border-radius: 4px;
  transition: background 0.3s;
  margin-bottom: 10px;
}

li:hover {
  background: #f1f1f1;
}

.completed {
  background-color: #dcedc8;
  text-decoration: line-through;
  color: #777;
}

.pending {
  background-color: #fff9c4;
}

button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s;
}

button:hover {
  background: #ffe5e5;
  color: darkred;
}
</style>
