<template>
  <div>
    <h1>count: {{ counterStore.count }}</h1>

    <button class="btn btn-primary" @click="counterStore.increment">+1</button>
    <button class="btn btn-success" @click="counterStore.decrement">-1</button>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import { useCounterStore } from './store/useCounterStore';
const counterStore = useCounterStore()
</script>

<style lang="scss" scoped>
</style>