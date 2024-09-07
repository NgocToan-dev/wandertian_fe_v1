<template>
  <fwb-navbar>
    <template #logo>
      <fwb-navbar-logo
        alt="Flowbite logo"
        image-url="https://flowbite.com/docs/images/logo.svg"
        link="#"
      >
        Flowbite
      </fwb-navbar-logo>
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link
          v-for="(link, index) in headerLinks"
          :key="index"
          :is-active="linkActive === link.link"
          :link="link.link"
        >
          {{ link.name }}
        </fwb-navbar-link>

        <ToggleDarkMode />
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup>
import { FwbNavbar, FwbNavbarLogo, FwbNavbarCollapse, FwbNavbarLink } from "flowbite-vue";
import ToggleDarkMode from "@/components/button/ToggleDarkMode.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const linkActive = computed(() => {
  return router.currentRoute.value.path;
});

const headerLinks = [
  {
    name: "Home",
    link: "/homepage",
    isActive: true,
  },
  {
    name: "Study With Me",
    link: "/study-with-me",
  },
];
</script>

<style lang="postcss" scoped></style>
