<template>
  <div class="p-4">
    <div class="toolbar flex justify-end">
      <FwbButton class="dark:bg-gray-700 dark:text-white" @click="showTaskDetail"
        >Add Task</FwbButton
      >
    </div>
    <div class="task-list mt-2">
      <GridViewer :data="items" :columns="columns" :total-records="totalRecords" />
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

const items = ref([
  {
    id: 1,
    name: "Task 1",
    description: "Description 1",
  },
]);

const columns = ref([
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Description",
    key: "description",
  },
]);
const totalRecords = ref(1);
</script>

<style lang="scss"></style>
