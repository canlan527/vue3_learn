// 收集依赖

import { TrackOpTypes } from "../handlers/behaviors/operatorTypes.js"

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
export default function(target, type, key) {
  // 如果不需要收集依赖就直接返回
  if(!shouldTrack) {
    return;
  }

  // console.log(`当前的type值是${type}`)
  if(type === TrackOpTypes.ITERATE) {
    // console.log('收集器：原始对象为', target)
    console.log(`收集器：代理对象的${type}操作被拦截`)
    return;
  }
  // console.log('收集器：原始对象为', target)
  console.log(`收集器：代理对象${String(key)}属性的${type}操作被拦截`)
}