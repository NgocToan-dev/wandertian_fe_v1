export const authenticationRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/authentication/login/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/authentication/signup/SignUp.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import("@/views/authentication/forgetPassword/ForgetPassword.vue"),
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: () =>
      import("@/views/authentication/forgetPassword/ChangePassword.vue"),
  },
];
