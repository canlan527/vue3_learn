<template>
  <div id="app" class="container">
    <el-container>
      <!-- header -->
      <el-header>
        <el-row>
          <el-col :span="6">
            <div class="logo" @click="$router.push('/')"></div>
          </el-col>
          <el-col :span="16">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item :index="item.to" 
                v-for="(item, index) in routerInfo" :key="item.to">
                  {{ item.title }}
                </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="2">
            <el-menu :default-active="activeIndex" @select="handleSelect" mode="horizontal">
              <el-menu-item index="add">
                <router-link to="/add" class="navigation">添加用户</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>

      </el-header>
      <!-- 根据路由展示的页面 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// const activeIndex = ref('home')
const routerInfo = ref([
  { to: '/home', name: 'home', title: '主页' },
  { to: '/about', name: 'about', title: '关于我们' },
  { to: '/todoreactive', name: 'todoreactive', title: 'todoReactive' },
  { to: '/plugin', name: 'plugin', title: '插件展示' },
  { to: '/transition-pic', name: 'transition-pic', title: '图片轮播' },
  { to: '/tree', name:'tree', title: 'tree组件' }
])
const router = useRouter()
const route = useRoute()
// 让 activeIndex 永远等于当前路由 path
const activeIndex = computed(() => route.path)

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  router.push(key)
}
onMounted(() => {
  console.log(route.path) // 输出 /
})


</script>

<style scoped>
.container {
  width: 1200px;
  padding-top: 20px;
  margin: 0 auto;
}

.navbar-brand {
  font-size: 18px;
  line-height: 60px;
  padding-left: 20px;
}

.navigation {
  text-decoration: none;
  color: inherit;
}

.logo {
  width: 100%;
  height: 60px;
  background: url('./assets/imgs/logo.jpg') no-repeat center;
  background-size: 90%;
}

.text-right {
  text-align: right;
}
</style>