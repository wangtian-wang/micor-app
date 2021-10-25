<template>
  <div id="app2">
    <h1>micro-app2</h1>
    <button @click="goapp1">gogoapp1</button>
    <hr />
    <button @click="goappmain">go main</button>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App2",
    methods: {
      goapp1() {
        this.$router.push("/app1");
      },
      goappmain() {
        this.$router.push("/");
      },
    },
  };
</script>

<style></style>
