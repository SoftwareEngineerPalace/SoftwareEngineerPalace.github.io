<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import queryString from "query-string";
import { useRouter, useRoute } from "vue-router";
let router = useRouter();

const name = queryString.parse(decodeURIComponent(window.location.search)).name;
console.log('App.vue name', name)
if (name === "siyu") {
  router.replace({ name: "siyu" });
}
</script>s
<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100vh;
  overflow: hidden;
}

body {
  min-height: 100%;
  overflow: hidden;
  border: none;
  margin: 0;
  padding: 0;
}
</style>
