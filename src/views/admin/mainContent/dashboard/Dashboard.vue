<template>
  <div class="p-4">
    <DonutChart type="donut" :labels="labelsCategory" :data="seriesCategory" />
    <DonutChart type="donut" :labels="labelsStatus" :data="seriesStatus" />
  </div>
</template>

<script setup>
import postApi from "@/apis/business/postApi";
import DonutChart from "@/components/chart/DonutChart.vue";
import commonFn from "@/utilities/commonFn";
import { onMounted, ref } from "vue";
const labelsCategory = ref([]);
const seriesCategory = ref([]);

const labelsStatus = ref([]);
const seriesStatus = ref([]);

onMounted(async () => {
  const payload = {
    columns: ["CategoryName", "Status"],
  };
  const res = await postApi.getAll(payload);
  if (res) {
    const categoryCounts = res.reduce((acc, post) => {
      const key = post.categoryName;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    labelsCategory.value = Object.keys(categoryCounts);
    seriesCategory.value = Object.values(categoryCounts);

    const statusCounts = res.reduce((acc, post) => {
      const key = commonFn.getResourceByEnum("PostStatus", post.status);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    labelsStatus.value = Object.keys(statusCounts);
    seriesStatus.value = Object.values(statusCounts);
  }
});
</script>

<style lang="scss" scoped></style>
