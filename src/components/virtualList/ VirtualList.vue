<template>
  <div class="infinite-list-container" ref="list" @scroll="handleScroll">
    <!-- 列表总高度，目的是为了形成滚动 -->
    <div class="infinite-list-phantom" :style="{height: `${listHeight}px`}">
      <!-- 可视区域，里面是列表项 -->
      <div class="infinite-list" :style="getTransformStyle">
        <div class="infinite-list-item" v-for="item in visibleData" :key="item.id" :style="itemHeightStyle">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  itemHeight: {
    type: Number,
    default: 150
  }
})
// 引用 container 元素
const list = ref(null) 
// 可视区域高度
const screenHeight = ref(0)
// 开始索引
const startIndex = ref(0)
// 结束索引
const endIndex = ref(0)
// 初始偏移量
const startOffset = ref(0)

// 列表总高度
const listHeight = computed(() => props.data.length * props.itemHeight)
// 可显示的列表项数
const visibleCount = computed(() => Math.ceil(screenHeight.value / props.itemHeight))
// 列表显示数据
const visibleData = computed(() => props.data.slice(startIndex.value, Math.min(endIndex.value, props.data.length)))
// 向下位移的距离
const getTransformStyle = computed(() => ({transform: `translate3d(0, ${startOffset.value}px ,0)`}))
const itemHeightStyle = computed(() => ({height: `${props.itemHeight}px`, lineHeight: `${props.itemHeight}px`}))

// 滚动事件处理函数
const handleScroll = () => {
  let scrollTop = list.value.scrollTop
  startIndex.value = Math.floor(scrollTop / props.itemHeight)
  endIndex.value = startIndex.value + visibleCount.value
  startOffset.value = scrollTop - (scrollTop % props.itemHeight)
}

onMounted(() => {
  screenHeight.value = list.value.clientHeight
  startIndex.value = 0
  endIndex.value = startIndex.value + visibleCount.value
})
</script>

<style lang="scss" scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    z-index: -1;
    .infinite-list {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      text-align: center;
      &-item {
        padding: 10px;
        color: #555;
        box-sizing: border-box;
        border-bottom: 1px solid #999;
      }
    }
  }
}
</style>