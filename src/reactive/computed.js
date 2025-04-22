import { effect } from "./effect/effect.js";
import trigger from "./effect/trigger.js";
import track from "./effect/track.js";
import { TrackOpTypes, TriggerOpTypes } from "./handlers/behaviors/operatorTypes.js";

// 工具函数：归一化参数
function normalizeParam(source) {
  let getter, setter;
  if(typeof source === 'function') {
    getter = source,
    setter = () => {
      console.warn('it has no setter function')
    }
  } else {
    getter = source.get
    setter = source.set
  }

  return {
    getter,
    setter
  }
}

export function computed(source) {
  // 参数归一化
  const { getter, setter } = normalizeParam(source)
  let tempVal, dirty = true;

  const effectFn = effect(getter, {
    lazy:  true,
    scheduler () {
      dirty = true,
      // 重新触发
      trigger(obj, TriggerOpTypes.SET, 'value')
    }
  })

  const obj = {
    get value() {
      track(obj, TrackOpTypes.GET, 'value')
      if(dirty) {
        tempVal = effectFn()
        dirty = false
      }
      return tempVal
    },
    set value(val) {
      setter(val)
    }
  }

  return obj
}