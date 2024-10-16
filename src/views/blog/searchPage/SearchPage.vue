<template>
  <div class="search-page">
    <div class="container mx-auto my-5">
      <!-- Post By category -->
      <div class="w-full flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Search posts result for: {{ categoryName }}
          </h2>
        </div>
      </div>
      <div
        v-if="posts.length > 0"
        class="w-full flex flex-wrap justify-between gap-5 mt-10"
      >
        <div v-for="(post, index) in posts" :key="index">
          <FwbCard
            variant="image"
            @click.prevent="commonFn.showPostDetail(this, post.postID)"
            class="max-w-80 h-96"
          >
            <div class="flex flex-col">
              <div class="h-1/3">
                <img
                  v-if="post.img"
                  :src="post.img"
                  alt="post"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="flex items-center justify-center h-44 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
                ></div>
              </div>
              <div class="flex-1 p-5">
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ post.title }}
                </h5>
                <p
                  class="text-gray-500 dark:text-gray-400 text-overflow"
                  v-html="post.content"
                ></p>
              </div>
            </div>
          </FwbCard>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center justify-center h-96">
          <p class="text-2xl font-bold text-gray-900 dark:text-white">No posts found</p>
        </div>
      </div>
      <!-- pagination -->
      <div class="mt-5 flex justify-center gap-2" v-if="recordsPerPage > 0">
        <FwbPagination
          v-model="currentPage"
          @page-changed="choosePage"
          :layout="'table'"
          :per-page="recordsPerPage"
          :total-items="totalRecords"
        >
        </FwbPagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import postApi from "@/apis/business/postApi";
import commonFn from "@/utilities/commonFn";
import { FwbCard, FwbPagination } from "flowbite-vue";
import { getCurrentInstance, onMounted, ref } from "vue";

const { proxy } = getCurrentInstance();
const posts = ref([]);
const categoryName = ref("");
const tagID = ref("");
const recordsPerPage = ref(10);
const currentPage = ref(1);
const totalRecords = ref(0);

onMounted(async () => {
  categoryName.value = proxy.$route.query.categoryName;
  if (categoryName.value) {
    await getPostsByCategory();
  }
  tagID.value = proxy.$route.query.tagID;
  if (tagID.value) {
    await getPostsByTag(tagID.value);
  }
});
const getPostsByCategory = async () => {
  try {
    commonFn.showLoading();
    const filters = [
      {
        name: "CategoryName",
        value: categoryName.value,
      },
    ];
    const payload = {
      filters,
      page: currentPage.value,
      pageSize: recordsPerPage.value,
    };
    const [res, summary] = await Promise.all([
      postApi.getPaging(payload),
      postApi.getSummary(payload),
    ]);
    if (res) {
      posts.value = res;
      totalRecords.value = summary.total;
    }
  } catch (error) {
    console.log(error);
  } finally {
    commonFn.hideLoading();
  }
};

const getPostsByTag = async (tagID) =>{
  try {
    commonFn.showLoading();
    const res = await postApi.getPostByTag(tagID);
    if (res) {
      posts.value = res;
      recordsPerPage.value = -1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    commonFn.hideLoading();
  }
}

const choosePage = async (page) => {
  currentPage.value = page;
  await getPostsByCategory();
};
</script>

<style lang="scss" scoped></style>
