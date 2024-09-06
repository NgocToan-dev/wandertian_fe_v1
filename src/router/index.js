import { createRouter, createWebHistory } from "vue-router";
import { authenticationRoutes } from "./authentication";
import { adminRoutes } from "./admin";

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
