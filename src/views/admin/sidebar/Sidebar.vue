<template>
  <!-- sidebar -->
  <div class="w-64 h-screen bg-white dark:bg-gray-800 shadow-md">
    <fwb-sidebar>
      <fwb-sidebar-logo
        name="Wandertian"
        logo="https://flowbite.com/docs/images/logo.svg"
        tag="router-link"
      />
      <div v-for="(menu, index) in menus" :key="index">
        <fwb-sidebar-item-group v-if="menu.type === SidebarItemType.Divider" border />
        <fwb-sidebar-dropdown-item
          v-else-if="menu.type === SidebarItemType.ItemDropdown"
          :active="isActiveRoute(menu.link)"
        >
          <template #icon>
            <Icon :icon="menu.icon" />
          </template>
          <template #trigger> E-commerce </template>
          <template #default>
            <fwb-sidebar-item
              class="pl-11"
              v-for="(childMenu, childIndex) in menu.children"
              :key="childIndex"
              :to="{ path: childMenu.link }"
            >
              <template v-if="childMenu.icon" #icon>
                <Icon :icon="childMenu.icon" />
              </template>
              {{ childMenu.name }}
            </fwb-sidebar-item>
          </template>
        </fwb-sidebar-dropdown-item>
        <fwb-sidebar-item
          v-else
          :to="{ path: menu.link }"
          :active="isActiveRoute(menu.link)"
        >
          <template #icon>
            <Icon :icon="menu.icon" />
          </template>
          <template #default>{{ menu.name }}</template>
        </fwb-sidebar-item>
      </div>
    </fwb-sidebar>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  FwbSidebar,
  FwbSidebarItemGroup,
  FwbSidebarItem,
  FwbSidebarLogo,
  FwbSidebarDropdownItem,
} from "flowbite-vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import SidebarItemType from "@/utilities/enum/SidebarItemType";
import { computed } from "vue";

const route = useRoute();

const menus = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: "mdi:home",
  },
  {
    name: "Task",
    link: "/admin/task",
    icon: "mdi:format-list-numbered",
  },
  {
    name: "Product",
    icon: "mdi:format-list-numbered",
    type: SidebarItemType.ItemDropdown,
    children: [
      {
        name: "Product List",
        link: "/admin/product",
      },
    ],
  },
  {
    type: SidebarItemType.Divider,
  },
  {
    name: "User",
    link: "/admin/user",
    icon: "mdi:user",
  },
];

const isActiveRoute = computed(() => (path) => {
  return route.path === path || route.path.startsWith(path + "/");
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-gray-200 dark:bg-gray-700;
}
</style>
