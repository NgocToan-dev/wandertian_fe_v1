<template>
  <fwb-modal persistent>
    <template #header>
      <div class="flex items-center text-lg font-bold text-gray-800 dark:text-white">
        Tag Detail
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
          >
            <template #validationMessage>
              <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div>
            </template>
          </FwbInput>
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
import tagApi from "@/apis/business/tagApi";
import EditMode from "@/utilities/enum/EditMode";
import {
  FwbModal,
  FwbButton,
  FwbInput,
  FwbTextarea,
} from "flowbite-vue";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const editMode = ref(EditMode.INSERT);

const model = defineModel({
  tagID: 0,
  name: "",
});

const props = defineProps({
  refreshCallback: Function,
});
onMounted(() => {
  if (model.value?.tagID) {
    editMode.value = EditMode.UPDATE;
  }
});

const emit = defineEmits(["close"]);

const errors = ref({});

const closeModal = () => {
  emit("close");
};

const save = async () => {
  validateAllFields();
  if (Object.values(errors.value).some((error) => error !== "")) {
    return;
  }
  // Call API to save the data
  const res = await tagApi.save(model.value, editMode.value);
  if(res) {
    model.value = res;
    toast.success("Category saved successfully");
    props.refreshCallback();
    closeModal();
  }
};

const validateField = (fieldName) => {
  if (fieldName === "name" && !model.value.name) {
    errors.value.name = "Tag name is required";
  } else {
    errors.value.name = "";
  }
};

const validateAllFields = () => {
  validateField("name");
};
</script>

<style lang="scss" scoped></style>
