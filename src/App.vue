<template>
  <div>
    <h1>表单处理</h1>
    <h2>input输入框</h2>
    <!-- input -->
    <!-- <input type="text" :value="message" @input="(e) => message = e.target.value"> -->
    <input type="text" v-model="message">
    <p>input的值：{{ message }}</p>

    <!-- textarea -->
    <h2>textarea</h2>
    <textarea cols="30" rows="10" v-model="message" />
    <p>textarea的值： {{ message }}</p>

    <!-- checkbox -->
    <h2>单个复选框</h2>
    <label for="check">统一协议：</label>
    <!-- <input type="checkbox" id="check"  v-model="flag" @click="flag=!flag">同意
    <p>flag:{{ flag }}</p> -->
    <!-- <input type="checkbox" id="check" v-model="flag" :true-value="customTrue" :false-value="customFalse"
      @click="flag === 'yes' ? 'no': 'yes' ">同意 -->
    <input type="checkbox" id="check" v-model="flag" :true-value="customTrue" :false-value="customFalse"
      @click="toggle">
    <p>flag:{{ flag }}</p>

    <!-- 多个复选框 -->
    <h2>多个复选框</h2>
    <div class="hobby-list" v-for="(item, index) in hobbylist" :key="item.id">
      <label for="item.id">{{ item.title }}</label>
      <input type="checkbox" id="item.id" v-model="hobby" :value="item.value">
    </div>
    <p>{{ hobbies }}</p>


    <!-- radio -->

    <!-- select -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const message = ref('')
// const flag = ref(true)
const flag = ref('yes')

// 自定义真假值
const customTrue = ref('yes')
const customFalse = ref('no')

function toggle() {
  return flag === 'yes' ? 'no' : 'yes'
}
// 复选框列表
const hobby = ref([])
// 复选数据
const hobbylist = ref([
  { id: 'swim', title: '游泳', value: '游个泳' },
  { id: 'run', title: '跑步', value: '跑个步' },
  { id: 'game', title: '游戏', value: '玩个游戏' },
  { id: 'music', title: '音乐', value: '听个音乐' },
  { id: 'movie', title: '电影', value: '看个电影' }
])

const hobbies = computed(() => {
  if (hobby.value.length === 0) return `请选择您的爱好:`;
  else return `您选择了${hobby.value.join('、')}`
})



const gender = ref(false)

const sexlist = ref([
  {}
])

</script>

<style lang="scss" scoped></style>