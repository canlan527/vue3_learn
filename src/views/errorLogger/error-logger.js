import Plugin from './errorLogger.vue'
// import ErrorLogger from './Plugin.vue'

export default {
  install(app, options = {}) {
    // 1.参数归一化
    const defaultOptions = {
      logToConsole: true, // 是否把错误日子打印到控制台
      remoteLogging: false, // 是否把错误日志发送到服务器
      remoteUrl: '' // 远程服务器地址
    }

    const config = { ...defaultOptions, ...options }

    // 捕获两种错误
    // 1.全局vue错误
    app.config.errorHandler = (err, vm, info) => {
      logError(err, info)
    }
    // 2.捕获未处理的Promise错误
    window.addEventListener('unhandledrejection', (event) => {
      logError(event.reason, 'unhandled promise rejection error')
    })

    // 3. 统一的错误处理函数
    function logError(error, info) {
      if (config.logToConsole) {
        console.error(`[错误： ${info}]`, error)
      }
      if (config.remoteLogging && config.remoteUrl) {
        fetch(config.remoteUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            error: error.message,
            stack: error.stack,
            info,
            time: new Date().toISOString()
          })
        }).catch(console.error)
      }
    }

    // 注册errorLogger组件
    app.component('ErrorLogger', Plugin)
  }
}