<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Forget Password</h2>
      <form class="bg-white p-8 rounded-lg shadow-md">
        <div class="mb-4">
          <fwb-input
            v-model="email"
            label="Email"
            placeholder="Enter your email"
          ></fwb-input>
        </div>
        <div class="mt-4">
          <fwb-button class="w-full" @click.prevent="forgetPassword"
            >Send Reset Code</fwb-button
          >
        </div>
      </form>
    </div>
    <div class="mt-4">
      <fwb-a
        href="/login"
        color="text-blue-600 dark:text-blue-500 hover:underline text-xs"
        >Back to login</fwb-a
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbButton, FwbInput, FwbA } from "flowbite-vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import VerifyCodeFormType from "@/utilities/enum/VerifyCodeFormType";
import userApi from "@/apis/auth/userApi";

const toast = useToast();
const email = ref("");
const router = useRouter();

const forgetPassword = async () => {
  const payload = {
    email: email.value,
  };
  const res = await userApi.forgetPasswordCode(payload);
  if (!res) {
    toast.error("Email not found");
    return;
  }
  router.push({
    name: "VerifyCode",
    query: { email: email.value, type: VerifyCodeFormType.ForgetPassword },
  });
  toast.success("Reset code sent to your email");
};
</script>

<style lang="scss" scoped></style>
