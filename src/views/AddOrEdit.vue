<template>
  <div class="container">
    <h1 class="page-header">{{ id ? '修改用户' : '添加用户' }}</h1>
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
          <textarea type="text" class="form-control" rows="5" placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
            v-model.trim="user.profile" />
        </div>
        <button class="btn btn-primary">{{id? '确认修改' :'确认新增'}}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { addUser, editUser, getUserById } from '@/api/user';
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const id = useRoute().params.id;

const user = reactive({
  education: '本科'
})

const submit = async () => {
  // 校验表单项
  for(const key in user) {
    if(!user[key]) {
      alert('请填写完整的用户信息')
      return 
    }
  }
  // 根据id调取不同接口
  if(id) {
    // 有id走修改接口
    await editUser(id, user)
  } else {
    // 没有id走新增接口
    await addUser(user)
  }

  // 路由跳转
  router.push({
    path: '/home'
  })
}

onMounted(async () => {
  if (id) {
    const { data } = await getUserById(id)
    Object.assign(user, data)
  }
})

</script>

<style lang="scss" scoped></style>