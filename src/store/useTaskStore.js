import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fetchTaskFromServer,
  addTaskToServer,
  toggleTaskStatusOnServer,
  deleteTaskFromServer
} from '@/api/task.js'



const useTaskStore = defineStore('taskStore', () => {
  // 定义状态
  const tasks = ref([])
  const loading = ref(false)

  // 定义getters
  // 完成的任务
  const completedTasks = computed(() => tasks.value.filter((item) => item.completed))
  // 未完成的任务
  const pendingTasks = computed(() => tasks.value.filter(item => !item.completed))
  // 任务总数
  const taskCount = computed(() => tasks.value.length)
  // 完成任务的数量
  const completedTaskCount = computed(() => tasks.value.filter(item => item.completed).length)

  // actions
  // 获取任务
  async function fetchTask() {
    loading.value = true
    tasks.value = await fetchTaskFromServer()
    loading.value = false
  }

  // 添加任务
  async function addTask(task) {
    loading.value = true
    const newTask = await addTaskToServer(task)
    tasks.value.push(newTask)
    loading.value = false
  }
  // 更改任务状态
  async function toggleTaskStatus(taskId) {
    loading.value = true
    await toggleTaskStatusOnServer(taskId)
    const task = tasks.value.find((task) => task.id === taskId)
    if(task) {
      task.completed = !task.completed
    }
    loading.value = false
  }
  // 删除任务
  async function deleteTask(taskId) {
    loading.value = true
    await deleteTaskFromServer(taskId)
    tasks.value = tasks.value.filter(item => item.id !== taskId)
    loading.value = false
  }

  return {
    tasks,
    loading,
    completedTasks,
    pendingTasks,
    taskCount,
    completedTaskCount,
    fetchTask,
    addTask,
    toggleTaskStatus,
    deleteTask
  }
})

export default useTaskStore