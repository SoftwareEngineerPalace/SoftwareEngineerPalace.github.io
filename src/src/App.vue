<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import queryString from "query-string";
import { useRouter } from "vue-router";
let router = useRouter();

const path = queryString.parse(decodeURIComponent(window.location.search)).path;

if (!!path) {
  router.replace({ name: path });
}

console.log('router currentRoute', router.currentRoute);

if (router.currentRoute.value.path === '/task') {
  router.replace('/task');
} else if (router.currentRoute.value.path === '/gate') {
  router.replace('/gate');
}

</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  height: 100vh;
}

body {
  min-height: 100%;
  overflow: hidden;
  border: none;
  margin: 0;
  padding: 0;
}
</style>
