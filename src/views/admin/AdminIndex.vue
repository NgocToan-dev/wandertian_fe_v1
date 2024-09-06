<template>
  <!-- admin layout -->
  <div class="w-full max-w-md flex">
    <Sidebar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./sidebar/Sidebar.vue";

</script>

<style lang="scss" scoped></style>
