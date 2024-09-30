export const adminRoutes = [
  {
    path: "/admin",
    redirect: "/admin/task",
    component: () => import("@/views/admin/AdminIndex.vue"),
    children: [
      {
        path: "task",
        name: "task",
        component: () => import("@/views/admin/mainContent/task/TaskList.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import("@/views/admin/mainContent/dashboard/Dashboard.vue"),
      },
      {
        path: "post",
        name: "post",
        component: () => import("@/views/admin/mainContent/post/PostList.vue"),
      },
      {
        path: "post/:id",
        name: "postEditor",
        component: () =>
          import("@/views/admin/mainContent/post/PostEditor.vue"),
      },
    ],
  },
];
