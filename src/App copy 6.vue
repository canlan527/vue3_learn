<template>
  <ElConfigProvider :locale="zhCn">
    <div class="form-container">
      <el-form :model="form" label-width="100px" class="user-form" ref="formRef" :rules="rules">
        <h1>用户信息表单</h1>
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <!-- 出生日期 -->
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio value="male">男</el-radio>
            <el-radio value="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 兴趣爱好 -->
        <el-form-item label="兴趣爱好" prop="hobbies">
          <el-checkbox-group v-model="form.hobbies">
            <el-checkbox value="football" name="hobby">足球</el-checkbox>
            <el-checkbox value="basketball" name="hobby">篮球</el-checkbox>
            <el-checkbox value="baseball" name="hobby">排球</el-checkbox>
            <el-checkbox value="read" name="hobby">阅读</el-checkbox>
            <el-checkbox value="music" name="hobby">音乐</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 接收通知 -->
        <el-form-item label="接收通知" prop="notifications">
          <el-switch v-model="form.notifications" />
        </el-form-item>
        <!-- 用户评级 -->
        <el-form-item label="用户评级" prop="rating">
          <el-rate v-model="form.rating"></el-rate>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </ElConfigProvider>

</template>

<script setup>
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 绑定表单数据
const form = ref({
  name: '',
  email: '',
  birthday: '',
  gender: 'male',
  hobbies: [],
  notifications: false,
  rating: 0
})

const formRef = ref(null) // 表单元素

// 表单验证规则
const rules = {
  // 验证规则是一个数组，因为可以设置多条规则
  // 每一条规则，是一个对象
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  hobbies: [{ required: true, message: '请至少选择一个爱好', trigger: 'change' }],
  rating: [{ required: true, message: '请评价用户等级', trigger: 'change' }]
}

// 表单提交方法
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('表单验证通过')
    } else {
      console.log('表单验证不通过')
      return false;
    }
  })
}
// 表单重置方法
const resetForm = () => {
  formRef.value.resetFields()
}

</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.user-form {
  width: 600px;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>