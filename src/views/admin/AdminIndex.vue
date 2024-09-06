<template>
  <!-- admin layout -->
  <div class="w-full flex">
    <Sidebar />
    <!-- divider -->
    <div class="w-px h-full bg-gray-200 dark:bg-gray-700"></div>
    <div class="flex-1">
      <MainLayout />
    </div>
  </div>
</template>

<script setup>
import MainLayout from "./mainContent/MainLayout.vue";
import Sidebar from "./sidebar/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
