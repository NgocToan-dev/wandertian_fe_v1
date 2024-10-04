<template>
  <div class="container mx-auto ">
    <div class="flex py-4 gap-7 min-h-full">
      <div class="flex-1">
        <img :src="news.thumbnail" v-if="news.thumbnail" alt="news" class="w-full h-full object-cover" />
        <div class="flex flex-col gap-2">
          <h2 class="text-gray-900 dark:text-white">
            {{ news.title }}
          </h2>
          <rich-editor v-model="news.content" readOnly />
        </div>
      </div>
      <div class="w-80">
        <!-- Related Tag -->
        <div class="related-tag">
          <h2 class="text-gray-900 dark:text-white">Related Tag</h2>
          <div class="flex flex-wrap gap-2">
            <p class="text-gray-700 dark:text-gray-400">
              {{ news.tags }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Comment -->
    <div class="comment">
      <h3 class="text-gray-900 dark:text-white">Comment</h3>
      
    </div>
    <!-- Like and Social Media -->
    <div class="social-media">

    </div>
    <!-- Related Post -->
    <div class="related-post">
      <h2 class="text-gray-900 dark:text-white">Related Post</h2>
      <div class="flex flex-wrap gap-2">

      </div>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import postApi from "@/apis/business/postApi";
import { useRoute } from "vue-router";
import { reactive } from "vue";

const route = useRoute();
const news = reactive({});
onMounted(async () => {
  const postID = route.params.id;
  const res = await postApi.get(postID);
  if (res) {
    const post = res.post;
    // change all date to format date time
    post.tags = res.tags.join(", ");
    Object.assign(news, post);
  }
})
</script>

<style lang="scss" scoped></style>
