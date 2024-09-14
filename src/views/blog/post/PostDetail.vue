<template>
  <div class="container mx-auto py-4">
    <div class="w-full">
      <div class="w-1/3">
        <img :src="news.img" alt="news" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="w-full">
      <div class="w-1/3">
        <fwb-card>
          <div class="p-5 flex flex-col items-center">
            <fwb-avatar :img="news.author.img" rounded size="lg" />
            <p class="text-gray-900 dark:text-white">
              {{ news.author.name }}
            </p>
            <p class="text-gray-700 dark:text-gray-400 text-center">
              {{ news.author.description }}
            </p>
          </div>
        </fwb-card>
        
      </div>
      <div class="w-full">
        <fwb-card>
          <div class="p-5">
            <div class="flex flex-col gap-2">
              <p class="text-gray-900 dark:text-white">
                {{ news.title }}
              </p>
              <p class="text-gray-700 dark:text-gray-400">
                {{ news.description }}
              </p>
            </div>
          </div>
        </fwb-card>
      </div>
    </div>
    <div class="w-full">
      <fwb-card>
        <div class="p-5">
          <div class="flex flex-col gap-2">
            <p class="text-gray-900 dark:text-white">
              {{ news.comments[0].name }}
            </p>
            <p class="text-gray-700 dark:text-gray-400">
              {{ news.comments[0].description }}
            </p>
          </div>
        </div>
      </fwb-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbCard, FwbAvatar } from "flowbite-vue";

const news = ref({
  img: "https://flowbite.com/docs/images/blog/image-4.jpg",
  title: "Noteworthy technology acquisitions 2021",
  description:
    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  author: {
    name: "Ngọc Toản",
    img: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  createdAt: "2021-01-01",
  updatedAt: "2021-01-01",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  category: "Technology",
  tags: ["Technology", "Acquisitions", "2021"],
  comments: [
    {
      name: "Ngọc Toản",
      img: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ],
});
</script>
  
<style lang="scss" scoped></style>
