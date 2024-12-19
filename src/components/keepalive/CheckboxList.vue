<template>
  <div class="component">
    <div class="checkbox-item" v-for="item in items" :key="item.name">
      <label>
        <input type="checkbox" v-model="item.checked">
        {{ item.name }}
      </label>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const items = ref([
  {name: '选项一', checked: false},
  {name: '选项二', checked: false},
  {name: '选项三', checked: false},
])
</script>

<script>
export default {
  name: 'CheckboxList'
}
</script>

<style scoped>
.component {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  color: #333;
}
.checkbox-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
label {
  font-size: 1.2em;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.component label > div {
  width: 100px;
}
input[type='checkbox'] {
  margin-left: 10px;
}
</style>