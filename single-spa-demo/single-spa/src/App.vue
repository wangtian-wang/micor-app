<template>
  <div id="app">
      <router-link to="/subapp">sub-app</router-link>
      <!-- 挂ོ载ོ子ོ应ོ用ོ的ོ容ོ器ོ 和ོ子ོ应ོ用ོ导ོ出ོ的ོ$el相ོ同ོ-->
      <div id="subapp"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
