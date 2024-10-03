<template>
  <div>
    <apexchart width="380" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
import postApi from "@/apis/business/postApi";
import commonFn from "@/utilities/commonFn";
import { onMounted, reactive, ref } from "vue";

const options = ref({});

const series = ref([]);

onMounted(async () => {
  const payload = {
    columns: ["PostID", "Title", "Content", "Status", "CreatedAt", "Category" ],
  };
  const res = await postApi.getAll(payload);
  if (res) {
    const categoryCounts = res.reduce((acc, post) => {
      const key = post.category.name;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    options.value = {
      chart: {
        type: "donut",
      },
      labels: Object.keys(categoryCounts),
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
    };
    series.value = Object.values(categoryCounts);
  }
});
</script>

<style lang="postcss"></style>
