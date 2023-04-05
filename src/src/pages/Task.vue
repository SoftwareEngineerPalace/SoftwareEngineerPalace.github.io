<template>
  <div class="base">
    <div class="addOne">
      <a-form
        :model="formState"
        name="basic"
        class="add-one-form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 10 }"
        @finish="createOne"
        @finishFailed="onFinishFailed"
      >
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
    <a-list item-layout="vertical">
      <!-- <draggable v-model="list" :sortable="{ group: 'items', animation: 300 }"> -->
      <a-list-item v-for="(item, index) in list" :key="item.id">
        <div class="container">
          <!-- <span>{{ `第${index}个` }}</span> -->
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
          <a-radio-group v-model:value="item.duration">
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
import draggable from "vuedraggable";

interface FormState {
  name: string;
  duration: number;
  priority: number;
}

const colorMap = {
  3: "red",
  2: "purple",
  1: "green",
};

onMounted(() => {
  // localStorage.removeItem("list");
  const raw = JSON.parse(localStorage.getItem("list"));
  console.log("raw", raw);
  list.value = raw ?? [];
});

const formState = reactive<FormState>({
  name: "",
  duration: 20,
  priority: 3,
});

const createOne = (v) => {
  list.value.push(v);
  localStorage.setItem("list", JSON.stringify(list.value));
};

const onFinishFailed = (v) => {
  console.log("onFinishFailed", v);
};

const priorityChanged = () => {
  console.log("priorityChanged");
  list.value = list.value.sort((a, b) => b.priority - a.priority);
  localStorage.setItem("list", JSON.stringify(list.value));
};

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
