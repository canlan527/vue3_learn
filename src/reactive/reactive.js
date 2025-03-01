import handlers from './handlers/index.js'
import { isObject } from './utils.js'

// 本地缓存
const proxyMap = new WeakMap()

// 实现响应式系统
export function reactive(target) {
  // 如果不是对象，直接返回
  if(!isObject(target)) {
    return target
  }

  // 如果已经代理过了，直接取出即可，不需要重新代理
  if(proxyMap.has(target)){
    return proxyMap.get(target)
  }
  // 新建代理
  const proxy = new Proxy(target, handlers)
  // 放入桶中
  proxyMap.set(target, proxy)

  return proxy
}