import track from "../../effect/track.js"
import { TrackOpTypes } from "./operatorTypes.js"

export default function (target) {
  // 收集依赖
  track(target, TrackOpTypes.ITERATE)  

  // 底层操作
  return Reflect.ownKeys(target)
}