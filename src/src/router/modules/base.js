import Task from "@/pages/Task.vue";
import Gate from "@/pages/Gate.vue";
export default [
  {
    path: "/",
    redirect: "/task",
  },
  {
    path: "/task",
    name: "task",
    component: Task,
  },
  {
    path: "/gate",
    name: "gate",
    component: Gate,
  },
];
