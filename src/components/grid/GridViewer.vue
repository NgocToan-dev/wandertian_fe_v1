<template>
  <div>
    <fwb-table hoverable>
      <fwb-table-head>
        <fwb-table-head-cell v-for="(column, index) in columns" :key="index">
          {{ column.name }}
        </fwb-table-head-cell>
        <fwb-table-head-cell>
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="(item, index) in data" :key="index">
          <fwb-table-cell v-for="(column, index) in columns" :key="index">
            {{ item[column.key] }}
          </fwb-table-cell>
          <fwb-table-cell class="w-10">
            <div class="flex justify-center gap-2">
              <Icon icon="mdi:pencil" class="cursor-pointer text-xl text-blue-500 dark:text-white" />
              <Icon icon="mdi:delete" class="cursor-pointer text-xl text-red-500 dark:text-white" />
            </div>
          </fwb-table-cell>
        </fwb-table-row>
        <fwb-table-row v-if="data.length === 0">
          <fwb-table-cell :colspan="columns.length">No data found</fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <div class="flex justify-between mt-2">
      <div class="total-records dark:text-white">
        Total records: <b>{{ totalRecords }}</b>
      </div>
      <fwb-pagination
        :total-pages="totalPages"
        v-model="currentPage"
        @page-changed="handlePageClick"
        previous-label=""
        next-label=""
      >
        <template #prev-icon>
          <Icon icon="mdi:chevron-left" />
        </template>
        <template #next-icon>
          <Icon icon="mdi:chevron-right" />
        </template>
      </fwb-pagination>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbPagination,
} from "flowbite-vue";
import { computed, ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
});

const currentPage = ref(1);
const totalPages = computed(() => {
  return Math.ceil(props.totalRecords / 10);
});

const handlePageClick = (page) => {
  // get data from api
  console.log(page);
};
</script>

<style lang="scss" scoped></style>
