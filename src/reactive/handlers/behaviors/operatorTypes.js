// 依赖收集的类型
export const TrackOpTypes = {
  GET: 'get',
  HAS: 'has',
  ITERATE: 'iterate'
}

// 触发器的类型
export const TriggerOpTypes = {
  SET: 'set',
  ADD: 'add',
  DELETE: 'delete'
}

// symbol 类型作为不会重复的特殊标识key
export const RAW = Symbol('raw')