// 触发器，派发更新
import { ITERATE_KEY, TrackOpTypes, TriggerOpTypes } from "../handlers/behaviors/operatorTypes.js"; 
import { activeEffect, targetMap} from './effect.js'
// 定义修改数据和触发数据的映射关系
const triggerTypeMap = {
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS
  ],
  [TriggerOpTypes.DELETE]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS
  ]
}

/**
 * 触发器
 * @param {*} target 原始对象
 * @param {*} type 触发器的类型
 * @param {*} key 操作的属性
 */
export default function (target, type, key) {
  // console.log('trigger', target[key])
  // 取出副作用函数并执行
  const effects = getEffects(target, type, key)
  if(!effects) return;
  for(const effectFn of effects) {
    if(effectFn === activeEffect) continue;
    if(effectFn?.options?.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  }
}

function getEffects(target, type, key) {
    // targetMap -> propMap -> typeMap -> depsMap -> Set[effectFn]
    const propMap = targetMap.get(target)
    if(!propMap) return;
    // 如果是新增、删除会涉及到额外触发迭代
    const keys = [key]
    if(type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
      keys.push(ITERATE_KEY)
    }
    const effectsFns = new Set()

    for(const key of keys) {
      const typeMap = propMap.get(key)
      if(!typeMap) continue;
      const trackTypes = triggerTypeMap[type]
      for(const trackType of trackTypes) {
        const depsMap = typeMap.get(trackType)
        if(!depsMap) continue;
        for(const effectFn of depsMap) {
          effectsFns.add(effectFn)
        }
      }
    }
    return effectsFns
}