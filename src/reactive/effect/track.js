// 收集依赖

import { TrackOpTypes } from "../handlers/behaviors/operatorTypes.js"

/**
 * 收集器，用于收集依赖 
 * @param {*} target 原始对象
 * @param {string} type 进行的操作类型
 * @param {*} key 收集的属性
 */
export default function(target, type, key) {
  if(type === TrackOpTypes.ITERATE) {
    // console.log('收集器：原始对象为', target)
    console.log(`收集器：代理对象的${type}操作被拦截`)
    return;
  }
  // console.log('收集器：原始对象为', target)
  console.log(`收集器：代理对象${key}属性的${type}操作被拦截`)
}