import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // config就是请求
  // 这里做一些其他的事情，比如请求头添加token
  
  // 请求放行
  return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
  //response就是响应
  // 做一些其他的事，比如多响应结果进行处理

  // 响应放行
  return response
}, (error) => {
  // 错误处理
  return Promise.reject(error);
})

export default request;