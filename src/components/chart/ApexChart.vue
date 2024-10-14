<template>
  <div>
    <apexchart :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { barChartBuilder } from "./barChartBuilder";
import { donutChartBuilder } from "./donutChartBuilder";
import { lineChartBuilder } from "./lineChartBuilder";

const options = ref({});

const series = ref([]);

const props = defineProps({
  type: {
    type: String,
    default: "donut",
  },
  labels: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  }
});

const buildChart = (type, labels, data) => {
  switch (type) {
    case "donut":
      const donutChartConfig = donutChartBuilder(props.type, data, props.title);
      series.value = donutChartConfig.series;
      options.value = donutChartConfig.options;
      break;
    case "line":
      const lineChartConfig = lineChartBuilder(props.type, data, labels, props.title);
      series.value = lineChartConfig.series;
      options.value = lineChartConfig.options;
      break;
    case "bar":
      const barChartConfig = barChartBuilder(props.type, data, labels, props.title);
      series.value = barChartConfig.series;
      options.value = barChartConfig.options;
      break;
  }
};

watch(
  () => JSON.stringify({ labels: props.labels, data: props.data }),
  (newVal) => {
    const { labels, data } = JSON.parse(newVal);
    buildChart(props.type, labels, data);
  }
);
</script>

<style lang="postcss"></style>
