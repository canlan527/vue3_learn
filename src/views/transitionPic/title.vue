<template>
  <div class="container">
    <div class="btns">
      <button @click="show = !show">toggle</button>
    </div>
    <Transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="show" class="box">你好，Vue3</div>
    </Transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const show = ref(true)

function beforeEnter(el) {
  // 在元素进入之前，设置初始样式
  gsap.set(el, {
    opacity: 0,
    y: -20
  })
}

function enter(el, done) {
  gsap.to(el, {
    duration: 1,
    opacity: 1,
    y:0,
    onComplete: done
  })
}

function leave(el, done) {
  gsap.to(el, {
    duration: 1,
    opacity: 0,
    y: -20,
    onComplete:done    
  })
}

</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}

.btns button {
  margin: 1em 0.5em;
}

.box {
  width: 200px;
  height: 50px;
  background-color: #42b983;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
</style>