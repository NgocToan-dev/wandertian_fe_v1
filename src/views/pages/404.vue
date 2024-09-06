<template>
  <div
    class="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
  >
    <div class="text-center bg-white py-8 px-16 rounded-lg shadow-lg">
      <h1
        class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700"
      >
        404
      </h1>
      <p class="text-2xl text-gray-700">Page not found</p>
      <div
        class="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        @click="backToPreviousPage"
      >
        Back to previous page
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const backToPreviousPage = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
