import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import paths from "@/router/paths";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import BoardPage from "../views/BoardPage.vue";

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
    path: paths.register,
    name: "Register",
    component: Register,
  },
  {
    path: paths.userBoard,
    name: "BoardPage",
    component: BoardPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
