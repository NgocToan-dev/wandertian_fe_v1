<template>
  <FwbTextarea
    v-model="message"
    custom
    :rows="3"
    label
    placeholder="Write your message..."
  >
    <template #footer>
      <div class="flex items-center justify-between">
        <fwb-button type="submit" @click="postMessage">
          Post comment
          <template #suffix>
            <div class="loading-btn w-4 h-4" v-if="isLoading"></div>
            <div v-else>
              <Icon icon="mdi:send-variant" />
            </div>
          </template>
        </fwb-button>
        <div class="flex">
          <fwb-button
            class="rounded-lg hover:bg-gray-200 hover:dark:bg-gray-600"
            color=""
            square
          >
            <Icon icon="mdi:attach-file" class="text-xl text-gray-500" />
          </fwb-button>
          <fwb-button
            class="rounded-lg hover:bg-gray-200 hover:dark:bg-gray-600"
            color=""
            square
          >
            <Icon icon="mdi:location-on" class="text-xl text-gray-500" />
          </fwb-button>
          <fwb-button
            class="rounded-lg hover:bg-gray-200 hover:dark:bg-gray-600"
            color=""
            square
          >
            <Icon icon="mdi:map" class="text-xl text-gray-500" />
          </fwb-button>
        </div>
      </div>
    </template>
  </FwbTextarea>
</template>

<script setup>
import { FwbButton, FwbTextarea } from "flowbite-vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const message = ref("");
const emits = defineEmits(["postMessage"]);
const isLoading = ref(false);

const postMessage = () => {
  if (!message.value) return;
  isLoading.value = true;
  emits("postMessage", message.value, commentCallback);
};

const commentCallback = () => {
  message.value = "";
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.loading-btn {
  border: 2px solid #fff;
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
}
</style>
