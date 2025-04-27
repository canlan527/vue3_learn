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
              <li v-for="(item, index) in routerInfo" :key="item.to">
                <el-menu-item :index="item.name">
                  <router-link :to="item.to" class="navigation">{{ item.title }}</router-link>
                </el-menu-item>
              </li>
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
import { ref } from 'vue'

const activeIndex = ref('home')
const routerInfo = ref([
  { to: '/home', name: 'home', title: '主页' },
  { to: '/about', name: 'about', title: '关于我们' },
  { to: '/todoreactive', name: 'todo', title: 'todoReactive' },
  { to: '/plugin', name: 'plugin', title: '插件展示' },
  { to: '/transition-pic', name: 'transition-pic', title: '图片轮播' }
])
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

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