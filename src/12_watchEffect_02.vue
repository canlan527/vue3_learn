<template>
  <div>
    <p>watchEffect只监听回调函数中用到的属性</p>
    <h1>团队管理</h1>
    <ul>
      <li v-for="member of team" :key="member.id">
        {{ member.name }} - {{ member.role }} - {{ member.status }}
      </li>
    </ul>
    <button @click="toggleLeaderStatus">切换leader状态</button>
    <button @click="toggleDeveloperStatus">切换开发者状态</button>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'

const team = reactive([
  { id: 1, name: '张三', role: 'Leader', status: 'Active' },
  { id: 2, name: '李四', role: 'Developer', status: 'Inactive' },
])

function toggleLeaderStatus() {
  const leader = team.find(item => item.role === 'Leader')
  leader.status = leader.status === 'Active'? 'Inactive' : 'Active'
}

function toggleDeveloperStatus() {
  const developer = team.find(item => item.role === 'Developer')
  developer.status = developer.status === 'Active'? 'Inactive' : 'Active'
}
watchEffect(() => {
  // 依赖的只有team中Leader的数据，改变其他数据不会侦听
  const leader = team.find((item) => item.role === 'Leader')
  console.log(leader.name, leader.role, leader.status, 'leader状态改变了')
})


</script>

<style lang="scss" scoped></style>