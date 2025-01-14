<template>
  <div class="container mx-auto pb-5">
    <div class="flex py-4 gap-7 min-h-full">
      <div class="flex-1">
        <!-- Time, Author created -->
        <div class="flex gap-2 mb-2 items-center text-gray-400 dark:text-gray-500">
          <div>
            By <span class="text-black">{{ post.fullName }}</span>
          </div>
          <div class="rounded-full bg-gray-400 w-1.5 h-1.5"></div>
          <div>{{ commonFn.formatDate(post.createdAt, FormatDateType.TEXT_TIME) }}</div>
          <!-- if save show star icon -->
          <div v-if="isSave" class="ml-2">
            <Icon icon="mdi:bookmark" class="text-blue-500 dark:text-blue-400 text-2xl" />
          </div>
        </div>
        <img :src="post.thumbnail" v-if="post.thumbnail" alt="news" class="w-full h-full object-cover" />
        <div class="flex flex-col gap-2">
          <h1 class="text-gray-900 dark:text-white">
            {{ post.title }}
          </h1>
          <rich-editor v-model="post.content" readOnly />
        </div>
        <!-- Like, Share and Social Media -->
        <div class="flex justify-between mt-5">
          <div class="reaction flex items-center gap-4">
            <!-- reaction -->
            <div class="like cursor-pointer p-1 hover:bg-slate-100 rounded-md" @click="isLike = !isLike">
              <Icon v-if="isLike" icon="mdi:thumb-up" class="text-blue-500 dark:text-blue-400 text-2xl" />
              <Icon v-else icon="mdi:thumb-up-outline" class="text-gray-400 dark:text-gray-500 text-2xl" />
            </div>
            <!-- save post -->
            <div class="savePost cursor-pointer p-1 hover:bg-slate-100 rounded-md" @click="isSave = !isSave">
              <Icon v-if="isSave" icon="mdi:bookmark" class="text-blue-500 dark:text-blue-400 text-2xl" />
              <Icon v-else icon="mdi:bookmark-outline" class="text-gray-400 dark:text-gray-500 text-2xl" />
            </div>
          </div>
          <div class="flex gap-2 share-to-social">
            <div class="cursor-pointer p-1 text-gray-500 hover:bg-slate-100 rounded-md" v-for="item in socialMedial"
              :key="item.icon">
              <FwbTooltip placement="top">
                <template #trigger>
                  <Icon :icon="item.icon" class="text-2xl" />
                </template>
                <template #content class="text-sm"> {{ item.tooltip }} </template>
              </FwbTooltip>
            </div>
          </div>
        </div>
        <!-- Comment -->
        <div class="comment mt-5">
          <h2 class="text-gray-900 dark:text-white">Discussions ({{ totalComments }})</h2>
          <comment-list v-model="comments" :post="post" />
        </div>
      </div>
      <div class="w-96 flex flex-col gap-4">
        <!-- Related Tag -->
        <div class="related-tag">
          <h2 class="text-gray-900 dark:text-white">Related Tag</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <!-- list tags -->
            <div v-for="tag in post.tags" :key="tag.tagID" class="tag" @click="showPostsByTag(tag.tagID)">
              <span
                class="select-none cursor-pointer text-sm hover:bg-slate-50 hover:dark:bg-slate-600 text-gray-900 dark:text-white border rounded-full p-2">#{{
                  tag.tagName }}</span>
            </div>
          </div>
        </div>
        <!-- Latest News -->
        <div class="latest-news mt-2 max-h-screen">
          <h2 class="text-gray-900 dark:text-white">Latest News</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <!-- list news -->
            <div img-alt="Desk" variant="horizontal" class="max-h-40 flex items-start gap-2"
              v-for="(post, index) in latestPosts" :key="index">
              <div class="w-1/3 h-full">
                <div v-if="post.thumbnail" class="rounded-md overflow-hidden">
                  <img src="https://flowbite.com/docs/images/blog/image-4.jpg" alt="" />
                </div>
                <div v-else
                  class="flex items-center justify-center h-full max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                </div>
              </div>
              <div class="w-2/3 flex flex-col flex-between h-full">
                <h3
                  class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-overflow hover:underline hover:text-blue-500 cursor-pointer"
                  @click="showPostDetail(post.postID)">
                  {{ post.title }}
                </h3>
                <p class="text-gray-700 dark:text-gray-400 text-overflow" v-html="post.content"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Like and Social Media -->
    <div class="social-media"></div>
    <!-- Related Post -->
    <RelatedPost :relatedPosts="relatedPosts" v-if="relatedPosts.length > 0" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeMount, getCurrentInstance } from "vue";
import postApi from "@/apis/business/postApi";
import { useRoute } from "vue-router";
import CommentList from "./CommentList.vue";
import { FwbButton, FwbCard, FwbTooltip } from "flowbite-vue";
import RelatedPost from "./RelatedPost.vue";
import commentApi from "@/apis/business/commentApi";
import commonFn from "@/utilities/commonFn";
import FormatDateType from "@/utilities/enum/FormatDateType";
import { Icon } from "@iconify/vue";

const { proxy } = getCurrentInstance();
const route = useRoute();
const post = ref({});
const comments = ref([]);
const relatedPosts = ref([]);
const latestPosts = ref([]);
const isLike = ref(false);
const isSave = ref(false);

const socialMedial = [
  { icon: "mdi:facebook", tooltip: "Share on Facebook" },
  { icon: "mdi:twitter", tooltip: "Share on Twitter" },
  { icon: "mdi:instagram", tooltip: "Share on Instagram" },
  { icon: "mdi:linkedin", tooltip: "Share on LinkedIn" },
];

const totalComments = computed(() => {
  return comments.value.length;
});

onMounted(async () => {
  await initPostData();
});

const showPostDetail = (postID) => {
  window.location.href = `/post/${postID}`;
};

const initPostData = async () => {
  const postID = route.params.id;
  const res = await postApi.get(postID);
  if (res) {
    const postRaw = res.post;
    // change all date to format date time
    postRaw.tags = res.tags;
    post.value = postRaw;
  }
  await getComments();
  await getLatestPosts(4);
};

const getComments = async () => {
  const postID = route.params.id;
  const res = await commentApi.getComments(postID);
  if (res) {
    comments.value = res;
  }
};

const getRelatedPost = async () => {
  const res = await postApi.getRelatedPost(post.value.postID);
  if (res) {
    relatedPosts.value = res;
  }
};

const getLatestPosts = async (numberOfPosts) => {
  const payload = {
    currentPostID: post.value.postID,
    numberOfPosts: numberOfPosts,
  };
  const res = await postApi.getLatestPosts(payload);
  if (res) {
    latestPosts.value = res;
  }
};

const showPostsByTag = (tagID) => {
  proxy.$router.push({ name: 'searchPage', query: { tagID: tagID } });
}
</script>

<style lang="scss" scoped></style>
