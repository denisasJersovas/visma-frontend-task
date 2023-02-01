import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/new-coach",
  },
  {
    path: "/coaches",
    name: "coaches",
    component: () => import("../views/Coaches.vue"),
  },
  {
    path: "/new-coach",
    name: "New coach",
    component: () => import("../views/NewCoach.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/new-user",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
