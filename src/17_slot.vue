<template>
  <div>
    插槽的基本使用 插槽、具名插槽
    <card>
      <!-- <template v-slot:header>这是父元素的标题</template> -->
       <!-- 简写 -->
      <template #header>这是父元素的标题</template>
      <p>这是父元素的内容</p>
    </card>
    不添加内容的插槽
    <card></card>
    作用域插槽
     <card>
       <!-- <template v-slot="slotProps">
          <p>{{ slotProps.text }}</p>
          <p>{{ slotProps.count }}</p>
       </template> -->
       <!-- 直接解构使用 -->
        <template v-slot="{text, count}">
          <p>{{ text }}</p>
          <p>{{ count }}</p>
        </template>
     </card>
  </div>
</template>

<script setup>
import Card from './components/card/Card.vue';
</script>

<style lang="scss" scoped>

</style>