<template>
  <div>
    <h1 class="page-header">{{ id ? '修改用户' : '添加用户' }}</h1>
    <el-form :model="user" label-width="auto" :rules="rules" ref="formRef">
      <div class="well">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="user.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入用户年龄" v-model.trim="user.age" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input placeholder="请输入用户电话" v-model.trim="user.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入用户邮箱" v-model.trim="user.email" />
        </el-form-item>
        <el-form-item label="在读学校" prop="graduationschool">
          <el-input placeholder="请输入用户在读学校" v-model.trim="user.graduationschool" />
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="user.education">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="职业" prop="profession">
          <el-input placeholder="请输入用户职业" v-model.trim="user.profession" />
        </el-form-item>
        <el-form-item label="个人简介" prop="profile">
          <el-input type="textarea" rows="5" placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..." v-model.trim="user.profile" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{ id ? '确认修改' : '确认新增' }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { addUser, editUser, getUserById } from '@/api/user';
import { reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const id = useRoute().params.id;
const formRef = ref(null)
const user = reactive({
  education: '本科'
})

const options = [
  {
    value: 'highSchool',
    label: '高中',
  },
  {
    value: 'Three-yearColleageEducation',
    label: '大专',
  },
  {
    value: 'BachelorDegree',
    label: '本科',
  },
  {
    value: 'postgraduate',
    label: '研究生',
  },
  {
    value: 'PhD',
    label: '博士',
  },
]

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  education: [{ required: true, message: '请输入学校', trigger: 'blur' }],
  graduationschool: [{ required: true, message: '请选择你的学历', trigger: 'blur' }],
  profession: [{ required: true, message: '请输入职业', trigger: 'blur' }],
  profile: [{ required: true, message: '请完成自我介绍', trigger: 'blur' }],
}

const submit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // 根据id调取不同接口
      if (id) {
        // 有id走修改接口
        await editUser(id, user)
        // 路由跳转
        router.push({
          path: '/home',
        })
        ElMessage({
          showClose: true,
          message: '修改用户成功',
          type: 'success',
        })
      } else {
        // 没有id走新增接口
        await addUser(user)
        // 路由跳转
        router.push({
          path: '/home'
        })
        ElMessage({
          showClose: true,
          message: '添加用户成功',
          type: 'success',
        })
      }

    }
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