import './assets/main.css'

import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import './deepVue/数据拦截'
// import './deepVue/02_响应式数据'
// import './deepVue/04_观察者模式1'

// 导入路由
import router from '@/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import ErrorLogger from './views/errorLogger/error-logger'
import { ObserveVisibility } from 'vue3-observe-visibility'
const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.config.globalProperties = {
  window: {
    location: {
      href: 'https://www.google.com'
    },
    message: '全局message变量',
    Test: {
      name: '全局name变量'
    }
  }
}

app.use(pinia)
app.use(router)
// app.use(ElementPlus)
//使用插件
app.use(ErrorLogger, {
  logToConsole: true,
  remoteLogging: true,
  remoteUrl: 'http://localhost:3003/log'
})
app.directive('observe-visibility', ObserveVisibility)
app.mount('#app')

