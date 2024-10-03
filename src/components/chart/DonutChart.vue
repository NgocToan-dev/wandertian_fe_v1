<template>
  <div>
    <apexchart width="380" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";

const options = ref({});

const series = ref([]);

const props = defineProps({
  width: {
    type: Number,
    default: 380,
  },
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
});

watch(
  () => JSON.stringify({ labels: props.labels, data: props.data }),
  (newVal) => {
    const { labels, data } = JSON.parse(newVal);
    options.value = {
      chart: {
        type: props.type,
      },
      labels,
    };
    series.value = data;
  }
);
</script>

<style lang="postcss"></style>
