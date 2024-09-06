<template>
  <div class="w-full h-full dark:bg-gray-800">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/views/admin/header/Header.vue";
</script>

<style lang="scss" scoped></style>
