<template>
  <div class="comments border rounded-md p-4 flex flex-col gap-3">
    <CommentDetail v-for="comment in comments" :key="comment.id" :comment="comment" />
    <!-- Text area comment section -->
    <FwbInput placeholder="Enter your comments" size="lg">
      <template #suffix>
        <FwbButton><Icon icon="mdi:send-variant" /></FwbButton>
      </template>
    </FwbInput>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CommentDetail from "./CommentDetail.vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { Icon } from "@iconify/vue";

const comments = defineModel();
</script>

<style lang="scss" scoped></style>
