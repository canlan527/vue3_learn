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
  // 取出副作用函数并执行
  const effects = getEffects(target, type, key)
  if(!effects) return;
  const effectsToRun = new Set()
  effects.forEach(effectFn => {
    if(effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  }) 

  effectsToRun.forEach(effectFn => {
    if(effectFn?.options?.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
// getEffects:
// 输入：target（目标对象）、type（触发类型，如 SET、ADD）、key（操作的属性）。
// 输出：一个 Set 集合，包含所有需要触发的副作用函数。

function getEffects(target, type, key) {
  const propMap = targetMap.get(target)
  if(!propMap) return target[key];

  const keys = [key]
  if([TriggerOpTypes.ADD, TriggerOpTypes.DELETE].includes(type)) {
    keys.push(ITERATE_KEY)
  }

  const effectFns = new Set()
  for(const key of keys) {
    const typeMap = propMap.get(key)
    if(!typeMap) continue;
    const trackTypes = triggerTypeMap[type]
    for(const trackType of trackTypes) {
      const deps = typeMap.get(trackType)
      if(!deps) continue;
      deps.forEach(effectFn => effectFns.add(effectFn))
    }
  }
  return effectFns
}