import trigger from '../../effect/trigger.js'
import { TriggerOpTypes } from './operatorTypes.js';

export default function (target, key) {
  // 判断属性存在否
  const hasKey = Object.prototype.hasOwnProperty.call(target, key)
  // 删除属性
  const result = Reflect.deleteProperty(target, key)
  // 如果属性存在并且删除成功，派发更新
  if (hasKey && result) {
    // 触发trigger
    trigger(target, TriggerOpTypes.DELETE, key)
  }

  return result;
}