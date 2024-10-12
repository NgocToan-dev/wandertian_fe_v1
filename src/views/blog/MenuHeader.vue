<template>
  <fwb-navbar class="border-b-2">
    <template #logo>
      <fwb-navbar-logo
        alt="Flowbite logo"
        image-url="https://flowbite.com/docs/images/logo.svg"
        link="#"
      >
        Wandertian
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
          <fwb-button v-if="!isLogin" @click="login">Login</fwb-button>
          <FwbDropdown v-else placement="bottom" align-to-end>
            <template #trigger>
              <!-- user avatar -->
              <img
                src="https://i.pravatar.cc/300"
                alt="User avatar"
                class="w-8 h-8 rounded-full cursor-pointer hover:opacity-75"
              />
            </template>
            <ul>
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
              >
                <li @click="showUserSetting">
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings
                  </a>
                </li>
              </ul>
              <div class="py-2" @click="logout">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Log out</a
                >
              </div>
            </ul>
          </FwbDropdown>
        </div>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
  <UserAccountSetting v-if="isShowUserSetting" @closeModal="closeUserSetting"/>
</template>

<script setup>
import {
  FwbNavbar,
  FwbNavbarLogo,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbButton,
  FwbDropdown,
} from "flowbite-vue";
import ToggleDarkMode from "@/components/button/ToggleDarkMode.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import commonFn from "@/utilities/commonFn";
import RoleEnum from "@/utilities/enum/RoleEnum";
import UserAccountSetting from "./UserAccountSetting.vue";

const isShowUserSetting = ref(false);

const showUserSetting = () => {
  isShowUserSetting.value = true;
};
const closeUserSetting = () => {
  isShowUserSetting.value = false;
};
const isLogin = computed(() => {
  return commonFn.getCookie("accessToken") != null;
});

const isAdmin = computed(() => {
  return commonFn.getRoleInCookie() == RoleEnum.ADMIN;
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
  router.push("/logout");
};

const login = () => {
  router.push("/login");
};
</script>

<style lang="postcss" scoped></style>
