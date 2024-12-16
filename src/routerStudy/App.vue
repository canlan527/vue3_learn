<template>
  <div id="app">
    <h1>welcome to router world</h1>
    <nav>
      <!-- vue-router提供的组件 -->
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  color: cornflowerblue;
}
a {
  text-decoration: none;
  color: darkcyan;
  margin-right: 4px;
  font-size: 18px;
  padding: 2px 4px;
}
a:hover {
  background: rgba(200,200,200,0.7);
}
a:focus {
  background: rgba(0,0,0,0.1);
}

</style>