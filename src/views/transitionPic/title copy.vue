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

const show = ref(true)

function beforeEnter(el) {
  // 在元素进入之前，设置初始样式
  el.style.opacity=0
  el.style.transform = `translateY(-20px)`
}

function enter(el, done) {
  setTimeout(() => {
    el.style.transition = 'all 1s'
    el.style.opacity = 1
    el.style.transform = 'translateY(0)'
    done()
  })
}

function leave(el, done) {
  el.style.transition = 'all 1s'
  el.style.opacity = 0
  el.style.transform = 'translateY(-20px)'
  setTimeout(() =>{
    done()
  }, 1000)
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