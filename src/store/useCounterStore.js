import { defineStore } from "pinia";
import { ref } from 'vue'
// export const useCounterStore = defineStore('counter', {
//   // 定义状态数据
//   state: () => {
//     return {
//       count: 0
//     }
//   },
//   // 修改数据的方法
//   actions: {
//     increment() {
//       this.count ++;
//     },
//     decrement() {
//       this.count--;
//     }
//   }
// })


// composition api
export const useCounterStore = defineStore('counter' , () => {
  // 定义状态数据
  const count = ref(0)

  // 修改状态数据的方法
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }
  return {
    count,
    increment,
    decrement
  }
})