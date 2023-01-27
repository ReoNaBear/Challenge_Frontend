import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import SettingView from "../views/SettingView.vue";
import QRcodeView from "../views/QRcodeView.vue";
import NotFound from "../views/NotFound.vue";
import store from "./../store";

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser;
  if (!currentUser) {
    next("/login");
    return;
  }
  if (currentUser && currentUser.isAdmin === 1) {
    next("/admin");
    return;
  }
  next();
};

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser;
  if (!currentUser) {
    next("/login");
    return;
  }
  if (currentUser && currentUser.isAdmin === 0) {
    next("/dashboard");
    return;
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin",
    name: "admin",
    beforeEnter: authorizeIsAdmin,
    component: AdminView,
  },
  {
    path: "/qrcode",
    name: "qrcode",
    beforeEnter: authorizeIsAdmin,
    component: QRcodeView,
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
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
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
    if (store.currentUser.isAdmin === 0) {
      next("/dashboard");
      return;
    }
    next("/admin");
    return;
  }
  next();
});

export default router;
