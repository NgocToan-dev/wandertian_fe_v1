<template>
  <FwbToggle v-model="darkMode" :class="darkMode ? 'dark-mode' : 'light-mode'" />
</template>

<script setup>
import commonFn from "@/utilities/commonFn";
import { FwbToggle } from "flowbite-vue";
import { ref, watch } from "vue";

const darkMode = ref(localStorage.getItem("darkMode") === "true");
watch(darkMode, (newVal) => {
  commonFn.toggleDarkMode(newVal);
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
