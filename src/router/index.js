import { createRouter, createWebHistory } from 'vue-router'
// 页面组件
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import AddOrEdit from '@/views/AddOrEdit.vue'
import Detail from '@/views/Detail.vue'
import Tel from '@/views/Tel.vue'
import Email from '@/views/Email.vue'
import TodoReactive from '@/views/TodoReactive.vue'
import Plugin from '@/views/errorLogger/showPlugin.vue'
import TransitionPic from '@/views/transitionPic/TransitionPic.vue'
import Tree from '@/views/tree/Tree.vue'

// 创建路由实例，并传入配置对象
const router = createRouter({
  history: createWebHistory(), // 指定 history 模式
  // 路由和组件的映射
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home', //指定路由路径
    name: 'Home', //指定路由名称
    component: Home, //指定路由组件
  }, {
    path: '/about',
    name: 'About',
    component: About,
    children: [{
      path: 'email',
      component: Email,
    }, {
      path: 'tel',
      component: Tel,
    }, {
      path: '/about',
      redirect: '/about/email'
    }]
  }, {
    path: '/add',
    component: AddOrEdit,
  }, {
    path: '/edit/:id',
    component: AddOrEdit,
  }, {
    path: '/detail/:id',
    component: Detail
  }, {
    path: '/todoreactive',
    component: TodoReactive
  }, {
    path: '/plugin',
    component: Plugin
  }, {
    path: '/transition-pic',
    component: TransitionPic
  }, {
    path: '/tree',
    component: Tree
  }
  ]
})

export default router