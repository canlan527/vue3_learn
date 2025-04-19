// 收集依赖
import { targetMap, activeEffect } from "./effect.js";
import { TrackOpTypes, ITERATE_KEY } from "../handlers/behaviors/operatorTypes.js"

let shouldTrack = true; // 是否收集依赖
// 暂停依赖收集
export function pauseTracking() {
  shouldTrack = false
}
// 恢复依赖收集
export function resumeTracking() {
  shouldTrack = true
}

/**
 * 收集器，用于收集依赖 
 * @param {*} target 原始对象
 * @param {string} type 进行的操作类型
 * @param {*} key 收集的属性
 */
export default function (target, type, key) {
  // 如果不需要收集依赖就直接返回
  if (!shouldTrack || !activeEffect) {
    return;
  }
  // 建立关系
  // targetMap -> propMap -> typeMap -> depsMap ->Set<effectFn>
  let propMap = targetMap.get(target)
  if (!propMap) {
    targetMap.set(target, propMap = new Map())
  }

  // 如果是遍历所有的属性，key会是undefined，所以对key值做参数归一化
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY
  }

  let typeMap = propMap.get(key)
  if (!typeMap) {
    propMap.set(key, typeMap = new Map())
  }

  let depsMap = typeMap.get(type)
  if (!depsMap) {
    typeMap.set(type, depsMap = new Set())
  }
  if (!depsMap.has(activeEffect)) {
    // 向字段添加副作用函数
    depsMap.add(activeEffect)
    // 收集依赖集合
    activeEffect.deps.push(depsMap)
  }

}