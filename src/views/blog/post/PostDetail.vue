<template>
  <div class="container mx-auto pb-5">
    <div class="flex py-4 gap-7 min-h-full">
      <div class="flex-1">
        <img
          :src="post.thumbnail"
          v-if="post.thumbnail"
          alt="news"
          class="w-full h-full object-cover"
        />
        <div class="flex flex-col gap-2">
          <h1 class="text-gray-900 dark:text-white">
            {{ post.title }}
          </h1>
          <rich-editor v-model="post.content" readOnly />
        </div>
        <!-- Like, Share and Social Media -->
        <div class="flex gap-2 mt-5">
          <FwbButton variant="primary">Like</FwbButton>
          <FwbButton variant="primary">Share</FwbButton>
        </div>
        <!-- Comment -->
        <div class="comment mt-5">
          <h3 class="text-gray-900 dark:text-white">Comment</h3>
          <comment-list v-model="comments" :post="post" />
        </div>
      </div>
      <div class="w-80">
        <!-- Related Tag -->
        <div class="related-tag">
          <h2 class="text-gray-900 dark:text-white">Related Tag</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <!-- list tags -->
            <div v-for="tag in post.tags" :key="tag.tagID" class="tag">
              <span
                class="select-none cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600 text-gray-900 dark:text-white border rounded-full p-2"
                >#{{ tag.tagName }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Like and Social Media -->
    <div class="social-media"></div>
    <!-- Related Post -->
    <RelatedPost :relatedPosts="relatedPosts" v-if="relatedPosts.length > 0"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import postApi from "@/apis/business/postApi";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import CommentList from "./CommentList.vue";
import { FwbButton } from "flowbite-vue";
import RelatedPost from "./RelatedPost.vue";
import commentApi from "@/apis/business/commentApi";

const route = useRoute();
const post = reactive({});
const comments = ref([]);
const relatedPosts = ref([]);

onMounted(async () => {
  const postID = route.params.id;
  const res = await postApi.get(postID);
  if (res) {
    const postRaw = res.post;
    // change all date to format date time
    postRaw.tags = res.tags;
    Object.assign(post, postRaw);
  }
  await getComments();
});


const getComments = async () => {
  const postID = route.params.id;
  const res = await commentApi.getComments(postID);
  if (res) {
    comments.value = res;
  }
};
</script>

<style lang="scss" scoped></style>
