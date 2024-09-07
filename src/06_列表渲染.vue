<template>
  <div>
    <!-- 列表渲染 -->
    <!-- <h2>商品列表</h2> -->
    <!-- <ul>
      <li v-for="product in products" :key="product.name">{{ product.name }} - {{ product.price }}</li>
    </ul> -->
    <!-- 渲染多个元素 -->
    <!-- <template v-for="(product, index) in products" :key="product.name">
      <h3>{{ index + 1  }}</h3>
      <h3>{{ product.name }} - {{ product.price }}</h3>
      <hr>
    </template> -->

    <!-- 参数 -->
     <!-- <div v-for="(value, key, index) in person">
       {{ index }} - {{ key }} - {{ value }}
     </div> -->

     <!-- 循环整数 -->
    <!-- <li v-for="n in 10">{{ n }}</li> -->

    <!-- 循环作用域 -->
    <ul>
      <li v-for="project in projects" :key="project.id">
        <h1>{{ project.name }}</h1>
        <ul>
          <li v-for="task in project.tasks" :key="task.id">
            <h2>{{ task.name }}</h2>
            <ul>
              <li v-for="sub in task.subtasks" :key="sub">
                {{ project.name }} - {{ task.name }} - {{ sub }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const products = ref([
  { name: '键盘', price: 99.99 },
  { name: '鼠标', price: 59.99 },
  { name: '显示器', price: 299.99 }
])
const person = reactive({
  name: 'canlanshaw',
  age: 25,
  sex: '男',
  address: '广州',
  hobby: ['看书', '跑步', '打篮球']
})

const projects = ref([
  {
    id: 1,
    name: 'Project A',
    tasks: [
      {
        id: 1,
        name: 'Task A1',
        subtasks: ['Subtask A1.1', 'Subtask A1.2']
      },
      {
        id: 2,
        name: 'Task A2',
        subtasks: ['Subtask A2.1', 'Subtask A2.2']
      }
    ]
  },
  {
    id: 2,
    name: 'Project B',
    tasks: [
      {
        id: 1,
        name: 'Task B1',
        subtasks: ['Subtask B1.1', 'Subtask B1.2']
      },
      {
        id: 2,
        name: 'Task B2',
        subtasks: ['Subtask B2.1', 'Subtask B2.2']
      }
    ]
  }
])
setTimeout(() => {
  projects.value.push({
    id: 3,
    name: '这是一个大项目',
    tasks: [
      {
        id: 1,
        name: '搭建工程',
        subtasks: ['🧵调研框架', '熟悉框架']
      },
      {
        id: 2,
        name: '分解模块',
        subtasks: ['先调研', '分析']
      }
    ]
  })
}, 3000)
</script>

<style lang="scss" scoped>

</style>