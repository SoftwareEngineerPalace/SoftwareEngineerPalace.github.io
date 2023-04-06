<template>
  <div class="base">
    <div class="addOne">
      <a-form :model="formState" name="basic" class="add-one-form" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }"
        @finish="createOne" @finishFailed="onFinishFailed">
        <a-form-item label="任务" name="name">
          <a-input v-model:value="formState.name" placeholder="请输入任务" />
        </a-form-item>

        <a-form-item label="时长(分钟) " name="duration" required>
          <a-radio-group v-model:value="formState.duration">
            <a-radio :value="10">10</a-radio>
            <a-radio :value="20">20</a-radio>
            <a-radio :value="30">30</a-radio>
            <a-radio :value="40">40</a-radio>
            <a-radio :value="50">50</a-radio>
            <a-radio :value="60">60</a-radio>
            <a-radio :value="90">90</a-radio>
            <a-radio :value="120">120</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="优先级" name="priority" required>
          <a-radio-group v-model:value="formState.priority">
            <a-radio :value="3">高</a-radio>
            <a-radio :value="2">中</a-radio>
            <a-radio :value="1">低</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div>
      <a-form :model="formState_time" class="set-init-time" :label-col="{ span: 4 }"
        :wrapper-col="{ span: 10 }" @finish="setInitTime" @finishFailed="onSetTimeFailed">
        <a-form-item label="设置起始时间" name="initTime" required>
          <a-input v-model:value="formState_time.initTime" placeholder="请输入起始时间" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>

    <a-list item-layout="vertical">
      <!-- <draggable v-model="list" :sortable="{ group: 'items', animation: 300 }"> -->
      <a-list-item v-for="(item, index) in list" :key="item.id">
        <div class="container">
          <span class="deadline">{{ `${item.deadline} 完成` }}</span>
          <a-input class="name" :style="{
            background: colorMap[item.priority],
            height: `${item.duration * 2}px`,
          }" v-model:value="item.name" placeholder="请写任务名">
          </a-input>
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
        </div>
      </a-list-item>
      <!-- </draggable> -->
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import dayjs from 'dayjs'
// import draggable from "vuedraggable";

interface FormState {
  name: string;
  duration: number;
  priority: number;
  deadline: string;
}

interface TimeFormState {
  initTime: string;
}

const colorMap = {
  3: "red",
  2: "purple",
  1: "green",
};

onMounted(() => {
  // localStorage.removeItem("list");
  const raw = localStorage.getItem("list");
  if (!!raw) {
    list.value = JSON.parse(raw);
  }
});

const formState = reactive<FormState>({
  name: "",
  duration: 20,
  priority: 3,
  deadline: '9:30',
});

const formState_time = reactive<TimeFormState>({
  initTime: '9:30'
});

const createOne = (v: any) => {
  list.value.push(v);
  localStorage.setItem("list", JSON.stringify(list.value));
  updateDuration()
};

const onFinishFailed = (v) => {
  console.log("onFinishFailed", v);
};

const onSetTimeFailed = (v) => {
  console.log("onFinishFailed", v);
};

const priorityChanged = () => {
  console.log("priorityChanged");
  list.value = list.value.sort((a, b) => b.priority - a.priority);
  localStorage.setItem("list", JSON.stringify(list.value));
};

const onDurationChange = () => {
  updateDuration();
}

// 启点时间是 9:30 
const initTime = ref(9 * 60 + 30);

const setInitTime = (value) => {
  console.log('setInitTime', value);
  const a = value.initTime.split(':');
  const b = value.initTime.split('：');
  const times = a.length === 2 ? a : b;
  const h = parseInt(times[0]);
  const m = parseInt(times[1]);
  initTime.value = h * 60 + m;
  updateDuration();
}

const updateDuration = () => {
  let pre = initTime.value;
  list.value = list.value.map((cur: any) => {
    cur.deadline = formatTime(pre + cur.duration);
    pre += cur.duration;
    return cur;
  });
  console.log('updateDuration', list.value)
}

const formatTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (minutes === 0) return `${hours}点`;
  if (minutes !== 0) return `${hours}:${minutes}`;
}

const list = ref([]);
</script>

<style scoped lang="less">
a {
  color: #42b983;
}

.base {
  color: white;

  .add-one-form {
    width: 100vw;
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
  }
}
</style>
