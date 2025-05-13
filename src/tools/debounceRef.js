import { customRef } from 'vue'
import { debounce } from 'lodash'

export function debounceRef(value, delay) {
  return customRef((track, trigger) => {
    let _value = value;
    const _debounce = debounce((value) => {
      _value = value
      trigger()
    }, delay)
    return {
      get() {
        track()
        return _value
      },
      set(newVal) {
        // 调用debounce(newVal)
         _debounce(newVal)
      }
    }
  })
}