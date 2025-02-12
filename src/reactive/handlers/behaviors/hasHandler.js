import track from '../../effect/track.js'
import { TrackOpTypes } from './operatorTypes.js'

export default function (target, key) {
  // 收集依赖
  track(target, TrackOpTypes.HAS, key)
  // has
  return Reflect.has(target, key)
}