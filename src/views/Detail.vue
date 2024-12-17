<template>
  <div class="details container">
    <button class="btn btn-default" @click="$router.go(-1)">返回</button>
    <h1 class="page-header">
      {{ user.name }} -{{ user.age }}岁
      <span class="pull-right">
        <button class="btn btn-default" style="margin-right: 10px;" @click="navigateEdit">修改</button>
        <button class="btn btn-default" @click="handleDelete">删除</button>
      </span>
    </h1>
    <!-- 第一组 -->
    <ul class="list-group">
      <li class="list-group-item">
        <span class="glyphicon glyphicon-phone">电话：{{ user.phone }}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-envelope">邮箱：{{ user.email }}</span>
      </li>
    </ul>
    <!-- 第二组 -->
    <ul class="list-group">
      <li class="list-group-item">
        <span class="glyphicon glyphicon-book">学历：{{ user.education }}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-flag">在读院校：{{ user.graduationschool }}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-briefcase">专业：{{ user.profession }}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-user">个人简介：{{ user.profile }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { deleteUser, getUserById } from '@/api/user';
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const user = reactive({})
const id = useRoute().params.id;
const router = useRouter()
// 获取数据
onMounted(async () => {
  const { data } = await getUserById(id)
  Object.assign(user, data)//赋值
})

const navigateEdit = () => {
  router.push({
    path: `/edit/${id}`
  })
}

const handleDelete = async () => {
  if (window.confirm('您是否确定要删除此用户？')) {
    await deleteUser(id)
    router.push({
      path: '/home'
    })
  }

}

</script>

<style lang="scss" scoped></style>