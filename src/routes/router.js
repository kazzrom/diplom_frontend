import { createRouter, createWebHashHistory } from "vue-router";
import StudentsListPage from "@/pages/StudentsListPage/StudentsListPage.vue";
import StartPage from "@/pages/StartPage/StartPage.vue";

const routes = [
  { path: "/", component: StartPage },
  { path: "/students", component: StudentsListPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
