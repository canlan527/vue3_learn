import trigger from '../../effect/trigger.js';
import { TriggerOpTypes } from "./operatorTypes.js"
import { hasChange } from '../../utils.js'

export default function (target, key, value) {
  // 设置写入类型
  const type = Object.prototype.hasOwnProperty.call(target, key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
  // 缓存旧值
  const oldValue = target[key]
  // 缓存旧的length值
  const oldLen = target.length

  // 设置操作
  const result = Reflect.set(target, key, value)
  // 判断更新
  if (hasChange(oldValue, value)) {
    // console.log(oldValue, value)
    // console.log(oldLen, target.length)
    // 触发器触发更新
    trigger(target, type, key)
    // 判断length如果发生变化的情况，隐式：触发更新，显示：数组删除操作
    if (Array.isArray(target) && hasChange(oldLen, target.length)) {
      if (key !== 'length') {
        // 隐式变化，派发更新
        trigger(target, TriggerOpTypes.SET, 'length')
      } else {
        // length显示变化，删除操作
        for(let i = target.length; i< oldLen; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString())
        }
        // console.log('length变化了')
      }
    }
  }
  return result;
}