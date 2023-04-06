<template>
  <div class="base">
    <a-button @click="addOne">新增任务</a-button>
    <div class="initime">
      <a-input
        class="initime__input"
        v-model:value="initTimeRaw"
        placeholder="请输入起始时间"
      />
      <a-button class="initime__ok" @click="onConfirmInitTime">确定</a-button>
    </div>
    <a-button @click="setNowForStart">设定当前为起始时间</a-button>

    <a-list item-layout="vertical">
      <!-- <draggable v-model="list" :sortable="{ group: 'items', animation: 300 }"> -->
      <a-list-item v-for="(item, index) in list" :key="item.id">
        <div class="container">
          <span class="deadline">{{ `${item.deadline} 完成` }}</span>
          <a-input
            class="name"
            :style="{
              background: colorMap[item.priority],
              height: `${item.duration * 2}px`,
            }"
            v-model:value="item.name"
            placeholder="请写任务名"
          >
          </a-input>
          <a-radio-group
            v-model:value="item.priority"
            @change="priorityChanged"
          >
            <a-radio :value="3">高</a-radio>
            <a-radio :value="2">中</a-radio>
            <a-radio :value="1">低</a-radio>
          </a-radio-group>
          <a-radio-group
            v-model:value="item.duration"
            @change="onDurationChange"
          >
            <a-radio :value="10">10</a-radio>
            <a-radio :value="20">20</a-radio>
            <a-radio :value="30">30</a-radio>
            <a-radio :value="40">40</a-radio>
            <a-radio :value="50">50</a-radio>
            <a-radio :value="60">60</a-radio>
            <a-radio :value="90">90</a-radio>
            <a-radio :value="120">120</a-radio>
          </a-radio-group>

          <a-button class='delete'>删</a-button>
        </div>
      </a-list-item>
      <!-- </draggable> -->
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import dayjs from "dayjs";
// import draggable from "vuedraggable";

const colorMap = {
  3: "red",
  2: "purple",
  1: "green",
};

onMounted(() => {
  // localStorage.removeItem("list");
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
    save();
  }
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
  const hour = now.hour(); // 获取当前时间的小时部分
  const minute = now.minute(); // 获取当前时间的分钟部分

  const quotient = Math.floor(minute / 10);
  const remainder = minute / 10;
  const nextTenMin = remainder === 0 ? quotient : quotient + 1;

  initTime.value = hour * 60 + nextTenMin * 10;
  initTimeRaw.value = `${hour}:${nextTenMin * 10}`
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

const updateDeadline = () => {
  let pre = initTime.value;
  list.value = list.value.map((cur: any) => {
    cur.deadline = formatTime(pre + cur.duration);
    pre += cur.duration;
    return cur;
  });
};

const formatTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) return `${hours}点`;
  if (minutes !== 0) return `${hours}:${minutes}`;
};

const save = () => {
  localStorage.setItem("list", JSON.stringify(list.value));
};

const list = ref([]);
</script>

<style scoped lang="less">
.base {
  color: white;

  .initime {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .initime__input {
      width: 30%;
      text-align: center;
    }

    .initime__ok {
      width: 20%;
    }
  }

  .container {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .deadline {
      margin-left: 20px;
      font-size: 20px;
    }

    .name {
      width: 150px;
      white-space: wrap;
      text-align: center;
      color: white;
      margin-right: 10px;
      margin-left: 10px;
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
</style>
