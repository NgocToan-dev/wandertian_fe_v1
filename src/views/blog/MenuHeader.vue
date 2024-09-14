<template>
  <fwb-navbar class="border-b-2">
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
        <div class="flex gap-5 items-center">
          <fwb-navbar-link
            v-for="(link, index) in headerLinks"
            :key="index"
            :is-active="linkActive === link.link"
            :link="link.link"
          >
            {{ link.name }}
          </fwb-navbar-link>
          <ToggleDarkMode />
          <!-- login, logout button -->
          <fwb-button v-if="!isAuthenticated" @click="login">Login</fwb-button>
          <fwb-button v-else @click="logout">Logout</fwb-button>
        </div>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup>
import {
  FwbNavbar,
  FwbNavbarLogo,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbButton,
} from "flowbite-vue";
import ToggleDarkMode from "@/components/button/ToggleDarkMode.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import commonFn from "@/utilities/commonFn";

const isAuthenticated = computed(() => {
  return localStorage.getItem("isAuthenticated");
});

const isAdmin = computed(() => {
  return localStorage.getItem("user") === "admin";
});

const router = useRouter();
const linkActive = computed(() => {
  return router.currentRoute.value.path;
});

const headerLinks = computed(() => {
  const links = [
    {
      name: "Home",
      link: "/homepage",
    },
    {
      name: "Study With Me",
      link: "/study-with-me",
    },
  ];
  if (isAdmin.value) {
    links.push({
      name: "Admin",
      link: "/admin",
    });
  }
  return links;
});

const logout = () => {
  commonFn.logout(router);
};

const login = () => {
  router.push("/login");
};
</script>

<style lang="postcss" scoped></style>
