<template>
  <div
    class="flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700 p-4"
  >
    <h2 class="text-2xl font-bold dark:text-white">Task List</h2>
    <div class="flex gap-2">
      <!-- Switch dark mode -->
      <div class="flex items-center gap-2">
        <FwbToggle v-model="darkMode" :class="darkMode ? 'dark-mode' : 'light-mode'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbToggle } from "flowbite-vue";
import { toggleDarkMode } from "@/utilities/commonFn";
import { ref, watch } from "vue";

const darkMode = ref(localStorage.getItem("darkMode") === "true");
watch(darkMode, (newVal) => {
  toggleDarkMode(newVal);
});
</script>

<style lang="scss">
.after\:border::after {
  border-width: 0px !important;
}
.peer:checked ~ .peer-checked\:bg-blue-600 {
  background-color: #000 !important;
}
.dark-mode {
  span {
    &::after {
      background: url("@/assets/icon/moon.svg") no-repeat center center #000;
    }
  }
}
.light-mode {
  span {
    &::after {
      background: url("@/assets/icon/sun.svg") no-repeat center center;
    }
  }
}
</style>
