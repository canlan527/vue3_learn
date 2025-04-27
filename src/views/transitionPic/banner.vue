<template>
  <div class="container">
    <h1>图片轮播</h1>
    <div class="btns">
      <button @click="prev">上一张</button>
      <button @click="next">下一张</button>
    </div>
    <Transition :name="`${direction}-image`">
      <img class="image" :key="curIndex" :src="curImage" alt="no data">
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const curIndex = ref(0)
const images = [
  'https://i.pinimg.com/736x/c0/41/f5/c041f54df898c36f2e703ec801c66575.jpg',
  'https://i.pinimg.com/736x/e2/c2/a7/e2c2a716a3b0602694bb649f953f2de8.jpg',
  'https://i.pinimg.com/736x/22/8c/00/228c001a984043fe71ae898865af1bdf.jpg',
  'https://i.pinimg.com/736x/6d/e2/ff/6de2ff539811cf23e54f90b50e57273b.jpg',
  'https://i.pinimg.com/736x/2b/ab/16/2bab167973fa87877ca60622ceb75238.jpg'
]
const direction = ref('next')
// 根据当前索引返回图片
const curImage = computed(() => images[curIndex.value])
// 最大索引值
const maxIndex = computed(() => images.length - 1)

function prev() {
  curIndex.value--
  if(curIndex.value < 0) {
    curIndex.value = maxIndex.value
  }
  direction.value = 'prev'
}

function next() {
  curIndex.value++
  if(curIndex.value > maxIndex.value) {
    curIndex.value = 0
  }
  direction.value = 'next'
}



</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
.btns button {
  margin: 1em  0.5em;
}

.image {
  width: 200px;
  height: 340px;
  border-radius: 12px;
}

.next-image-enter-active,
.next-image-leave-active,
.prev-image-enter-active,
.prev-image-leave-active {
  transition: 0.5s;
}

.next-image-enter-from,
.next-image-leave-to,
.prev-image-enter-from,
.prev-image-leave-to {
  opacity: 0;
}

.next-image-enter-from,
.prev-image-leave-to {
  transform: translateX(200px);
}

.next-image-leave-to,
.prev-image-enter-from {
  transform: translateX(-200px);
}
</style>