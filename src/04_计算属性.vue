<template>
  <div>
    <h1>{{ displayName }}</h1>
    <h3>{{ fullName }}</h3>
    <h3>Owned Books:</h3>
    <h2>{{ isOwnedBooks }}</h2>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Reese')

const author = reactive({
  name: 'Harry',
  books: ['Harry Potter', 'The Lord of the Rings', 'The Hunger Games']
})


// 可写计算属性
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newName) => {
    console.log(newName); // ;是必要的，否则会报错-> vite 编译问题
    [firstName.value, lastName.value] = newName.split(' ')
  }
})

const displayName = computed({
  get() {
    return author.name + " 's Collections "
  },
  set(value) {
    console.log(value)
    author.name = value.split(' ')[1]
  }

})
// 基础计算属性
const isOwnedBooks = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

setTimeout(() => {
  author.books = []
}, 2000)

setTimeout(() => {
  fullName.value = 'Jane Doe'
}, 3000)

setTimeout(() => {
  displayName.value = 'Mary Smith'
}, 4000)

</script>

<style lang="scss" scoped></style>