import Work from "@/pages/Work.vue";
import Life from "@/pages/Life.vue";
import Gate from "@/pages/Gate.vue";
import Nav from "@/pages/Nav.vue";
export default [
  {
    path: "/",
    name: "nav",
    component: Nav,
  },
  {
    path: "/index.html",
    name: "nav",
    component: Nav,
  },
  {
    path: "/work",
    name: "work",
    component: Work,
  },
  {
    path: "/life",
    name: "life",
    component: Life,
  },
  {
    path: "/gate",
    name: "gate",
    component: Gate,
  },
];
