<template>
  <div class="base">
    <div class="topBar">
      <a-input
        class="initime__input"
        v-model:value="initTimeRaw"
        placeholder="请输入起始时间"
      />
      <a-button class="initime__ok" @click="onConfirmInitTime">确定</a-button>
      <a-button class="btn-now" @click="setNowForStart"
        >设定当前为起始时间</a-button
      >
      <a-button class="btn-add" @click="addOne">新增</a-button>
    </div>

    <div class="wrapper" ref="listRef">
      <div class="container" v-for="(item, index) in list" :key="item.id">
        <span class="deadline">{{ `${item.deadline}` }}</span>
        <a-textarea
          class="name"
          :autoSize="{ minRows: 1, maxRows: 6 }"
          :style="{
            color: colorMap[item.priority],
          }"
          v-model:value="item.name"
          placeholder="任务"
        >
        </a-textarea>
        <a-radio-group v-model:value="item.priority" @change="priorityChanged">
          <a-radio :value="3">高</a-radio>
          <a-radio :value="2">中</a-radio>
          <a-radio :value="1">低</a-radio>
        </a-radio-group>
        <a-radio-group v-model:value="item.duration" @change="onDurationChange">
          <a-radio :value="10">10</a-radio>
          <a-radio :value="20">20</a-radio>
          <a-radio :value="30">30</a-radio>
          <a-radio :value="40">40</a-radio>
          <a-radio :value="50">50</a-radio>
          <a-radio :value="60">60</a-radio>
          <a-radio :value="90">90</a-radio>
          <a-radio :value="120">120</a-radio>
        </a-radio-group>

        <a-button class="delete" @click="onDelete(index)">删</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import Sortable from "sortablejs";

const colorMap = {
  3: "#FF6B6B",
  2: "#FF9F1C",
  1: "#4ECDC4",
};

const listRef = ref(null);

onMounted(() => {
  localStorage.removeItem("list");
  const raw = localStorage.getItem("list");
  console.log("raw", raw);
  if (!!raw) {
    list.value = JSON.parse(raw);
  } else {
    list.value = Array(5)
      .fill(1)
      .map((v) => {
        return { name: "", duration: 10, deadline: "", priority: 3 };
      });
    updateDeadline();
    save();
  }

  new Sortable(listRef.value);
});

/** 方法 1 */
const addOne = () => {
  const one = { name: "", duration: 10, deadline: "", priority: 3 };
  list.value.push(one);

  updateDeadline();
  save();
};

/** 方法 2 */
const initTime = ref(8 * 60 + 30);
const initTimeRaw = ref("8:30");
const onConfirmInitTime = () => {
  const a = initTimeRaw.value.split(":");
  const b = initTimeRaw.value.split("：");
  const times = a.length === 2 ? a : b;
  const h = parseInt(times[0]);
  const m = parseInt(times[1]);
  initTime.value = h * 60 + m;

  updateDeadline();
  save();
};

const setNowForStart = () => {
  const now = dayjs(); // 获取当前时间
  let hour = now.hour(); // 获取当前时间的小时部分
  const minute = now.minute(); // 获取当前时间的分钟部分

  const quotient = Math.floor(minute / 10);
  const remainder = minute / 10;
  let nextTenMin = remainder === 0 ? quotient : quotient + 1;
  if (nextTenMin === 6) {
    hour++;
    nextTenMin = 0;
  }
  if( hour === 24 ){
    hour = 0;
  }

  initTime.value = hour * 60 + nextTenMin * 10;
  initTimeRaw.value = `${hour > 9 ? hour : "0" + hour}:${
    nextTenMin !== 0 ? nextTenMin * 10 : "00"
  }`;
  updateDeadline();
  save();
};

const priorityChanged = () => {
  console.log("priorityChanged");
  list.value = list.value.sort((a, b) => b.priority - a.priority);
  save();
};

const onDurationChange = () => {
  console.log("onDurationChange");
  updateDeadline();
  save();
};

const onDelete = (index) => {
  list.value = list.value.slice(0, index).concat(list.value.slice(index + 1));
};

const updateDeadline = () => {
  let pre = initTime.value;
  list.value = list.value.map((cur: any) => {
    cur.deadline = formatTime(pre + cur.duration);
    pre += cur.duration;
    return cur;
  });
};

const formatTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60);
  if( hours >= 24){
    hours = (hours % 24);
  }
  const houreStr = `${hours > 9 ? hours : "0" + hours}`;
  const minutes = totalMinutes % 60;
  if (minutes === 0) return `${houreStr}:00`;
  if (minutes !== 0)
    return `${houreStr}:${minutes > 9 ? minutes : "0" + minutes}`;
};

const save = () => {
  localStorage.setItem("list", JSON.stringify(list.value));
};

const list = ref<any>([]);
</script>

<style scoped lang="less">
.base {
  color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .topBar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0 20px 0;

    .initime__input {
      width: 30%;
      text-align: center;
    }

    .initime__ok {
      width: 20%;
    }
  }

  .btn-now {
    align-self: flex-end;
  }

  .btn-add {
    align-self: center;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .container {
      width: 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px gainsboro dashed;

      .deadline {
        margin-left: 10px;
        font-size: 20px;
        white-space: nowrap;
        color: chocolate;
      }

      .name {
        width: 150px;
        white-space: wrap;
        text-align: center;
        color: white;
        margin-right: 10px;
        margin-left: 10px;
        font-weight: 500;
        background: #eeeeee;
        padding: 0;
        text-align: center;
      }

      .delete {
        width: 25px;
        flex-shrink: 0;
        font-size: 10px;
        text-align: center;
        letter-spacing: 0;
        margin-right: 5px;
        padding: 0;
      }
    }
  }
}
</style>
