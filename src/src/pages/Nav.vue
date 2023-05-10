<template>
  <div class="base">
    <router-link to="/gate">大门</router-link>
    <router-link to="/work">工作</router-link>
    <router-link to="/life">生活</router-link>
  </div>
</template>
<style lang="less" scoped>
.base {
  width: 100vw;
  height: 100vh;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}
</style>
