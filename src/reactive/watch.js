import { cleanup, effect } from "./effect/effect.js";



export function watch(source, cb, options = {}) {
  let getter = typeof source === 'function' ? source : () => traverse(source)

  let oldVal, newVal;

  const job = () => {
    newVal = effectFn();
    cb(newVal, oldVal);
    oldVal = newVal;
  }

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler () {
      if(options.flush === 'post') {
        Promise.resolve().then(job)
      } else {
        job()
      }
    }
  })

  if (options.immediate) {
    job()
  } else {
    oldVal = effectFn()
  }

  return () => {
    cleanup(effectFn)
  }
}

// 递归遍历所有source对象里的属性，加入依赖收集
function traverse(source, seen = new Set) {
  if (typeof source !== 'object' || source === null || seen.has(source)) return;
  seen.add(source)
  for (const prop in source) {
    traverse(source[prop], seen)
  }
  return source;
}