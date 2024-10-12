<template>
  <FwbModal persistent @close="closeModal" size="xl">
    <template #header>
      <h2>User Account Setting</h2>
    </template>
    <template #body>
      <div class="flex flex-col gap-2">
        <FwbInput label="Email" disabled v-model="user.email" />
        <FwbInput label="Full Name" v-model="user.fullName" />
        <FwbInput label="Phone Number" v-model="user.phoneNumber" />
        <FwbInput label="Address" v-model="user.address" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-2">
        <FwbButton color="alternative" @click="closeModal">Close</FwbButton>
        <FwbButton @click="saveUser">Save</FwbButton>
      </div>
    </template>
  </FwbModal>
</template>

<script setup>
import userAccountApi from "@/apis/business/userAccountApi";
import commonFn from "@/utilities/commonFn";
import EditMode from "@/utilities/enum/EditMode";
import { FwbModal, FwbInput, FwbButton } from "flowbite-vue";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const user = ref({});

onMounted(() => {
  const userJSON = localStorage.getItem("user");
  user.value = JSON.parse(userJSON);
});

const emits = defineEmits(["closeModal"]);
const saveUser = async () => {
  try {
    commonFn.showLoading();
    const res = await userAccountApi.save(user.value, EditMode.UPDATE);
    if (res) {
      toast.success("Save user successfully");
      localStorage.setItem("user", JSON.stringify({ ...user.value, res }));
      closeModal();
    }
  } catch (ex) {
    toast.error("Save user failed");
  } finally {
    commonFn.hideLoading();
  }
};
const closeModal = () => {
  emits("closeModal");
};
</script>

<style lang="scss" scoped></style>
