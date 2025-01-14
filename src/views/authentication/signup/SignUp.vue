<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md">
      <form class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <div class="mb-4">
          <fwb-input v-model="name" label="Name" placeholder="Enter your name">
          </fwb-input>
        </div>
        <div class="mb-4">
          <fwb-input v-model="email" label="Email" placeholder="Enter your email">
          </fwb-input>
        </div>
        <div class="mb-4">
          <fwb-input
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            :type="showPassword ? 'text' : 'password'"
          >
            <!-- show password -->
            <template #suffix>
              <!-- icon -->
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
              <!-- icon -->
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
          <fwb-button class="w-full" @click.prevent="signUp">Sign Up</fwb-button>
          <p class="text-sm text-gray-500 mt-2 text-center">
            Already have an account?
            <fwb-a
              href="/login"
              color="text-blue-600 dark:text-blue-500 hover:underline text-xs"
            >
              Login
            </fwb-a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton, FwbA } from "flowbite-vue";
import { Icon } from "@iconify/vue";
import userApi from "@/apis/auth/userApi";
import { useToast } from "vue-toastification";
import commonFn from "@/utilities/commonFn";
import { useRouter } from "vue-router";
import VerifyCodeFormType from "@/utilities/enum/VerifyCodeFormType";

const router = useRouter();
const toast = useToast();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const signUp = async () => {
  if (!validate()) {
    return;
  }

  const payload = {
    username: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    commonFn.showLoading();
    const res = await userApi.registerCode(payload);
    if (res) {
      router.push({
        path: "/verify-code",
        query: { email: email.value, type: VerifyCodeFormType.SignUp },
      });
      toast.success("Your code is sent to your email");
    }
  } catch (error) {
    console.log(error);
    toast.error("Sign up failed");
  } finally {
    commonFn.hideLoading();
  }
};

const validate = () => {
  if (password.value !== confirmPassword.value) {
    toast.error("Password and confirm password are not the same");
    return false;
  }
  return true;
};
</script>

<style lang="scss" scoped></style>
