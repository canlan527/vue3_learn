import track from '../../effect/track.js'
import { TrackOpTypes } from './operatorTypes.js'
import { isObject } from '../../utils.js'
import { reactive } from '../../reactive.js'

export default function(target, key) {
  console.log('拦截到了get操作')
  // 收集依赖 
  track(target, TrackOpTypes.GET, key)
  const result = Reflect.get(target, key)

  // 对象 -> 递归，转成响应式
  if(isObject(result)) {
    return reactive(result)
  }

  return result
}