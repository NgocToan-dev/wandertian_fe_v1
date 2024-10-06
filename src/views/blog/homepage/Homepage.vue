<template>
  <!-- homepage of blog main content -->
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-8">
        <div class="flex flex-wrap gap-5">
          <!-- main content -->
          <fwb-card
            variant="horizontal"
            v-for="(news, index) in listNews"
            :key="index"
            @click.prevent="goToDetail(news.postID)"
            class="min-w-full"
          >
            <div class="flex">
              <!-- image -->
              <div class="w-1/3">
                <img
                  v-if="news.img"
                  :src="news.img"
                  alt="news"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
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
        <!-- Paging -->
        <div class="mt-5 flex justify-center gap-2">
          <fwb-button @click="choosePage(currentPage - 1)" :disabled="currentPage == 1"
            >Previous</fwb-button
          >
          <!-- List Page -->
          <fwb-button
            v-for="item in listPages"
            :key="item"
            :color="currentPage != item ? 'alternative' : 'default'"
            @click="choosePage(item)"
          >
            {{ item }}
          </fwb-button>
          <fwb-button
            @click="choosePage(currentPage + 1)"
            :disabled="currentPage == endPage"
            >Next</fwb-button
          >
        </div>
      </div>
      <div class="col-span-4 flex flex-col gap-5 items-end">
        <!-- search news -->
        <fwb-card variant="image" class="w-full">
          <div class="p-5 flex flex-col gap-2">
            <p class="text-gray-900 dark:text-white">Search News</p>
            <fwb-input
              v-model="searchNewsText"
              placeholder="enter your news title"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import postApi from "@/apis/business/postApi";
import commonFn from "@/utilities/commonFn";
import PostStatusEnum from "@/utilities/enum/PostStatusEnum";
import { FwbCard, FwbAvatar, FwbInput, FwbButton } from "flowbite-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const listNews = ref([]);
const totalRecords = ref(0);
const recordsPerPage = 10;
const currentPage = ref(1);
const searchNewsText = ref("");

const startPage = computed(() => {
  if (currentPage.value - 2 < 1) {
    return 1;
  } else {
    return currentPage.value - 2;
  }
});
const endPage = computed(() => {
  if (currentPage.value + 2 > Math.ceil(totalRecords.value / recordsPerPage)) {
    return Math.ceil(totalRecords.value / recordsPerPage);
  } else {
    return currentPage.value + 2;
  }
});
const listPages = computed(() => {
  let res = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    res.push(i);
  }
  return res;
});

onMounted(async () => {
  await choosePage(1);
});
const choosePage = async (page) => {
  try {
    commonFn.showLoading();
    currentPage.value = page;
    const payload = {
      page: page,
      pageSize: recordsPerPage,
      status: PostStatusEnum.PUBLISHED
    };
    if (searchNewsText.value) {
      payload.search = searchNewsText.value;
    }
    const [res, summary] = await Promise.all([
      postApi.getPaging(payload),
      postApi.getSummary(payload),
    ]);
    if (res) {
      listNews.value = res;
      totalRecords.value = summary.total;
    }
  } finally {
    commonFn.hideLoading();
  }
};

const author = ref({
  name: "Ngọc Toản",
  img: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
});

const goToDetail = (id) => {
  router.push({ name: "postDetail", params: { id: id } });
};
</script>

<style lang="postcss" scoped></style>
