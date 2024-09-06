<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      <form class="bg-white p-8 rounded-lg shadow-md">
        <div class="mb-4">
          <fwb-input
            v-model="email"
            label="Email"
            placeholder="Enter your email"
          ></fwb-input>
        </div>
        <div class="mt-4">
          <fwb-button class="w-full" @click.prevent="forgotPassword"
            >Send Reset Link</fwb-button
          >
        </div>
      </form>
    </div>
    <div class="mt-4">
      <fwb-a href="/login" color="text-blue-600 dark:text-blue-500 hover:underline text-xs">Back to login</fwb-a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbButton, FwbInput, FwbA } from "flowbite-vue";
import { useRouter } from "vue-router";

const email = ref("");
const router = useRouter();

const forgotPassword = () => {
  router.push("/change-password");
};
</script>

<style lang="scss" scoped></style>
