<template>
  <!-- admin layout -->
  <div class="w-full flex">
    <Sidebar />
    <!-- divider -->
    <div class="w-px h-full bg-gray-200 dark:bg-gray-700"></div>
    <div class="main-layout max-h-screen">
      <MainLayout />
    </div>
  </div>
</template>

<script setup>
import MainLayout from "./mainContent/MainLayout.vue";
import Sidebar from "./sidebar/Sidebar.vue";
</script>

<style lang="scss" scoped>
.main-layout {
  width: calc(100% - 16rem);
}
</style>
