import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SettingView from "../views/SettingView.vue";
import store from "./../store";

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser;
  if (currentUser && currentUser.isAdmin === "1") {
    next("/login");
    return;
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "home",
    beforeEnter: authorizeIsUser,
    component: HomeView,
  },
  {
    path: "/settings",
    name: "settings",
    beforeEnter: authorizeIsUser,
    component: SettingView,
  },
];

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  let isAuthenticated;
  if (token) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
    console.log(isAuthenticated);
  }
  const userPathsWithoutAuthentication = ["login"];

  if (
    typeof isAuthenticated === "undefined" &&
    !userPathsWithoutAuthentication.includes(to.name)
  ) {
    next("/login");
    return;
  }
  if (
    typeof isAuthenticated !== "undefined" &&
    userPathsWithoutAuthentication.includes(to.name)
  ) {
    next("/dashboard");
    return;
  }
  next();
});

export default router;
