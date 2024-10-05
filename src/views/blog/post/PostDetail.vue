<template>
  <div class="container mx-auto pb-5">
    <div class="flex py-4 gap-7 min-h-full">
      <div class="flex-1">
        <img
          :src="news.thumbnail"
          v-if="news.thumbnail"
          alt="news"
          class="w-full h-full object-cover"
        />
        <div class="flex flex-col gap-2">
          <h1 class="text-gray-900 dark:text-white">
            {{ news.title }}
          </h1>
          <rich-editor v-model="news.content" readOnly />
        </div>
        <!-- Like, Share and Social Media -->
        <div class="flex gap-2 mt-5">
          <FwbButton variant="primary">Like</FwbButton>
          <FwbButton variant="primary">Share</FwbButton>
        </div>
        <!-- Comment -->
        <div class="comment mt-5">
          <h3 class="text-gray-900 dark:text-white">Comment</h3>
          <comment-list v-model="comments"/>
        </div>
      </div>
      <div class="w-80">
        <!-- Related Tag -->
        <div class="related-tag">
          <h2 class="text-gray-900 dark:text-white">Related Tag</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <!-- list tags -->
            <div v-for="tag in news.tags" :key="tag.id" class="tag">
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
    <RelatedPost :relatedPosts="relatedPosts" />
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


const route = useRoute();
const news = reactive({});
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
const relatedPosts = ref([
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
    thumbnail: "https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg",
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
    thumbnail: "https://cdn.fakercloud.com/avatars/erwanhesry_128.jpg",
  },
  {
    id: 3,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
  },
  {
    id: 4,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
  },
  {
    id: 5,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies.",
  },
]);

onMounted(async () => {
  const postID = route.params.id;
  const res = await postApi.get(postID);
  if (res) {
    const post = res.post;
    // change all date to format date time
    post.tags = res.tags;
    Object.assign(news, post);
  }
});


</script>

<style lang="scss" scoped>

</style>
