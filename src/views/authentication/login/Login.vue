<template>
  <div class="login">
    <div class="flex justify-center items-center h-screen dark:bg-gray-800">
      <!-- Create a form with email and password input fields with flowbite  -->
      <form class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4 text-center dark:text-white">Login</h2>
        <div>
          <fwb-input
            v-model="email"
            label="Email"
            placeholder="enter your email"
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
          <fwb-button
            class="w-full"
            @click.prevent="login"
            >Login</fwb-button
          >
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
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton, FwbCheckbox, FwbA } from "flowbite-vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(false);
const showPassword = ref(false);
const login = () => {
  if (checkLogin(email.value, password.value)) {
    alert("login success");
    router.push("/admin");
  } else {
    alert("login failed");
  }
};

const checkLogin = (username, password) => {
  if (username === "admin" && password === "1") {
    return true;
  } else {
    return false;
  }
};
</script>

<style lang="scss" scoped></style>
