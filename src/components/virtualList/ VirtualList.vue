<template>
  <div class="infinite-list-container" ref="list" @scroll="handleScroll">
    <!-- 列表总高度，目的是为了形成滚动 -->
    <div class="infinite-list-phantom" ref="listHeight">
      <!-- 可视区域，里面是列表项 -->
      <div class="infinite-list" ref="content">
        <div class="infinite-list-item" ref="items" v-for="item in visibleData" :key="item.id">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUpdated, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  itemHeight: {
    type: Number,
    default: 150
  },
  estimatedItemHeight: {
    type: Number,
    required: true,
  },
  bufferScale: { // 缓冲区相对于可视区域的比例
    type: Number,
    default: 1
  }
})
const { data, itemHeight, estimatedItemHeight, bufferScale } = props

// 引用 container 元素
const list = ref(null)
// 可视区域高度
const screenHeight = ref(0)
// 开始索引
const startIndex = ref(0)
// 结束索引
const endIndex = ref(0)
// 初始偏移量
// const startOffset = ref(0)
// 列表项的引用
const items = ref([])
// phantom 元素的引用
const listHeight = ref(null)
// infinite-list 元素的引用
const content = ref(null)

// 缓存列表，用于存储列表项的位置信息
let positions = []
// 用于初始化每个列表的位置信息
const initPositions = () => {
  positions = data.map((_, index) => ({
    index,
    height: estimatedItemHeight,
    top: index * estimatedItemHeight,
    bottom: (index + 1) * estimatedItemHeight
  }))
}

// 列表总高度
// const listHeight = computed(() => data.length * itemHeight)
// 可显示的列表项数
const visibleCount = computed(() => Math.ceil(screenHeight.value / itemHeight))

// 根据缓冲比例计算上下缓冲区要加载的列表项数量
const aboveItemsCount = computed(() => Math.min(startIndex.value, bufferScale * visibleCount.value))
const belowItemsCount = computed(() => Math.min(data.length - endIndex.value, bufferScale * visibleCount.value))
// 列表显示数据
// const visibleData = computed(() => data.slice(startIndex.value, Math.min(endIndex.value, data.length)))
const visibleData = computed(() => {
  let startIdx = startIndex.value - aboveItemsCount.value
  let endIdx = belowItemsCount.value + endIndex.value
  return data.slice(startIdx, Math.min(endIdx, data.length))
})
// 向下位移的距离
// const getTransformStyle = computed(() => ({transform: `translate3d(0, ${startOffset.value}px ,0)`}))
// const itemHeightStyle = computed(() => ({height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}))

const getStartIndex = (scrollTop) => {
  const item = positions.find((i) => (i && i.bottom > scrollTop))
  return item.index
}

// 滚动事件处理函数
const handleScroll = () => {
  let scrollTop = list.value.scrollTop
  // startIndex.value = Math.floor(scrollTop / itemHeight)
  startIndex.value = getStartIndex(scrollTop)
  endIndex.value = startIndex.value + visibleCount.value
  // startOffset.value = scrollTop - (scrollTop % itemHeight)
}

const updateItemSize = () => {
  items.value.forEach((node, index) => {
    // 真实高度
    let height = node.getBoundingClientRect().height
    // 获取初始的预估高度
    let oldHeight = positions[index].height
    // 取差值
    let dValue = oldHeight - height;
    // 如果存在差值，就要更新位置信息
    if (dValue) {
      positions[index].bottom -= dValue
      positions[index].height = height
      // 更新
      for (let i = index + 1; i < positions.length; i++) {
        positions[i].top = positions[index].bottom
        positions[i].bottom -= dValue
      }
    }
  })
}
// 更新偏移量
// const setStartOffset = () => {
//   let startOffset = startIndex.value >=1 ? positions[startIndex.value-1].bottom : 0;
//   content.value.style.transform = `translate3d( 0, ${startOffset}px, 0)`;
// }

const setStartOffset = () => {
  // 存储偏移量
  let startOffset;

  if (startIndex.value > 1) {
    // 走这里代表当前项不是第一项，需要计算startOffset
    // 计算当前可视区域的第一项的顶部位置与考虑上缓冲区后的有效偏移量
    // positions[startIndex.value].top 当前可视区域的第一项的顶部位置
    // positions[startIndex.value - aboveItemsCount.value].top 上缓冲区开始位置的顶端
    // 如果上缓冲区存在，则减去它的顶端位置；否则将 0 作为初始偏移量
    let size = positions[startIndex.value].top - (positions[startIndex.value - aboveItemsCount.value] ? positions[startIndex.value - aboveItemsCount.value].top : 0)

    // 计算 startOffset: 用当前可视区域第一项的前一项的底部位置，减去上面的size，
    // 这个 size 表示的是在考虑缓冲区后需要额外平移的偏移量
    startOffset = positions[startIndex.value-1].bottom - size
  } else {
    startOffset = 0
  }

  // 设置偏移量
  content.value.style.transform = `translate3d(0, ${startOffset}px, 0)`
}

onMounted(() => {
  screenHeight.value = list.value.clientHeight
  startIndex.value = 0
  endIndex.value = startIndex.value + visibleCount.value
  // 初始化列表信息
  initPositions()
})

onUpdated(() => {
  nextTick(() => {
    if (!items.value || !items.value.length) return
    // 1.更新列表项高度
    updateItemSize()
    // 2.更新虚拟列表的高度
    listHeight.value.style.height = `${positions[positions.length - 1].bottom}px`
    // 3.更新列表偏移量 
    setStartOffset()

  })
})

watch(() => data, initPositions)
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
    top: 0;
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