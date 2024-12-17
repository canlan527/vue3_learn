<template>
  <div class="container">
    <h1 class="page-header">添加用户</h1>
    <form id="my-form" @submit.prevent="submit">
      <div class="well">
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" placeholder="请输入用户姓名" v-model="user.name">
        </div>
        <div class="form-group">
          <label>年龄</label>
          <input type="text" class="form-control" placeholder="请输入用户年龄" v-model.trim="user.age">
        </div>
        <div class="form-group">
          <label>电话</label>
          <input type="text" class="form-control" placeholder="请输入用户电话" v-model.trim="user.phone">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="text" class="form-control" placeholder="请输入用户邮箱" v-model.trim="user.email">
        </div>
        <div class="form-group">
          <label>在读学校</label>
          <input type="text" class="form-control" placeholder="请输入用户在读学校" v-model.trim="user.graduationschool">
        </div>
        <div class="form-group">
          <label>学历</label>
          <select class="form-control" v-model="user.education">
            <option>大专</option>
            <option>本科</option>
            <option>硕士</option>
            <option>博士</option>
          </select>
        </div>
        <div class="form-group">
          <label>职业</label>
          <input type="text" class="form-control" placeholder="请输入用户职业" v-model.trim="user.profession">
        </div> 
        <div class="form-group">
          <label>个人介绍</label>
          <textarea type="text" class="form-control" rows="5" placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..." v-model.trim="user.profile" />
        </div>
        <button class="btn btn-primary">确认新增</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { addUser } from '@/api/user';
import { reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const user = reactive({
  education:'本科'
})

const submit = async () => {
  const res = await addUser(user)
  // 路由跳转
  router.push({
    path:'/home'
  })
}

</script>

<style lang="scss" scoped></style>