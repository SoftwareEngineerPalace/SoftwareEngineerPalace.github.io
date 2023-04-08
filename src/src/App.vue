<template>
  <router-link to="/gate">uibe-gate</router-link>
  <router-link to='/task'>daily-task</router-link>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import queryString from "query-string";
import { useRouter } from "vue-router";
let router = useRouter();
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
