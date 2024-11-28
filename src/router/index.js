import { createRouter, createWebHistory } from 'vue-router'
// 页面组件
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

// 创建路由实例，并传入配置对象
const router = createRouter({
  history: createWebHistory(), // 指定 history 模式
  // 路由和组件的映射
  routes: [{
    path: '/', //指定路由路径
    name: 'Home', //指定路由名称
    component: Home, //指定路由组件
  }, {
    path: '/about',
    name: 'About',
    component: About
  }]
})

export default router