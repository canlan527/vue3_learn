export let activeEffect; // 暂存当前effect
export const targetMap = new WeakMap() // 存储对象和属性的依赖关系
const effectStack = [] // effect栈，管理副作用函数

// effect：执行传入的函数，并且在执行的过程中，收集依赖
export function effect(fn, options = {}) {
  const effectFn = () => {
    try {
      cleanup(effectFn)
      activeEffect = effectFn;
      effectStack.push(effectFn)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  effectFn.deps = []
  effectFn.options = options

  if(!options.lazy) {
    effectFn()
  }
  return effectFn;
}
// 清理函数
export function cleanup(effectFn) {
  for (const deps of effectFn.deps) {
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

