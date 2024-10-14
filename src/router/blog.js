export const blogRoutes = [
  {
    path: "/",
    component: () => import("@/views/blog/BlogIndex.vue"),
    children: [
      {
        path: "homepage",
        component: () => import("@/views/blog/homepage/Homepage.vue"),
      },
      {
        path: "study-with-me",
        component: () => import("@/views/blog/studyWithMe/StudyWithMe.vue"),
      },
      {
        path: "search-page",
        name: "searchPage",
        component: () => import("@/views/blog/searchPage/SearchPage.vue"),
      },
      {
        path: "post/:id",
        name: "postDetail",
        component: () => import("@/views/blog/post/PostDetail.vue"),
      },
    ],
  },
];
