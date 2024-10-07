<template>
  <div class="p-4">
    <div class="toolbar flex justify-end">
      <FwbButton class="dark:bg-gray-700 dark:text-white" @click="showPostDetail"
        >Add Post</FwbButton
      >
    </div>
    <div class="task-list mt-2">
      <GridViewer
        :data="items"
        :columns="columns"
        :total-records="totalRecords"
        @choosePage="refresh"
        @edit-row="showPostDetail"
        @delete-row="deletePost"
      />
    </div>
  </div>
</template>

<script setup>
import { FwbButton } from "flowbite-vue";
import GridViewer from "@/components/grid/GridViewer.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import postApi from "@/apis/business/postApi";
import { useToast } from "vue-toastification";
import commonFn from "@/utilities/commonFn";

const { proxy } = getCurrentInstance();
const toast = useToast();
const items = ref([]);
const totalRecords = ref(0);

const columns = ref([
  {
    name: "Title",
    key: "title",
    width: 200,
  },
  {
    name: "Content",
    key: "content",
    html: true,
  },
  {
    name: "Status",
    key: "status",
    width: 100,
    enum: "PostStatus",
    dataType: "enum",
  },
  {
    name: "Created At",
    key: "createdAt",
    width: 150,
    dataType: "date",
  },
]);

onMounted(async () => {
  await refresh(1);
});
const showPostDetail = (item) => {
  if (item.postID) {
    proxy.$router.push({ name: "postEditor", params: { id: item.postID } });
    return;
  }
  proxy.$router.push({ name: "postEditor", params: { id: 0 } });
};

const deletePost = async (item) => {
  const res = await postApi.delete(item.postID);
  if (res) {
    toast.success("Post deleted successfully");
    await refresh();
  }
};

const refresh = async (page) => {
  try {
    commonFn.showLoading();
    const payload = {
      page: page,
    };
    const [res, summary] = await Promise.all([postApi.getPaging(payload),postApi.getSummary(payload)]);
    if (res?.length > 0) {
      items.value = res;
      totalRecords.value = summary?.total;
    }
  } finally {
    commonFn.hideLoading();
  }
};
</script>

<style lang="scss"></style>
