<template>
  <fwb-modal persistent>
    <template #header>
      <div class="flex items-center text-lg font-bold text-gray-800 dark:text-white">
        Terms of Service
      </div>
    </template>
    <template #body>
      <!-- product name, color, category, price, quantity, description, image -->
      <div class="flex flex-col gap-2">
        <div class="flex gap-4">
          <FwbInput label="Product Name" class="flex-1" />
          <fwb-select
            :options="priority"
            label="Priority"
          >
            <template #option="{ option }">
              <div class="flex items-center gap-2">
                <Icon :icon="option.icon" />
                <span>{{ option.name }}</span>
              </div>
            </template>
          </fwb-select>
        </div>
        <div class="flex gap-4">
          <fwb-select :options="categories" label="Select a category" class="flex-1" />
          <FwbInput label="Price" class="flex-1" />
        </div>
        <div class="flex gap-4">
          <FwbInput label="Quantity" class="flex-1" />
          <FwbInput label="Description" class="flex-1" />
        </div>
        <div class="flex gap-4">
          <fwb-file-input v-model="file" label="Upload file" class="flex-1" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative"> Decline </fwb-button>
        <fwb-button @click="closeModal" color="green"> I accept </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { FwbModal, FwbButton, FwbInput, FwbFileInput, FwbSelect } from "flowbite-vue";

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const priority = [
  { value: "low", name: "Low", icon: "mdi:flag-triangle-down" },
  { value: "medium", name: "Medium", icon: "mdi:flag-triangle-down" },
  { value: "high", name: "High", icon: "mdi:flag-triangle-down" },
];
</script>

<style lang="scss" scoped></style>
