import trigger from '../../effect/trigger.js';
import { TriggerOpTypes } from "./operatorTypes.js"
import { hasChange } from '../../utils.js'

export default function (target, key, value) {
  // 设置写入类型
  const type = target.hasOwnProperty(key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
  // 缓存旧值
  const oldValue = target[key]
  // 设置操作
  const result = Reflect.set(target, key, value)
  // 判断更新
  if (hasChange(oldValue, value)) {
    // 触发器触发更新
    trigger(target, type, key)
  }
  return result;
}