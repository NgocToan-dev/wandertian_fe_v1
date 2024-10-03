<template>
  <div class="p-4">
    <div class="toolbar flex justify-end">
      <FwbButton class="dark:bg-gray-700 dark:text-white" @click="showTagDetail"
        >Add Tag</FwbButton
      >
    </div>
    <div class="task-list mt-2">
      <GridViewer
        :data="items"
        :columns="columns"
        :total-records="totalRecords"
        @edit-row="showTagDetail"
        @delete-row="deleteTag"
      />
    </div>
  </div>
  <TagDetail
    v-if="isShowTagDetail"
    v-model="tagItem"
    @close="isShowTagDetail = false"
    :refresh-callback="refresh"
  />
</template>

<script setup>
import { FwbButton } from "flowbite-vue";
import GridViewer from "@/components/grid/GridViewer.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import commonFn from "@/utilities/commonFn";
import TagDetail from "./TagDetail.vue";
import tagApi from "@/apis/business/tagApi";

const toast = useToast();
const items = ref([]);
const totalRecords = ref(0);
const tagItem = ref({});
const isShowTagDetail = ref(false);

const columns = ref([
  {
    name: "Name",
    key: "name",
  },
]);

onMounted(async () => {
  await refresh();
});
const showTagDetail = (item) => {
  isShowTagDetail.value = true;
  tagItem.value = item;
};

const deleteTag = async (item) => {
  const res = await tagApi.delete(item.tagID);
  if (res) {
    toast.success("Tag deleted successfully");
    await refresh();
  }
};

const refresh = async () => {
  try {
    commonFn.showLoading();
    const payload = {};
    const res = await tagApi.getAll(payload);
    if (res?.length > 0) {
      items.value = res;
      totalRecords.value = res.length;
    }
  } finally {
    commonFn.hideLoading();
  }
};
</script>

<style lang="scss"></style>
