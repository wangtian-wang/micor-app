<template>
  <div id="main">
    <h1>container app page</h1>
    <div id="micro-container"></div>
    <button @click="goapp1">go app1</button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      goapp1() {
        this.$router.push("/app2");
      },
    },
  };
</script>

<style></style>
