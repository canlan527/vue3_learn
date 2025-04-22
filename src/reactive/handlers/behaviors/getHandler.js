import track, { pauseTracking, resumeTracking } from '../../effect/track.js'
import { TrackOpTypes, RAW } from './operatorTypes.js'
import { isObject } from '../../utils.js'
import { reactive } from '../../reactive.js'

// 重写数组方法
const arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach((key) => {
  // console.log(key)
  arrayInstrumentations[key] = function(...args) {
    // console.log(this)
    const res = Array.prototype[key].apply(this, args)
    if(res === false || res < 0) {
      // this[RAW]触发暗门，proxy会拦截，并返回原始对象
      // 用原始对象重写方法，再找一次
      return Array.prototype[key].apply(this[RAW], args)
    }
    return res;
  }
})
// 针对会改变数组长度的方法，重写 push/shift/unshift/pop/splice ，自定义收集依赖的开关
const mutationMethods = ['push', 'pop', 'shift', 'unshift', 'splice']
mutationMethods.forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    pauseTracking(); // 暂停收集依赖
    const res = Array.prototype[key].apply(this, args);
    resumeTracking(); // 恢复收集依赖
    return res;
  };
});


export default function(target, key) {
  // console.log('拦截到了get操作')
  // console.log(key)
  // 设置暗门，当访问RAW属性的时候，返回原始对象
  if(key === RAW) {
    return target
  }
  
  // 收集依赖 
  track(target, TrackOpTypes.GET, key)
  const result = Reflect.get(target, key)

  // 重写数组方法
  if(Array.isArray(target) && Object.hasOwnProperty.call(arrayInstrumentations, key)) {
    return arrayInstrumentations[key]
  }


  // 对象 -> 递归，转成响应式
  if(isObject(result)) {
    return reactive(result)
  }

  return result
}