<template>
  <div class="comment-detail flex flex-col gap-3">
    <div class="comment-root">
      <div class="flex gap-2 items-center">
        <div class="w-12">
          <img
            src="https://i.pravatar.cc/300"
            alt="avatar"
            class="w-10 h-10 rounded-full"
          />
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <h3 class="text-gray-900 dark:text-white">{{ comment.user?.name }}</h3>
            <span class="text-gray-400 dark:text-gray-500">{{ comment.createdAt }}</span>
          </div>
          <p class="text-gray-900 dark:text-white">
            {{ comment.content }}
          </p>
          <!-- reply -->
          <div class="flex gap-4">
            <button
              :class="[
                isLike
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500',
              ]"
              class="text-xs flex items-center gap-1"
              @click="isLike = !isLike"
            >
              <Icon icon="mdi:thumb-up" />
              Like
            </button>
            <button
              :class="[
                isShowChildren
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500',
              ]"
              class="text-xs flex items-center gap-1"
              @click="replyToComment(comment)"
            >
              <Icon icon="mdi:reply" />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-children" v-show="isShowChildren">
      <CommentDetail v-for="child in comment.children" :key="child.id" :comment="child" />
      <FwbInput
        placeholder="Enter your comments"
        size="lg"
        class="mt-2"
        v-model="commentValue"
      >
        <template #suffix>
          <FwbButton><Icon icon="mdi:send-variant" /></FwbButton>
        </template>
      </FwbInput>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { Icon } from "@iconify/vue";

const commentValue = ref("");
const isLike = ref(false);
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const replyToComment = (comment) => {
  commentValue.value = `@${comment.user.name} `;
  isShowChildren.value = !isShowChildren.value;
};

const isShowChildren = ref(false);
</script>

<style lang="scss" scoped>
.comment-children {
  margin-left: 3rem;
}
</style>
