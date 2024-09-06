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
    redirect: "/login",
  },
  ...authenticationRoutes,
  ...adminRoutes, 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
