<template>
  <!-- List youtube video -->
  <div class="container mx-auto my-5">
    <div class="w-full flex flex-col gap-5">
      <!-- main content -->
      <div v-for="(video, index) in listVideo" :key="index">
        <iframe :src="getEmbedUrl(video.url)" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const listVideo = ref([
  { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
]);

function getEmbedUrl(url) {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<style lang="scss" scoped></style>
