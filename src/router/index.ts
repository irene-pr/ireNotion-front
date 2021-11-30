import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import paths from "@/utils/paths";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: paths.home,
    name: "Home",
    component: Home,
  },
  {
    path: paths.login,
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
