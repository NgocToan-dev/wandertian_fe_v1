<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 flex-col">
    <div class="w-full max-w-md">
      <form class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Change Password</h2>
        <div class="mb-4">
          <fwb-input
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            :type="showPassword ? 'text' : 'password'"
          >
            <!-- show password -->
            <template #suffix>
              <Icon
                icon="mdi:eye"
                class="cursor-pointer text-2xl"
                v-if="showPassword"
                @click="showPassword = !showPassword"
              />
              <Icon
                icon="mdi:eye-off"
                class="cursor-pointer text-2xl"
                v-else
                @click="showPassword = !showPassword"
              />
            </template>
          </fwb-input>
        </div>
        <div class="mb-4">
          <fwb-input
            v-model="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            :type="showConfirmPassword ? 'text' : 'password'"
          >
            <!-- show password -->
            <template #suffix>
              <Icon
                icon="mdi:eye"
                class="cursor-pointer text-2xl"
                v-if="showConfirmPassword"
                @click="showConfirmPassword = !showConfirmPassword"
              />
              <Icon
                icon="mdi:eye-off"
                class="cursor-pointer text-2xl"
                v-else
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </fwb-input>
        </div>
        <div class="mt-4">
          <fwb-button class="w-full" @click.prevent="changePassword"
            >Change Password</fwb-button
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
import { FwbButton, FwbInput, FwbA } from "flowbite-vue";
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useToast } from "vue-toastification";
import userApi from "@/apis/auth/userApi";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const toast = useToast();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(() => {
  email.value = route.query.email;
});
const changePassword = async () => {
  if(!validate()){
    return;
  }
  // call api to change password
  const payload = {
    email: email.value,
    newPassword: password.value,
  };
  const res = await userApi.resetPassword(payload);
  if(res){
    router.push("/login");
    toast.success("Password changed successfully");
  }
};

const validate = () => {
  if (password.value !== confirmPassword.value) {
    toast.error("Password does not match");
    return false;
  }
  return true;
};
</script>

<style lang="scss" scoped></style>
