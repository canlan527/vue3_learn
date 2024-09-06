<template>
  <div>
    <div :class="demoClass">
      <h1 :class="[titleClass, sliderClass]">灿烂</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const isSliderShow = ref(false)

const demoClass = reactive({
  'green': true,
  'active': false,
  'position-relative': true
})

// computed
const sliderClass = computed(() => {
  return {
    'slider': isSliderShow.value,
  }
})

const titleClass = reactive({
  'position-absolute': true,
})

setTimeout(() => {
  isSliderShow.value = true
}, 2000)

</script>

<style lang="scss" scoped>
.position-relative {
  position: relative;
  width: 300px;
  height: 100px;
}

.position-absolute {
  position: absolute;
  top: 0;
  left: 0;
}

.slider {
  right: 0;
  transform: translateX(260px);
  transition: all 1s ease-in-out;
}
</style>