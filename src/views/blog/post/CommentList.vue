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

const comments = ref([
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
    user: {
      name: "John Doe",
      avatar: "https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg",
    },
    createdAt: "2 days ago",
    children: [
      {
        id: 3,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
        user: {
          name: "John Doe",
          avatar: "https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg",
        },
        createdAt: "2 days ago",
      },
      {
        id: 4,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
        user: {
          name: "John Doe",
          avatar: "https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg",
        },
        createdAt: "2 days ago",
      },
    ],
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
    user: {
      name: "Jane Doe",
      avatar: "https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg",
    },
    createdAt: "3 days ago",
  },
]);
</script>

<style lang="scss" scoped></style>
