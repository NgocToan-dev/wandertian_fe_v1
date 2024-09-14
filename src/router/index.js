import { createRouter, createWebHistory } from "vue-router";
import { authenticationRoutes } from "./authentication";
import { adminRoutes } from "./admin";
import { blogRoutes } from "./blog";

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
  ...authenticationRoutes,
  ...adminRoutes,
  ...blogRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isAdmin = localStorage.getItem("user") === "admin";
  if (to.path.startsWith("/admin") && !isAdmin && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
