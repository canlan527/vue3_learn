<template>
  <div>
    <!-- transition css -->
    <banner/>
    <hr>
    <!-- js -->
     <titled />
     <!-- 图片懒加载 -->
    <LazyLoad />
  </div>
</template>

<script setup>
import banner from './banner.vue';
import titled from './title.vue';
import LazyLoad from './lazyLode/LazyLoad.vue';
</script>