import { createRouter, createWebHistory } from 'vue-router'
// 页面组件
import Counter from '@/components/keepalive/Counter.vue'
import TextInput from '@/components/keepalive/TextInput.vue'
import CheckboxList from '@/components/keepalive/CheckboxList.vue'
import Timer from '@/components/keepalive/Timer.vue'

// 创建路由实例，并传入配置对象
const router = createRouter({
  history: createWebHistory(), // 指定 history 模式
  // 路由和组件的映射
  routes: [
    {
      path: '/',
      component: Counter
    },
    {
      path: '/text',
      component: TextInput
    },
    {
      path: '/checkboxList',
      component: CheckboxList
    }, 
    {
      path: '/timer',
      component: Timer
    }
  ]
})

export default router