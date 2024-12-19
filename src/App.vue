<template>
  <div id="app">
    <nav>
      <router-link to="/">计数器</router-link>
      <router-link to="/text">文本输入</router-link>
      <router-link to="/checkboxList">复选框列表</router-link>
      <router-link to="/timer">定时器</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <KeepAlive include="Counter,TextInput,CheckboxList">
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}

nav a:hover {
  text-decoration: underline;
}
</style>