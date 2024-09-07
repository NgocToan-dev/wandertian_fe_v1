<template>
  <div
    class="flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700 p-4"
  >
    <h2 class="text-2xl font-bold dark:text-white">Task List</h2>
    <div class="flex gap-2">
      <!-- Switch dark mode -->
      <div class="flex items-center gap-2">
        <ToggleDarkMode />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToggleDarkMode from "@/components/button/ToggleDarkMode.vue";
</script>

<style lang="scss"></style>
