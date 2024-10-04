<template>
  <div>
    <h2 class="text-gray-900 dark:text-white">Related Post</h2>
    <div class="relative">
      <!-- Prev button-->
      <div
        class="select-none prev-btn h-full flex items-center justify-center absolute left-0 z-10"
      >
        <div
          class="bg-slate-600 rounded-full h-6 w-6 cursor-pointer flex place-content-center items-center"
          @click="scrollToLeft"
        >
          <Icon icon="mdi:chevron-left" class="text-white dark:text-white" />
        </div>
      </div>

      <div class="related-post flex gap-10 mt-2 overflow-auto">
        <!-- list related post -->
        <div
          class="related-post-item max-w-72 min-w-72 flex flex-col gap-3"
          v-for="post in relatedPosts"
          :key="post.id"
        >
          <div
            class="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          ></div>
          <h4 class="text-gray-900 dark:text-white">{{ post.title }}</h4>
        </div>
      </div>
      <div
        class="select-none prev-btn flex items-center justify-center absolute h-full top-0 right-0 z-10"
      >
        <div
          class="bg-slate-600 rounded-full h-6 w-6 cursor-pointer flex place-content-center items-center"
          @click="scrollToRight"
        >
          <Icon icon="mdi:chevron-right" class="text-white dark:text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  relatedPosts: {
    type: Array,
    required: true,
  }
});

const scrollToLeft = () => {
  const el = document.querySelector(".related-post");
  if (el) {
    el.scrollLeft -= 200;
  }
};

const scrollToRight = () => {
  const el = document.querySelector(".related-post");
  if (el) {
    el.scrollLeft += 200;
  }
};
</script>

<style lang="scss" scoped>
.related-post::-webkit-scrollbar {
  display: none;
}
</style>
