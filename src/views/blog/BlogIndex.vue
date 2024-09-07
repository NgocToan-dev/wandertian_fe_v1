<template>
  <div class="bg-white dark:bg-slate-800 min-h-screen h-full flex flex-col">
    <MenuHeader class="sticky top-0 z-50" />
    <div class="flex-1">
      <router-view />
    </div>
    <MenuFooter />
  </div>
</template>

<script setup>
import MenuHeader from "./MenuHeader.vue";
import MenuFooter from "./MenuFooter.vue";
</script>

<style lang="postcss" scoped></style>
