<template>
  <div class="card">
    <div class="card-header">
      <!-- 具名插槽 -->
       <slot name="header">
        <p>默认header内容</p>
       </slot>
    </div>
    <div class="card-body">
      <!-- 默认插槽 -->
       <!-- 传值给父组件 -->
      <slot :text="childData" :count="1">
        <p>默认body内容</p>
      </slot>
  
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const childData = ref('这是子组件的数据')

</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px;
}

.card-header {
  background-color: #f7f7f7;
  border-bottom: 1px solid #ececec;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-body {
  padding: 15px;
  font-size: 14px;
  color: #333;
}
</style>