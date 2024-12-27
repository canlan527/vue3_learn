<template>
  <div>
    <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    <el-row :gutter="20">
      <el-col :span="24">
        <h1>{{ user.name }} -{{ user.age }}岁</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="20">
        <el-button type="primary" @click="navigateEdit">修改</el-button>
        <el-button type="primary" @click="dialogVisible = true">删除</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <!-- 第一组 -->
    <el-card class="box-card">
      <template #header>
        <span>用户信息</span>
      </template>
      <ul class="list-group">
        <li class="list-group-item">
          <el-icon class="icon" :size="16"><i-ep-cellphone /></el-icon>电话：{{ user.phone }}
        </li>
        <li class="list-group-item">
          <el-icon class="icon" :size="16"><i-ep-message /> </el-icon> 邮箱：{{ user.email }}
        </li>
      </ul>
    </el-card>

    <!-- 第二组 -->
    <el-card class="box-card">
      <template #header>
        <span>教育和经历</span>
      </template>
      <ul class="list-group">
        <li class="list-group-item">
          <el-icon class="icon" :size="16"><i-ep-notebook /></el-icon>学历：{{ user.education }}
        </li>
        <li class="list-group-item">
          <el-icon class="icon" :size="16"><i-ep-collection-tag /></el-icon>在读院校：{{ user.graduationschool }}
        </li>
        <li class="list-group-item">
          <el-icon class="icon" :size="16"> <i-ep-aim /></el-icon>专业：{{ user.profession }}
        </li>
        <li class="list-group-item">
          <el-icon class="icon" :size="16"><i-ep-user /></el-icon>个人简介：{{ user.profile }}
        </li>
      </ul>
    </el-card>
  </div>
  <!-- 删除用户弹出框 -->
  <el-dialog v-model="dialogVisible" title="提示" width="500" :before-close="handleClose">
    <span>确定要删除此用户信息吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleDelete">
          确定
        </el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { deleteUser, getUserById } from '@/api/user';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const user = reactive({})
const id = useRoute().params.id;
const router = useRouter()

const dialogVisible = ref(false)

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
  await deleteUser(id)
  router.push({
    path: '/home',
  })
  ElMessage({
    showClose: true,
    message: '成功删除此用户',
    type: 'success',
  })
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}

.icon {
  position: relative;
  top: 2px;
  margin-right: 5px;
}
</style>