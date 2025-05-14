<template>
  <div>
      <h1>图片懒加载</h1>
      <div class="image-grid">
        <img
        v-observe-visibility="{
          callback: visibilityChanged,
          once: true,
          intersection: {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
          }
        }"
        v-for="(url, index) in imageUrls" 
        :key="index"
        :src="loadingImage" 
        :data-src="url" 
        :alt="'Image ' + (index + 1)"
        @error="handleError"
        >
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrls = ref([])
// 往imageUrls添加50个url
for(let i = 0; i < 50; i++) {
  imageUrls.value.push(`https://placehold.co/600x400?text=Image+${i + 1}`)
  // https://placehold.co/600x400/FF0000/FFFFFF?text=Image+1
}
const loadingImage = 'https://dummyimage.com/600x400/cccccc/000000&text=Loading'

const errorImage = 'https://dummyimage.com/600x400/ff0000/ffffff&text=Error'

function visibilityChanged (visibility, entry) {
  console.log(visibility, entry)
  const img = entry.target
  if(visibility) {
    img.src = img.dataset.src
  }
}

// 图片加载失败时的处理函数
function handleError(event) {
  const img = event.target
  img.src = errorImage
}

</script>

<style lang="scss" scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
}
.image-grid img {
  display: block;
  margin: 10px;
  width: 200px;
  height: 150px;
  object-fit: cover;
}
</style>