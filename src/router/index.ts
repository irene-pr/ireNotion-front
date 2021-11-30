import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import paths from "@/utils/paths";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Board from "../views/Board.vue";

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
  {
    path: paths.userBoard,
    name: "Board",
    component: Board,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
