import { createRouter, createWebHistory } from "vue-router";
import { authenticationRoutes } from "./authentication";
import { adminRoutes } from "./admin";
import { blogRoutes } from "./blog";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  // redirect all not existing routes to login
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

export default router;
