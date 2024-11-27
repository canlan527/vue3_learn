<template>
  <div class="app-container">
    <card>
      <!-- <template v-slot:item="{item}">
        <h3>{{ item.title }}</h3>
        <p>{{ item.defaultText }}</p>
      </template> -->
      <!-- 简写+解构 -->
      <template #item="{item}">
        <h3>{{ item.title }}</h3>
        <p>{{ item.defaultText }}</p>
      </template>
    </card>
  </div>
</template>

<script setup>
import Card from './components/card/Card2.vue';

</script>

<style>
.app-container {
  padding: 20px;
}
</style>