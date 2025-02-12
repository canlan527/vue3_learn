import handlers from './handlers/index.js'

// 实现响应式系统
export function reactive(target) {
  return new Proxy(target, handlers)
}