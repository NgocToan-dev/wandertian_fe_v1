<template>
  <div>
    <apexchart width="380" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
import postApi from "@/apis/business/postApi";
import commonFn from "@/utilities/commonFn";
import { onMounted, ref } from "vue";

const options = ref({
  chart: {
    type: "donut",
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

const series = ref([]);

onMounted(async () => {
  const payload = {
    columns: ["PostID", "Title", "Content", "Status", "CreatedAt"],
  };
  const res = await postApi.getAll(payload);
  if (res) {
    const statusCounts = res.reduce((acc, post) => {
      const key = commonFn.getResourceByEnum("PostStatus", post.status);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});       
debugger
    options.value.labels = Object.keys(statusCounts).map((e) => e);
    series.value = Object.values(statusCounts).map((e) => e);
  }
});
</script>

<style lang="postcss"></style>
