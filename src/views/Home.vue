<template>
  <div>
    <h1>用户列表</h1>
    <!-- 搜索框 -->
    <el-input 
      placeholder="搜索内容" 
      size="large" 
      v-model="searchValue" 
      @input="handleSearch" 
      :prefix-icon="Search"
      clearable />
    <div style="margin: 20px 0" />
    <!-- 用户列表 -->
    <el-table :data="list" stripe>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <!-- {{ scope.row.date }} -->
          <router-link :to="`/detail/${scope.row.id}`">
            <el-button type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getUserList } from '@/api/user';
import { ref, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchValue = ref('')
const userList = ref([])
const searchList = ref([])

// 搜索事件
const handleSearch = () => {
  searchList.value = userList.value.filter((item) => {
    return item.name.includes(searchValue.value) || item.penis.includes(searchValue.value)
  })
}

// 缓存list
const list = computed(() => {
  return searchValue.value ? searchList.value : userList.value
})

onMounted(async () => {
  const { data } = await getUserList()
  userList.value = data
})
</script>

<style lang="scss" scoped></style>