<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Verify Code</h2>
        <div class="text-sm text-center">
          Your code is sent to your email: <b>{{ email }}</b>
        </div>
        <div class="my-4">
          <fwb-input v-model="code" placeholder="Enter your code"> </fwb-input>
        </div>
        <div class="mb-4">
          <fwb-button class="w-full" @click="verifyCode">Verify</fwb-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userApi from "@/apis/auth/userApi";
import VerifyCodeFormType from "@/utilities/enum/VerifyCodeFormType";
import { FwbInput, FwbButton } from "flowbite-vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const email = ref("");
const code = ref("");
const type = ref(0);

onMounted(() => {
  email.value = route.query.email;
  type.value = Number(route.query.type);
});

const verifyCode = async () => {
  switch (type.value) {
    case VerifyCodeFormType.ForgetPassword:
      await verifyForgetPasswordCode();
      break;
    case VerifyCodeFormType.SignUp:
      await verifySignUpCode();
      break;
    default:
      break;
  }

};
const verifySignUpCode = async () => {
  const payload = {
    email: email.value,
    code: code.value,
  };
  const res = await userApi.registerNewUser(payload);
  if(res){
    router.push("/login");
  }
}

const verifyForgetPasswordCode = async () => {
  const payload = {
    email: email.value,
    code: code.value,
  };
  const res = await userApi.verifyCode(payload);
  if(res){
    router.push({
      name: "ResetPassword",
      query: { email: email.value },
    });
  }
} 
</script>

<style lang="scss" scoped></style>
