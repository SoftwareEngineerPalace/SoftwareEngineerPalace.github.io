<template>
  <div class="base">
    <div class="container">
      <span class="title">访客通行</span>
      <div class="pic-container">
        <img src="/assets/code1.png" />
      </div>
      <span class="notice">动态二维码，截图无效</span>
      <span class="counterDown">{{ `${curSec}秒` }}</span>
      <span class="username">{{ username }}</span>
      <span class="time-notice">{{ timeNotice }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const InitNum = 11 ;
const curSec = ref(InitNum);
const username = ref("肖建军");
const timeNotice = ref("");

onMounted(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  timeNotice.value = `有效时间: ${year}-${month}-${day} 08:53:00至 ${year}-${month}-${day} 22:10:00`;

  setInterval(()=>{
    if( curSec.value === 0 ){
      curSec.value = InitNum;
    }else {
      curSec.value -- ;
    }
  }, 1000)

});
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  overflow: hidden;
  border: none;
}

body {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;

  .base {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #00a3e8;
    color: #0b7bf3;
    overflow: hidden;

    .container {
      margin-top: 42px;
      width: 360px;
      height: 556px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: white;
      border-radius: 7px;

      .title {
        margin-top: 35px;
        font-size: 20px;
      }

      .pic-container {
        margin-top: 10px;
        width: 240px;
        height: 240px;
        border: 4px solid #0b7bf3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;

        img {
          width: 232px;
          height: 232px;
          border-radius: 20px;
        }
      }

      .notice {
        margin-top: 5px;
      }

      .counterDown {
        color: #9899fe;
        margin-top: 20px;
        font-size: 32px;
      }

      .username {
        font-size: 21px;
        margin-top: 20px;
      }

      .time-notice {
        margin-top: 15px;
        font-size: 18px;
        padding-left: 30px;
        padding-right: 30px;
        text-align: center;
      }
    }
  }
}
</style>
