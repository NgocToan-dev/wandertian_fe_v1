<template>
  <div class="p-4">
    <div class="toolbar flex justify-end">
      <FwbButton class="dark:bg-gray-700 dark:text-white" @click="showTaskDetail"
        >Add Task</FwbButton
      >
    </div>
    <div class="task-list mt-2">
      <GridViewer />
    </div>
  </div>
  <TaskDetail v-if="isShowTaskDetail" @close="closeTaskDetail" />
</template>

<script setup>
import { FwbButton } from "flowbite-vue";
import GridViewer from "@/components/grid/GridViewer.vue";
import TaskDetail from "./TaskDetail.vue";
import { ref } from "vue";

const isShowTaskDetail = ref(false);

const showTaskDetail = () => {
  isShowTaskDetail.value = true;
};

const closeTaskDetail = () => {
  isShowTaskDetail.value = false;
};
</script>

<style lang="scss"></style>
