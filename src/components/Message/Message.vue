<template>
  <div role="alert" :class="['alert', 'alert-dismissible', `alert-${type}`]">
    <button type="button" class="close" aria-label="Close" @click="closeAlert">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>提示！</strong> {{ alert }}
  </div>
</template>

<script setup>
defineProps({
  type: String,//消息的类型
  alert: String,// 消息的内容
})
const emit = defineEmits(['close'])
const closeAlert = () => {
  // 触发父组件的 close 事件
  emit('close')
}
</script>

<style lang="scss" scoped></style>