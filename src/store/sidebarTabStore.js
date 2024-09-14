import { defineStore } from "pinia";

export const useSidebarTabStore = defineStore("sidebarTab", {
  state: () => ({
    activeTab: "",
  }),
  actions: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
});
