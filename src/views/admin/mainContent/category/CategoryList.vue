<template>
  <div class="p-4">
    <div class="toolbar flex justify-end">
      <FwbButton class="dark:bg-gray-700 dark:text-white" @click="showCategoryDetail"
        >Add Category</FwbButton
      >
    </div>
    <div class="task-list mt-2">
      <GridViewer
        :data="items"
        :columns="columns"
        :total-records="totalRecords"
        @edit-row="showCategoryDetail"
        @delete-row="deleteCategory"
      />
    </div>
  </div>
  <CategoryDetail v-if="isShowCategoryDetail" v-model="categoryItem" @close="isShowCategoryDetail = false;" :refresh-callback="refresh"/>
</template>

<script setup>
import { FwbButton } from "flowbite-vue";
import GridViewer from "@/components/grid/GridViewer.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import commonFn from "@/utilities/commonFn";
import categoryApi from "@/apis/business/categoryApi";
import CategoryDetail from "./CategoryDetail.vue";

const { proxy } = getCurrentInstance();
const toast = useToast();
const items = ref([]);
const totalRecords = ref(0);
const categoryItem = ref({});
const isShowCategoryDetail = ref(false);

const columns = ref([
  {
    name: "Name",
    key: "name",
    width: 200,
  },
  {
    name: "Description",
    key: "description",
  },
]);

onMounted(async () => {
  await refresh();
});
const showCategoryDetail = (item) => {
  isShowCategoryDetail.value = true;
  categoryItem.value = item;
};

const deleteCategory = async (item) => {
  const res = await categoryApi.delete(item.categoryID);
  if (res) {
    toast.success("Post deleted successfully");
    await refresh();
  }
};

const refresh = async () => {
  try {
    commonFn.showLoading();
    const payload = {
    };
    const res = await categoryApi.getAll(payload);
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
