<template>
  <!-- homepage of blog main content -->
  <div class="container mx-auto my-5">
    <div class="grid grid-cols-12">
      <div class="col-span-8 flex flex-col gap-5">
        <!-- main content -->
        <fwb-card
          :img-src="news.img"
          variant="horizontal"
          v-for="(news, index) in listNews"
          :key="index"
          class="w-full max-h-[200px] overflow-hidden"
        >
          <div class="p-5">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ news.title }}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              {{ news.description }}
          </p>
          </div>
        </fwb-card>
      </div>
      <div class="col-span-4 flex flex-col gap-5">
        <!-- sidebar -->
        <fwb-card variant="image">
          <!-- personal information -->
          <div class="p-5 flex flex-col items-center">
            <fwb-avatar :img="author.img" rounded size="lg" />
            <p class="text-gray-900 dark:text-white">
              {{ author.name }}
            </p>
            <p class="text-gray-700 dark:text-gray-400 text-center">
              {{ author.description }}
            </p>
          </div>
        </fwb-card>
        <!-- search news -->
        <fwb-card variant="image">
          <div class="p-5 flex flex-col gap-2">
            <p class="text-gray-900 dark:text-white">Search News</p>
            <fwb-input
              v-model="searchNewsText"
              placeholder="enter your news title"
              size="lg"
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
                <fwb-button>Search</fwb-button>
              </template>
            </fwb-input>
          </div>
        </fwb-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbCard, FwbAvatar, FwbInput, FwbButton } from "flowbite-vue";
import { ref } from "vue";

const listNews = ref([
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    img: "https://flowbite.com/docs/images/blog/image-4.jpg",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    img: "https://flowbite.com/docs/images/blog/image-2.jpg",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    img: "https://flowbite.com/docs/images/blog/image-1.jpg",
  },
]);
const author = ref({
  name: "Ngọc Toản",
  img: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
});
</script>

<style lang="postcss" scoped></style>
