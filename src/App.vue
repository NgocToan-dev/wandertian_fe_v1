<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import commonFn from "@/utilities/commonFn";

onMounted(() => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode == "true") {
    commonFn.toggleDarkMode(true);
  } else {
    commonFn.toggleDarkMode(false);
  }
});
</script>

<style scoped></style>
