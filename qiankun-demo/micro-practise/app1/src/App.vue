<template>
  <div id="micro-app1">
    <h1>micro-app1!!!!!!!</h1>
    <button @click="goapp2">go app2</button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App1",
    methods: {
      goapp2() {
        this.$router.push("/app2");
      },
    },
  };
</script>

<style></style>
