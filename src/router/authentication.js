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
    path: "/verify-code",
    name: "VerifyCode",
    component: () => import("@/views/authentication/signup/VerifyCode.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import("@/views/authentication/forgetPassword/ResetPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import("@/views/authentication/forgetPassword/ResetPassword.vue"),
  },
];
