<template>
  <div class="login">
    <div class="flex justify-center items-center h-screen dark:bg-gray-800">
      <!-- Create a form with email and password input fields with flowbite  -->
      <div class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4 text-center dark:text-white">Login</h2>
        <div>
          <fwb-input
            v-model="username"
            label="Username"
            placeholder="enter your username"
          >
          </fwb-input>
        </div>
        <div class="mt-4">
          <fwb-input
            v-model="password"
            label="Password"
            placeholder="enter your password"
            :type="showPassword ? 'text' : 'password'"
          >
            <!-- show password -->
            <template #suffix>
              <!-- icon -->
              <Icon
                icon="mdi:eye"
                class="cursor-pointer text-2xl dark:text-white"
                v-if="showPassword"
                @click="showPassword = !showPassword"
              />
              <Icon
                icon="mdi:eye-off"
                class="cursor-pointer text-2xl dark:text-white"
                v-else
                @click="showPassword = !showPassword"
              />
            </template>
          </fwb-input>
        </div>
        <div class="mt-4">
          <fwb-checkbox v-model="remember" label="Remember me" class="dark:text-white" />
        </div>
        <div class="mt-4">
          <fwb-button class="w-full" @click="login">Login</fwb-button>
        </div>
        <div class="mt-2 text-center">
          <!-- signup link -->
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?
            <fwb-a
              href="/signup"
              color="text-blue-600 dark:text-blue-500 hover:underline text-xs"
            >
              Sign up
            </fwb-a>
          </p>
          <fwb-a
            href="/forgot-password"
            color="text-blue-600 dark:text-blue-500 hover:underline text-xs"
          >
            Forgot your password?
          </fwb-a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { FwbInput, FwbButton, FwbCheckbox, FwbA } from "flowbite-vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import userApi from "@/apis/auth/userApi";
import { useToast } from "vue-toastification";
import commonFn from "@/utilities/commonFn";
import RoleEnum from "@/utilities/enum/RoleEnum";

const toast = useToast();
const router = useRouter();

const username = ref("");
const password = ref("");
const remember = ref(false);
const showPassword = ref(false);

onMounted(() => {
  // Add Key enter event listener to login
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      login();
    }
  });
});

const login = async () => {
  try {
    commonFn.showLoading();
    const payload = {
      username: username.value,
      password: password.value,
    };
    const res = await userApi.login(payload);
    if (res && res.accessToken) {
      // set accessToken to cookie and redirect to home
      const accessToken = res.accessToken;
      const expiredHours = res.expiresIn;
      const role = commonFn.getRoleFromAccessToken(accessToken);
      
      localStorage.setItem("user", JSON.stringify(res.user));

      commonFn.setCookie("accessToken", accessToken, expiredHours || 48);
      if (role == "Admin") {
        commonFn.setCookie("role", RoleEnum.ADMIN, expiredHours || 48);
      }
      toast.success("Login successfully");
      router.push("/");
    }
  } finally {
    commonFn.hideLoading();
  }
};
</script>

<style lang="scss" scoped></style>
