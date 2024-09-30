<template>
  <fwb-modal persistent>
    <template #header>
      <div class="flex items-center text-lg font-bold text-gray-800 dark:text-white">
        Task Details
      </div>
    </template>
    <template #body>
      <!-- product name, color, category, price, quantity, description, image -->
      <div class="flex flex-col gap-2">
        <div class="flex gap-4">
          <FwbInput
            label="Title"
            class="flex-1"
            v-model="model.name"
            @blur="validateField('name')"
            @input="validateField('name')"
          >
            <template #validationMessage>
              <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div>
            </template>
          </FwbInput>
          <fwb-select
            :options="categories"
            label="Select a category"
            class="flex-1"
            v-model="model.category"
          />
        </div>
        <div class="flex justify-start gap-5">
          <!-- priority radio -->
          <div class="flex items-center gap-1">
            <input
              type="radio"
              :value="3"
              id="low"
              name="priority"
              v-model="model.priority"
            />
            <label for="low">
              <Icon icon="mdi:flag" class="text-red-500 text-2xl" />
            </label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              :value="2"
              id="medium"
              name="priority"
              v-model="model.priority"
            />
            <label for="medium">
              <Icon icon="mdi:flag" class="text-yellow-500 text-2xl" />
            </label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              :value="1"
              id="high"
              name="priority"
              v-model="model.priority"
            />
            <label for="high">
              <Icon icon="mdi:flag" class="text-green-500 text-2xl" />
            </label>
          </div>
        </div>
        <div>
          <FwbTextarea label="Description" class="w-full" v-model="model.description" />
        </div>
        <div class="flex gap-4">
          <fwb-file-input v-model="model.file" label="Upload file" class="flex-1" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <fwb-button @click="closeModal" color="alternative"> Cancel </fwb-button>
        <fwb-button @click="save"> Save </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  FwbModal,
  FwbButton,
  FwbInput,
  FwbFileInput,
  FwbSelect,
  FwbTextarea,
} from "flowbite-vue";
import { getCurrentInstance, reactive, ref } from "vue";
import { useToast } from "vue-toastification";

const { proxy } = getCurrentInstance();
const toast = useToast();

const model = reactive({
  file: null,
  name: "",
  priority: 1,
  category: "",
  price: 0,
  quantity: 0,
  description: "",
});

const emit = defineEmits(["close"]);

const errors = ref({});

const closeModal = () => {
  emit("close");
};

const categories = [
  { value: "web", name: "Web Development" },
  { value: "mobile", name: "Mobile Development" },
  { value: "design", name: "UI/UX Design" },
  { value: "marketing", name: "Marketing" },
];

const save = () => {
  validateAllFields();
  if (Object.values(errors.value).some((error) => error !== "")) {
    return;
  }
  alert("Form is valid");
};

const validateField = (fieldName) => {
  if (fieldName === "name" && !model.name.trim()) {
    errors.value.name = "Product name is required";
  } else {
    errors.value.name = "";
  }
  // Add more validation rules for other fields as needed
};

const validateAllFields = () => {
  validateField("name");
  // Add validation calls for other fields
};
</script>

<style lang="scss" scoped></style>
