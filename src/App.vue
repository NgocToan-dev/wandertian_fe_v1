<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { toggleDarkMode } from "@/utilities/commonFn";

onMounted(() => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode == "true") {
    toggleDarkMode(true);
  } else {
    toggleDarkMode(false);
  }
});
</script>

<style scoped></style>
