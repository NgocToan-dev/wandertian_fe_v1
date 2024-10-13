<template>
  <div class="p-4 flex flex-col gap-5 overflow-auto">
    <div class="flex gap-5">
      <div class="flex-1">
        <!-- Post Statistics -->
        <ApexChart type="line" :labels="labelsChart1" :data="seriesChart1" title="Posts Per Week" />
      </div>
      <div class="flex-1">
        <!-- Post Statistics -->
        <ApexChart type="bar" :labels="labelsChart2" :data="seriesChart2" title="Posts By Category" />
      </div>
    </div>
    <!-- Tag Statistics -->
  </div>
</template>

<script setup>
import dashboardApi from "@/apis/business/dashboardApi";
import ApexChart from "@/components/chart/ApexChart.vue";
import moment from "moment";
import { onMounted, ref } from "vue";
const labelsChart1 = ref([]);
const seriesChart1 = ref([]);
const labelsChart2 = ref([]);
const seriesChart2 = ref([]);

onMounted(() => {
  const year = moment().year();
  dashboardApi.analyzePostByWeekInYear(year).then((res) => {
    if (res) {
      labelsChart1.value = res.map((item) => item.week);
      seriesChart1.value = [
        {
          name: "Posts",
          data: res.map((item) => item.postCount),
        },
      ];
    }
  });
  dashboardApi.analyzePostByCategory().then((res) => {
    if (res) {
      labelsChart2.value = res.map((item) => item.category);
      seriesChart2.value = [
        {
          name: "Posts",
          data: res.map((item) => item.postCount),
        },
      ];
    }
  });
});
</script>

<style lang="scss" scoped></style>
