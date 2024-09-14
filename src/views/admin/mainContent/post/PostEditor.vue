<template>
  <div class="p-4">
    <!-- save button -->
    <div class="flex justify-end">
      <fwb-button-group>
        <!-- preview -->
        <fwb-button color="alternative" @click="preview">
          <div class="flex gap-2 items-center">
            <Icon icon="mdi:computer" />
            Preview
          </div>
        </fwb-button>
        <!-- save draft -->
        <fwb-button color="alternative" @click="saveDraft"> Save Draft </fwb-button>
        <!-- Save button -->
        <fwb-button @click="save"> Save </fwb-button>
      </fwb-button-group>
    </div>

    <div class="mt-2">
      <rich-editor v-model="content" :read-only="isPreview" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { FwbButtonGroup, FwbButton } from "flowbite-vue";
import { ref } from "vue";
const content = ref("");

const isPreview = ref(false);

const preview = () => {
  isPreview.value = !isPreview.value;
};

const saveDraft = () => {
  console.log("Save Draft");
};

const save = () => {
  console.log("Save");
};
</script>

<style lang="scss"></style>
