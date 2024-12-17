<template>
  <div>
    <h1>用户列表</h1>
    <!-- 搜索框 -->
    <input type="text" class="form-control" placeholder="搜索内容" v-model="searchValue" @input="handleSearch">
    <!-- 用户列表 -->
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>联系方式</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <router-link :to="`/detail/${item.id}`">详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getUserList } from '@/api/user';
import { ref, onMounted, computed } from 'vue'

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