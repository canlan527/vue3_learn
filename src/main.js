import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

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
app.mount('#app')
