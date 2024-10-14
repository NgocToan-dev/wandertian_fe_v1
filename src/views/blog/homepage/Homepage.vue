<template>
  <!-- homepage of blog main content -->
  <div class="container p-4 mx-auto">
    <!-- category -->
    <div class="category">
      <div class="flex justify-between border-b-2 pb-5 items-center">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">Top Categories</div>
        <div class="flex gap-2 items-center">
          <fwb-button color="alternative"
            >View All
            <template #suffix>
              <Icon icon="mdi:arrow-right" class="text-gray-400 dark:text-gray-500" />
            </template>
          </fwb-button>
        </div>
      </div>
      <div class="flex flex-wrap justify-around w-full mt-5">
        <div
          class="flex flex-col justify-center items-center col-3 hover:underline cursor-pointer gap-2"
          v-for="category in categories"
          @click="showPostByCategory(category.categoryName)"
        >
          <div class="rounded-full p-4 border bg-white hover:bg-slate-100">
            <Icon :icon="`mdi:${category.icon}`" class="text-4xl text-gray-400" />
          </div>
          <p class="text-gray-900 dark:text-white">{{ category.categoryName }}</p>
        </div>
      </div>
    </div>
    <div class="text-2xl mt-12">
      <span class="font-bold text-gray-900 dark:text-white">Latest Posts</span>
    </div>
    <div class="grid grid-cols-12 gap-5 mt-2">
      <div class="col-span-8">
        <div v-if="posts.length > 0" class="flex flex-wrap gap-5">
          <!-- main content -->
          <fwb-card
            variant="image"
            v-for="(news, index) in posts"
            :key="index"
            @click.prevent="goToDetail(news.postID)"
            class="min-w-full h-44"
          >
            <div class="flex">
              <!-- image -->
              <div class="w-1/3 h-full">
                <img
                  v-if="news.img"
                  :src="news.img"
                  alt="news"
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
                  {{ news.title }}
                </h5>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400 text-overflow"
                  v-html="news.content"
                ></p>
              </div>
            </div>
          </fwb-card>
        </div>
        <div v-else>
          <div class="flex flex-col gap-5">
            <div
              v-for="index in 5"
              class="w-full px-3 py-2 h-44 flex justify-start items-center shadow rounded-md"
            >
              <div role="status" class="w-full animate-pulse">
                <div
                  class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-4"
                ></div>
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                  style="width: 80%"
                ></div>
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                  style="width: 70%"
                ></div>
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                  style="width: 90%"
                ></div>
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                  style="width: 60%"
                ></div>
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                  style="width: 50%"
                ></div>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Paging -->
        <div class="mt-5 flex justify-center gap-2">
          <fwb-pagination
            v-model="currentPage"
            @page-changed="choosePage"
            :layout="'table'"
            :per-page="recordsPerPage"
            :total-items="totalRecords"
          >
          </fwb-pagination>
        </div>
      </div>
      <div class="col-span-4 flex flex-col gap-5 items-end">
        <!-- avatar -->
        <fwb-card variant="image" class="w-full">
          <div class="p-5 flex flex-col gap-2 items-center justify-center">
            <p class="text-gray-900 dark:text-white">About Me</p>
            <FwbAvatar size="lg" img="/src/assets/images/avatar.png" rounded />
            <p class="text-gray-900 dark:text-white">Welcome to Wandertian!</p>
            <p class="text-gray-400 dark:text-gray-500 text-sm text-center">
              I’m Toản, a web developer blending my love for coding, traveling, reading,
              and learning languages. Here, you'll find me wandering through the worlds of
              tech and adventure—sometimes getting lost (both in code and in cities), but
              always discovering something new. Join me for travel tips, book
              recommendations, and a few programming stories that might just make you
              laugh!
            </p>
            <!-- social media -->
            <div class="flex gap-2 mt-2">
              <div class="cursor-pointer hover:bg-slate-100 p-1 rounded-md">
                <Icon
                  icon="mdi:facebook"
                  class="text-2xl text-gray-500 dark:text-white"
                />
              </div>
              <div class="cursor-pointer hover:bg-slate-100 p-1 rounded-md">
                <Icon
                  icon="mdi:instagram"
                  class="text-2xl text-gray-500 dark:text-white"
                />
              </div>
            </div>
          </div>
        </fwb-card>
        <!-- search news -->
        <fwb-card variant="image" class="w-full">
          <div class="p-5 flex flex-col gap-2">
            <p class="text-gray-900 dark:text-white">Search News</p>
            <fwb-input
              v-model="searchNewsText"
              placeholder="search post"
              size="lg"
              @keyup.enter="choosePage(currentPage)"
            >
              <template #prefix>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </template>
              <template #suffix>
                <fwb-button @click="choosePage(currentPage)">Search</fwb-button>
              </template>
            </fwb-input>
          </div>
        </fwb-card>
        <!-- list month years of all posts -->
        <fwb-card variant="image" class="w-full">
          <div class="p-5 flex flex-col gap-2">
            <p class="text-gray-900 dark:text-white">Archive</p>
            <div class="flex flex-col gap-2">
              <div
                class="flex cursor-pointer text-gray-400 dark:text-gray-500 w-fit hover:underline"
                v-for="(item, index) in listMonthYears"
                :key="index"
              >
                {{ item.month }} - {{ item.year }}
              </div>
            </div>
          </div>
        </fwb-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import categoryApi from "@/apis/business/categoryApi";
import postApi from "@/apis/business/postApi";
import commonFn from "@/utilities/commonFn";
import PostStatusEnum from "@/utilities/enum/PostStatusEnum";
import { Icon } from "@iconify/vue";
import { FwbCard, FwbInput, FwbButton, FwbPagination, FwbAvatar } from "flowbite-vue";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const posts = ref([]);
const totalRecords = ref(0);
const recordsPerPage = 10;
const currentPage = ref(1);
const searchNewsText = ref("");
const categories = ref([]);
const listMonthYears = ref([]);

onMounted(async () => {
  await choosePage(1);
  await getCategories();
  await getMonthYears();
});
const getMonthYears = async () => {
  try {
    commonFn.showLoading();
    const res = await postApi.getAllPostMonthYears();
    if (res) {
      listMonthYears.value = res;
    }
  } finally {
    commonFn.hideLoading();
  }
};
const getCategories = async () => {
  try {
    commonFn.showLoading();
    const res = await categoryApi.getAll({});
    if (res) {
      categories.value = res;
    }
  } finally {
    commonFn.hideLoading();
  }
};
const choosePage = async (page) => {
  try {
    commonFn.showLoading();
    currentPage.value = page;
    const payload = {
      page: page,
      pageSize: recordsPerPage,
      status: PostStatusEnum.PUBLISHED,
    };
    if (searchNewsText.value) {
      payload.search = searchNewsText.value;
    }
    const [res, summary] = await Promise.all([
      postApi.getPaging(payload),
      postApi.getSummary(payload),
    ]);
    if (res) {
      posts.value = res;
      totalRecords.value = summary.total;
    }
  } finally {
    commonFn.hideLoading();
  }
};

const goToDetail = (id) => {
  commonFn.showPostDetail(proxy, id);
};
const showPostByCategory = (categoryName) => {
  proxy.$router.push({ name: "searchPage", query: { categoryName: categoryName } });
};
</script>

<style lang="scss">
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.text-overflow {
  -webkit-line-clamp: 4;
}
</style>
