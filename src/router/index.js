import { createRouter, createWebHistory } from "vue-router";
import { authenticationRoutes } from "./authentication";
import { adminRoutes } from "./admin";
import { blogRoutes } from "./blog";
import commonFn from "@/utilities/commonFn";
import RoleEnum from "@/utilities/enum/RoleEnum";

const routes = [
  // redirect all not existing routes to login
  {
    path: "/",
    redirect: "/homepage",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/pages/404.vue"),
  },
  {
    path: "/logout",
  },
  ...authenticationRoutes,
  ...adminRoutes,
  ...blogRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // everyone can go to only homepage
  // But admin can only go to admin pages
  // user login can only go to blog pages

  const isLogin = commonFn.checkCookieExpired("accessToken");
  const isAdmin = commonFn.getCookie("role") == RoleEnum.ADMIN;

  if (to.path === "/login" && isLogin) {
    return next("/homepage");
  }
  // if logout call logout function
  if (to.path === "/logout") {
    commonFn.logout();
    return next("/login");
  }
  if (to.path.includes("/admin") && (!isLogin || !isAdmin)) {
    return next("/404");
  }
  next();
});

export default router;
