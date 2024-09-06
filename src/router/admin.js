export const adminRoutes = [
  {
    path: "/admin",
    redirect: "/admin/task",
    component: () => import("@/views/admin/AdminIndex.vue"),
    children: [
      {
        path: "task",
        component: () => import("@/views/admin/mainContent/task/TaskList.vue"),
      },
    ],
  },
];
