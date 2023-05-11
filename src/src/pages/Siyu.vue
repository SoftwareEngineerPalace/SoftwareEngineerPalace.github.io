<template>
  <div class="base">
    <div class="container">
      <span class="title">访客通行</span>
      <div class="pic-container">
        <!-- <img :src="imgUrl" /> -->
        <div class="qrcode" id="qrcode"></div>
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
import queryString from "query-string";

const InitNum = 11;
const curSec = ref(InitNum);
const name = queryString.parse(decodeURIComponent(window.location.search)).name;
const username = ref(name ?? "张丝雨");
const timeNotice = ref("");
const code1 = "/assets/code1.png";
const code2 = "/assets/code2.png";
const imgUrl = ref(code1);

onMounted(() => {
  // imgUrl.value = code1;
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  timeNotice.value = `有效时间:  ${year}-${month}-${day} 08:53:00至 ${year}-${month}-${day} 22:10:00`;

  // 二维码
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "http://example.com",
    width: 210,
    height: 210,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  // qrcode._htOption.width = 60; // 修改小码眼宽度
  // qrcode._htOption.height = 60; // 修改小码眼高度
  qrcode.makeCode("http://www.uibe.edu.cn?n=" + Math.random());

  setInterval(() => {
    if (curSec.value === 1) {
      curSec.value = InitNum;
      qrcode.makeCode("http://www.uibe.edu.cn?n=" + Math.random());
    } else {
      curSec.value--;
    }
  }, 1000);
});
</script>

<style lang="less" scoped>
.base {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(72, 160, 226);
  overflow: hidden;
  color: rgba(55, 122, 235);

  .container {
    margin-top: 38px;
    width: 360px;
    height: 530px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    border-radius: 7px;

    .title {
      margin-top: 35px;
      font-size: 19px;
      font-weight: 600;
    }

    .pic-container {
      margin-top: 8px;
      width: 228px;
      height: 228px;
      border: 4px solid #037cf3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;

      .qrcode {
        width: 210px; // 220px
        height: 210px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .notice {
      margin-top: 5px;
      font-weight: 600;
    }

    .counterDown {
      color: #9899fe;
      margin-top: 20px;
      font-size: 32px;
      font-weight: 600;
    }

    .username {
      font-size: 23px;
      margin-top: 20px;
      font-weight: 600;
    }

    .time-notice {
      margin-top: 10px;
      font-weight: 600;
      font-size: 18px;
      padding-left: 30px;
      padding-right: 30px;
      text-align: center;
    }
  }
}
</style>
