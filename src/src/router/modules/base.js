import Task from "@/pages/Task.vue";
import Gate from "@/pages/Gate.vue";
import Nav from "@/pages/Nav.vue";
export default [
  {
    path: '/',
    name: 'nav',
    component: Nav,
  },
  {
    path: '/index.html',
    name: 'nav',
    component: Nav,
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
